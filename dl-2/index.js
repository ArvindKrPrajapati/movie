// test to find info about data imported
// filter to filter Names
// dev to write data in file
//year to check if year exists in text
var mode="dev";


var {data}=require("./links")

const desFile="../data.js"
const fs=require('fs')
if(mode=="dev"){
var writeStream =fs.createWriteStream(desFile)
}

var newData=[]

const removeNonVideoLink= async ()=>{
    await data.map((o)=>{
        const href=o.href
      
       if(href.indexOf(".mkv")>=0 || href.indexOf(".mp4") >= 0 ){
          //to remove trailer links
           if(!(href.search("Trailer")>0)){
            newData.push({text:o.text,href:o.href})
           }
       }else{
         if(mode=="test"){
          console.log(href,"\n")
         }
       }
    })
    if(mode=="test"){
      console.log("total links : ",data.length)
    }
      
      if(mode=="test"){
         console.log("not video links : ",data.length - newData.length)
         console.log("video links :",newData.length)
       }
         data=newData
         generate()
}

const generate=async ()=>{
  if(mode=="dev"){
   await writeStream.write("const data = [\n") 
  }
  
 await data.map((o)=>{
   const link=o.href
   const type=searchReso(o.href)
   const year=searchYear(o.href)
    if(mode=="year"){
     console.log(year)
   }
  let r=o.text
  .replace("/","")
  .replaceAll("."," ")
  if(mode=="dev"){
  writeStream.write(`{
    name:"${r}",
    year:${year},
    href:[
      {
        ${type} : "${link}"
      }
    ]
  },\n`)
}
  if(mode=="filter"){
   console.log(r)
 }

 })
 if(mode=="dev"){
  await writeStream.write("]\n module.exports={data}")
  await writeStream.end()
  console.log(data.length," links are saved and exprted from data.js file with variable name  'data'")
}
}

const searchYear= (str)=>{
   return str.split("/")[6]
}

const searchReso=(str)=>{
  if((str.search("320p") >0)){
     return "p_320"
   }
   if((str.search("480p") > 0)) {
         return "p_480"
   }
   if((str.search("720p") >0)){
         return "p_720"
   }
   if((str.search("1080p") >0)){
        return "p_1080"
   }
   
       return "p_480"
}
removeNonVideoLink()
