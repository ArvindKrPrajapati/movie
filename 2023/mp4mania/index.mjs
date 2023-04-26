




//find movie link from each folder



import * as cheerio from 'cheerio';

const got = (...args) => import('got').then(({ default: got }) => got(...args));


const extractLinks = async (url) => {
  console.log("------loading------")
    try {
        const response = await got(url);
        console.log("-----loaded-----")
        const html = response.body;
        const $ = cheerio.load(html);
       const linkObjects = $('a');
        
       const links = [];
         linkObjects.each((index, element) => {
                const obj ={
                 text: $(element).text(), 
                 href: url+$(element).attr('href'),
              };
              if(obj.href.includes("showcat.php")){
                links.push(obj)
              }
         });
     console.log(links)
     } catch (error) {
        console.log(error.response);
    }
};


extractLinks("https://hdmp4mania2.com/")
