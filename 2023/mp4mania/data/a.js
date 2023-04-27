const { data } = require("./hollywood");
const fs = require("fs");

var _i = 3135;
const destFile = "./hollywood_2.js";
var i = 0;
const cat = "Hollywood";

var last = data.length;
fs.writeFileSync(destFile, "const data = [\n");

const writeInFile = async () => {
  if (i >= last) {
    fs.appendFileSync(destFile, "]\n module.exports={data}");
    return;
  }
  const l = data[i].name.replaceAll(" ", "%20");
  const href = `http://hd1.dlmania.com/${cat}/${l}/${l}%20HD%20(HDMp4Mania).mp4`;
  const href_1 = `http://hd1.dlmania.com/${cat}/${l}/${l}%20HD%201.mp4`;
  const href_2 = `http://hd1.dlmania.com/${cat}/${l}/${l}%20HD%202.mp4`;
  if (i < _i) {
    fs.appendFileSync(
      destFile,
      `{
              count:${data[i].count},
              name:"${data[i].name}",
              href:"${href}"
           },\n`
    );
  } else {
    fs.appendFileSync(
      destFile,
      `{
              count:${data[i].count},
              name:"${data[i].name}",
              href:"${href_1}",
              href_two:"${href_2}"
           },\n`
    );
  }
  console.log(i);
  i++;
  writeInFile();
};

writeInFile();
