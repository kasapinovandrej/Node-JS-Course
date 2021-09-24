const fs = require("fs");
const axios = require("axios");
const { resolve } = require("path");

// fs.readFile("./dog.txt", (err, data) => {
//   console.log(`Breed: ${data}`);
//   axios
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.data.message);

//       fs.writeFile("dog-image.txt", res.data.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file!");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// });

const readFilePromisse = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("I could not find that file 😋");
      resolve(data);
    });
  });
};

const writeFilePromisse = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) return reject("I could not wtite that file 😶");
      resolve("success");
    });
  });
};

// readFilePromisse("./dog.txt")
//   .then((data) => {
//     console.log(`Breed: ${data}`);
//     return axios.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.data.message);
//     return writeFilePromisse("dog-image.txt", res.data.message);
//   })
//   .then((res) => {
//     console.log("Random dog image saved to file!");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const getDogPic = async () => {
  try {
    const data = await readFilePromisse("./dog.txt");
    const res = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    await writeFilePromisse("dog-image.txt", res.data.message);
    console.log("Random dog image saved to file!");
  } catch (err) {
    console.log(err);
    throw err;
  }
};

(async () => {
  try {
    getDogPic();
  } catch (err) {
    console.log(err);
    throw err;
  }
})();
