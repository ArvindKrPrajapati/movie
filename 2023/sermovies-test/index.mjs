





import{ getCheerio,extractSermoviesLink,exportAsCsv} from "../common.mjs"


(async()=>{
  try {
    var output=[]
    const url="http://dl6.sermovie.xyz/Movie/2023/"
    const skip=[0,1]
    const $=await getCheerio(url)
    const links=extractSermoviesLink($,skip,url)
    console.log(links.length)
   console.log("\n ********* extracing movie links ********")
    for(let i=0;i<links.length;i++){
      const item=links[i]
      console.log("movie no: ",i+1)
      const cheerio=await getCheerio(item.link)
      const real_link=extractSermoviesLink(cheerio,skip,url)
      output=[...output,...real_link]
    
    }
    console.log(output.length)
    exportAsCsv("sermovies.json",output)
  } catch (e) {
    console.log("error :",e)
  }
})()