




  const url="https://www36.filmymeet.co/category/19/hollywood-movies-english"
  //const url="https://filmyzilla.systems/movie/10529/Carter-(2022)-hindi-dubbed.html"
import * as cheerio from 'cheerio';
const got = (...args) => import('got').then(({ default: got }) => got(...args));
import fs from 'fs'
const destFile="./datanew.js"

const extractLinks =async ()=>{
  try {
    console.log("finding all links")
    const response = await got(url);
     const html = response.body;
     const cheerioLoad = cheerio.load(html);
     const linkObjects = cheerioLoad('a');
     const links = [];
     linkObjects.each((i, element) => {
                
                     links.push({
                       text:cheerioLoad(element).text(), 
                      href:cheerioLoad(element).attr('href')
                       })
         });
    // console.log(links.slice(6,-13))
     writeInFile(links.slice(6,-13))
  } catch (e) {
    console.log(e)
  }
}

const writeInFile=(links)=>{
  fs.writeFileSync(destFile,"const data=[\n")
  var i=0
  links.map((o)=>{
   if(o.text.length>1){
     fs.appendFileSync(destFile,`{
       text:"${o.text}", 
       href:"${o.href}"
      },\n`)
   }
      i++;
  if(i==links.length){
    fs.appendFileSync(destFile,"\n]\n module.exports={data}")
    console.log("saved all links in data.js")
  }
  })
}

extractLinks()