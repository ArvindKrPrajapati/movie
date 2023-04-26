










//find movie link from each folder


const destFile="./links.js"
import * as cheerio from 'cheerio';
import * as fs from 'fs';

const got = (...args) => import('got').then(({ default: got }) => got(...args));


const extractLinks = async (url,i) => {
  //console.log("------loading------")
    try {
        const response = await got(url);
       // console.log("-----loaded-----")
        const html = response.body;
        const $ = cheerio.load(html);
       const name = $('.description').eq(1).text().split(":")[1]
       const obj={
         id:i,
         name,
         href:"https://hdmp4mania2.com/forcedownload.php?id="+i
       }
       fs.appendFileSync(destFile,`
       {
         id:"${i}",
         name:"${name}", 
         href:"https://hdmp4mania2.com/forcedownload.php?id=${i}"
        },\n`)
        console.log("done : ",i)
     } catch (error) {
        console.log(error.response);
    }
};


fs.writeFileSync(destFile,"const data = [\n")
var i=0
var end=1850
const writeInFile=async ()=>{
  if(i>=end){
fs.appendFileSync(destFile ,"]\n module.exports={data}")
    return
  }
 i++
   await extractLinks("https://hdmp4mania2.com/showmovie.php?id="+i,i)
  writeInFile()
  
}


writeInFile()
