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
       if(href.indexOf(".mkv")>=0 || href.indexOf(".mp4") >= 0){
        newData.push({text:o.text,href:o.href})
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
  let d=[]
 await data.map((o)=>{
   let type;
   let link;
   if((o.text.search("320p") >0)){
     type="p_320"
      link=o.href
   }else if((o.text.search("480p") > 0)) {
          type="p_480"
      link=o.href
   }else if((o.text.search("720p") >0)){
          type="p_720"
      link=o.href
   }else if((o.text.search("1080p") >0)){
          type="p_1080"
      link=o.href
   }else{
         type="p_480"
      link=o.href
   }
   if(mode=="year"){
     console.log(searchYear(o.href))
   }
  const year=searchYear(o.href)
  let r=o.text
  .replaceAll("."," ")
.replaceAll(year,"-")
.split("-")[0]
.replaceAll(">","")
.trim()

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
const arr= str.split(".")
 const p=arr[arr.length - 4]

 if(p=="380p" || p=="480p" || p=="720p" || p=="1080p"){
   const a=arr[arr.length - 5]
   return isNaN(a) ? "0000" : a
 }
 
 return isNaN(p) ? "0000" : p
  
}

removeNonVideoLink()
