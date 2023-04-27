const { data } = require("./data/extra");

let newData = data.filter((obj) => obj.link.endsWith("/"));
const m = newData[0].link.split("/");
const name = m[6];
const year = m[4];
console.log(name);
