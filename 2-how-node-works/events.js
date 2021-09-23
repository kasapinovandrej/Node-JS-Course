const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a sale");
});

myEmitter.on("newSale", () => {
  console.log("Costumer name: Andrej");
});
let items = 10;

myEmitter.on("newSale", (stock) => {
  items = items - 1;
  console.log(`There are now ${stock} items left`);
});

myEmitter.emit("newSale", items);

/////////////
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("REQUEST RECIVED!");
  res.end("Request received");
});

server.on("request", (req, res) => {
  console.log("Another request 🤖");
});

server.on("close", (req, res) => {
  console.log("Server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waitnig for requests....");
});
