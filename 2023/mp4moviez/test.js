




const b=require("./data/mp4moviez.bollywood.json")
const bt=require("./data/mp4moviez.bollywood.test.json")

b.links.map((item,i)=>{
  if(item.url==bt.links[i].url){
    console.log("yes")
  }else{
    console.log(item.url)
    console.log(bt.links[i].url,"\n")
  }
})

