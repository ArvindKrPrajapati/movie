const { data } = require("./data/extra.js");
const fs = require("fs");
const destFile = "./data/extra_3.js";
fs.writeFileSync(destFile, "const data = [\n");
var i = 0;
data.filter((obj) => {
  if (!obj.href.endsWith("/")) {
    i++;
    console.log(i);
    fs.appendFileSync(
      destFile,
      `{
        id:${i},
        movieId:${obj.movieId},
        name:"${obj.name}",
        year:${obj.year},
        href:"${obj.href}"
     },\n`
    );
  }
});
fs.appendFileSync(destFile, "]\n module.exports={data}");
