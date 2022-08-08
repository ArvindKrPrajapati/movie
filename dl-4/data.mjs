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

                      "https://dl3.3rver.org/cdn2/04/film/1926/",
                      "https://dl3.3rver.org/cdn2/04/film/1932/",
                      "https://dl3.3rver.org/cdn2/04/film/1954/",
                      "https://dl3.3rver.org/cdn2/04/film/1961/",
                      "https://dl3.3rver.org/cdn2/04/film/1962/",
                      "https://dl3.3rver.org/cdn2/04/film/1968/",
                      "https://dl3.3rver.org/cdn2/04/film/1970/",
                      "https://dl3.3rver.org/cdn2/04/film/1971/",
                      "https://dl3.3rver.org/cdn2/04/film/1984/",
                      "https://dl3.3rver.org/cdn2/04/film/1985/",
                      "https://dl3.3rver.org/cdn2/04/film/1986/",
                      "https://dl3.3rver.org/cdn2/04/film/1988/",
                      "https://dl3.3rver.org/cdn2/04/film/1990/",
                      "https://dl3.3rver.org/cdn2/04/film/1991/",
                      "https://dl3.3rver.org/cdn2/04/film/1994/",
                      "https://dl3.3rver.org/cdn2/04/film/1996/",
                      "https://dl3.3rver.org/cdn2/04/film/1997/",
                      "https://dl3.3rver.org/cdn2/04/film/1999/",
                      "https://dl3.3rver.org/cdn2/04/film/2000/",
                      "https://dl3.3rver.org/cdn2/04/film/2001/",
                      "https://dl3.3rver.org/cdn2/04/film/2002/",
                      "https://dl3.3rver.org/cdn2/04/film/2003/",
                      "https://dl3.3rver.org/cdn2/04/film/2004/",
                      "https://dl3.3rver.org/cdn2/04/film/2005/",
                      "https://dl3.3rver.org/cdn2/04/film/2006/",
                      "https://dl3.3rver.org/cdn2/04/film/2007/",
                      "https://dl3.3rver.org/cdn2/04/film/2008/",
                      "https://dl3.3rver.org/cdn2/04/film/2009/",
                      "https://dl3.3rver.org/cdn2/04/film/2010/",
                      "https://dl3.3rver.org/cdn2/04/film/2011/",
                      "https://dl3.3rver.org/cdn2/04/film/2012/",
                      "https://dl3.3rver.org/cdn2/04/film/2013/",
                      "https://dl3.3rver.org/cdn2/04/film/2014/",
                      "https://dl3.3rver.org/cdn2/04/film/2015/",
                      "https://dl3.3rver.org/cdn2/04/film/2016/",
                      "https://dl3.3rver.org/cdn2/04/film/2017/",
                      "https://dl3.3rver.org/cdn2/04/film/2018/",
                      "https://dl3.3rver.org/cdn2/04/film/2019/",
                      "https://dl3.3rver.org/cdn2/04/film/2020/",
]
const destFile="./data.js"
fs.writeFileSync(destFile,"const data=[\n")
extractLinks()


