//find folders where movie links resides

import * as cheerio from 'cheerio';
const got = (...args) => import('got').then(({ default: got }) => got(...args));
import * as fs from 'fs';
var index=0
var length=0
const extractLinks = async () => {
    if(index==url.length){
        fs.appendFileSync(destFile,"\n]\n module.exports={data}")
         console.log(length," links found successfully")
       return
    }

    
    try {
       console.log("finding all links")
        const response = await got(url[index]);
        const html = response.body;
        const $ = cheerio.load(html);
        const linkObjects = $('a');
        const firstLink = $(linkObjects[0]).attr('href');
       console.log("excluded",firstLink)
         const links = [];
         
         linkObjects.each((i, element) => {
                if(i!=0){
                     length++;
                      fs.appendFileSync(destFile,`{
                       text:"${$(element).text()}", 
                      href:"${url[index]+$(element).attr('href')}"
                       },\n`)
             }
         });
         index++;
         extractLinks()

        // collect only one link at index 1 in this case because i only need 2nd link
   } catch (error) {
        console.log(error);
    }
};








var url=[
  "http://162.12.215.254/Data/Movies/Hollywood/2016_2017/",
  "http://162.12.215.254/Data/Movies/Hollywood/2019/",
  "http://162.12.215.254/Data/Movies/Hollywood/2020/",
  "http://162.12.215.254/Data/Movies/Hollywood/2021/",
 "http://162.12.215.254/Data/Movies/Hollywood/Old%20Movie/"
  ]
const destFile="./data.js"
fs.writeFileSync(destFile,"const data=[\n")
extractLinks()


