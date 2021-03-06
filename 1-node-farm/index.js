const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

//BLOCKING, syncronous way
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(textIn);
// const textOut = `This is what we know about avocado: ${textIn}\nCreqted on ${Date.now()} `;
// fs.writeFileSync("./txt/adi-output.txt", textOut);
// console.log("file writtern!");
//NON_BLOCKING, asyncronous way
// const textIn = fs.readFile("./txt/final.txt", "utf-8", (err, data) => {
//   console.log(err);
//   console.log(data);
// });
// console.log("citanje");
// fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
//   fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//     console.log(data2);
//     fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//       console.log(data3);
//       fs.writeFile(
//         "./txt/adi-2-output.txt",
//         `${data2}\n${data3}`,
//         "utf-8",
//         (err) => {
//           console.log("Your File Has Been Written 😁");
//         }
//       );
//     });
//   });
// });
// console.log("[CITANO]");
//CREATE WEB SERVER
//ROUTING
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObject = JSON.parse(data);
const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));
// console.log(slugs);

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, `${product.quantity} per 📦`);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);
//   if (!product.organic)
//     output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
//   return output;
// };

console.log(
  slugify("Fresh Avocados", {
    lower: true,
  })
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardsHtml = dataObject
      .map((el) => replaceTemplate(cardTemplate, el))
      .join("");
    const output = overviewTemplate.replace("{%PRODUCTCARD%}", cardsHtml);
    res.end(output);
    //PRODUCT PAGE
  } else if (pathname === "/product") {
    const product = dataObject[query.id];
    res.writeHead(200, { "Content-type": "text/html" });
    const output = replaceTemplate(productTemplate, product);
    res.end(output);
    //API
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
    //NOT FOUND
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "duvaj ga",
    });
    res.end(`<h1>Page not found!</h1>`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to request on port 8000");
});
