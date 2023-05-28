import{ getCheerio,extractLinks,extractLinksUsingClass,exportAsCsv} from "../common.mjs"


const format=(data,year, country, language)=>{
  const results=[]
  data.links.map((item)=>{
    const r={
      quality:"",
      year,
      name:item.text.split("(")[0].trim(),
      country,
      language,
      url:""
    }
    if(item.text.includes("Low Quality.mp4")){
      r["quality"]="low"
      r["url"]=item.href
      results.push(r)
    }else if(item.text.includes("HD.mp4")){
      r["quality"]="hd"
      r["url"]=item.href
      results.push(r)
    }else if(item.text.includes("720p.mp4")){
      r["quality"]="720p"
      r["url"]=item.href
      results.push(r)
    }else if(item.text.includes("480.mp4")){
      r["quality"]="480p"
      r["url"]=item.href
      results.push(r)
    }
  })
  return {length:results.length,links:results}
}


const nextPageLink=async (data,url_addon,className,skip=[])=>{
  const {links}=data
  let results=[]
  console.log("Total Movie : ",links.length,"\n")
  for (let i=0; i<links.length;i++){
    const url=links[i].href
    console.log("movie number: ",i+1)
    const $=await getCheerio(url)
    let newLinks=extractLinksUsingClass($,className,skip,url_addon)
   results=[...results,...newLinks]
  }
  return {length:results.length,links:results}
}

(async()=>{
  try {
    const url="https://www.mp4moviez.berlin/236/latest-bollywood-movies-(2023).html"
    const skip=[0,1,2,3,4,5,6,7,8,71,70,69,68,67,66,65]
    const url_addon="https://www.mp4moviez.berlin"
    const $=await getCheerio(url)
    const links=extractLinks($,skip,url_addon)
    const details_page_links=await nextPageLink(links,url_addon,"mast",[0,1,3])
   console.log("\n ********* extracing movie links ********")
    const movie_links=await nextPageLink(details_page_links,"","mast",[0,1])
    const fml=format(movie_links,"2023","India","hindi")
    exportAsCsv(fml,"mp4moviez.bollywood.test.json")
   
  } catch (e) {
    console.log("error :",e)
  }
})()

