// test to find info about data imported
// filter to filter Names
// dev to write data in file
//year to check if year exists in text
var mode="dev";


var {data}=require("./real-link")

const desFile="../data.js"
const fs=require('fs')
if(mode=="dev"){
var writeStream =fs.createWriteStream(desFile)
}

var newData=[]

const removeNonVideoLink= async ()=>{
    await data.map((o)=>{
        const href=o.href
       if(href.indexOf(".mkv")>=0 || href.indexOf(".mp4") >= 0 || href.indexOf(".MP4")>=0){
        newData.push({...o})
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
   let link=o.href
    if(o.reso=="320p"){
     type="p_320"
   }else if(o.reso=="480p") {
          type="p_480"
   }else if(o.reso=="720p"){
          type="p_720"
   }else if(o.reso=="1080p"){
          type="p_1080"
   }else{
         type="p_480"
   }

   if(mode=="year"){
     console.log(searchYear(o.text))
   }
  const year=searchYear(o.text)
  let r=o.text.
  replaceAll("("," ")
  .replaceAll(")"," ")
  .replaceAll("/"," ")
.replaceAll("["," ")
.replaceAll("]"," ")
.replaceAll(year," ")
  .replaceAll("2..>"," ")
  .replaceAll("-"," ")
  .replaceAll("[WEBRip] [1080p]..>","")
  .replaceAll("..>"," ")
  .replaceAll("English"," ")
  .replaceAll("/"," ")
  .replaceAll("..>"," ")
  .replaceAll("720p"," ")
  .replaceAll("x264"," ")
  .replaceAll("BluRay"," ")
  .replaceAll("BRRip"," ")
  .replaceAll("1080p"," ")
  .replaceAll("WEB-DL"," ")
  .replaceAll("WEB-HD"," ")
  .replaceAll("."," ")
  .replaceAll("HD"," ")
  .replaceAll("950M"," ")
  .replaceAll("750MB"," ")
  .replaceAll("850MB"," ")
  .replaceAll("Eng"," ")
  .replaceAll("HDRip"," ")
  .replaceAll("480p"," ")
  .replaceAll("800MB"," ")
  .replaceAll("Dual Audio"," ")
  .replaceAll("Hindi"," ")
  .replaceAll("ORG Dual Aud"," ")
  .replaceAll("WEB"," ")
  .replaceAll("CAM"," ")
  .replaceAll("1Gb"," ")
  .replaceAll("DVDScr"," ")
  .replaceAll("850Mb"," ")
  .replaceAll("2016"," ")
  .replaceAll("700MB"," ")
  .replaceAll("Blu"," ")
  .replaceAll("TV X264 Solar"," ")
  .replaceAll("x26  900MB"," ")
  .replaceAll("650MB"," ")
  .replaceAll("Web-DL"," ")
  .replaceAll("1GB"," ")
   .replaceAll("mp4"," ")
   .replaceAll("    ray   AAC  B","")
   .replaceAll("Bengali"," ")
   .replaceAll("Bangla"," ")
   .replaceAll("Web Dl"," ")
   .replaceAll("X264"," ")
   .replaceAll("x26"," ")
.replaceAll("Dubbed"," ")
.replaceAll("Dual"," ")
   .replaceAll("900MB"," ")
   .replaceAll("   720"," ")
   .replaceAll("600MB"," ")
   .replaceAll(" 625MB"," ")
   .replaceAll("  00Mb"," ")
   .replaceAll(" ESub"," ")
   .replaceAll(" Web"," ")
   .replaceAll(" 160p"," ")
   .replaceAll(" 4K"," ")
   .replaceAll("    4"," ")
   .replaceAll("    P"," ")
   .replaceAll("    W"," ")
.replaceAll("ESu"," ")
.replaceAll("900mb"," ")
.replaceAll("UNCUT"," ")
.replaceAll("  Gb"," ")
.replaceAll("900Mb"," ")
.replaceAll("TS 950"," ")
.replaceAll(" 900"," ")
.replaceAll("  xtended"," ")
.replaceAll("  Unrated"," ")
.trim()
.replaceAll("  ","-")
.split("-")[0]
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
const regex=/(?:\bdigit-|\s|^)(\d{4})(?=[.?\s]|-digit\b|$)/gi
const s= str.replace("("," ").replace(")"," ").search(regex)
  if(s>=0){
    return y=str.slice(s+1,s+5)
  }else{
   return "0000"
  }
}

removeNonVideoLink()
