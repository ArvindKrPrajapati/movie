// test to find info about data imported
// filter to filter Names
// dev to write data in file
//year to check if year exists in text
var mode="test";


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

.replaceAll(".","")
.replaceAll(">","")
.replaceAll("2017","")
 /* .replaceAll("2..>"," ")
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
  .replaceAll("NF"," ")
  .replaceAll("480p"," ")
  .replaceAll("800MB"," ")
  .replaceAll("Dual Audio"," ")
  .replaceAll("Hindi"," ")
  .replaceAll("ORG Dual Aud"," ")
  .replaceAll("Rip"," ")
  .replaceAll("WEB"," ")
  .replaceAll("CAM"," ")
  .replaceAll("1Gb"," ")
  .replaceAll("DVDScr"," ")
  .replaceAll("850Mb"," ")
  .replaceAll("2016"," ")
  .replaceAll("700MB"," ")
  .replaceAll("Blu"," ")
  .replaceAll("     7"," ")
  .replaceAll("TV X264 Solar"," ")
  .replaceAll("x26  900MB"," ")
  .replaceAll("650MB"," ")
  .replaceAll("AMZN"," ")
  .replaceAll("Web-DL"," ")
  .replaceAll("1GB"," ")
   .replaceAll("mp4"," ")
   .replaceAll("    ray   AAC  B","")
   .replaceAll("Bengali"," ")
   .replaceAll("Bangla"," ")
   .replaceAll("Movie"," ")
   .replaceAll("Web Dl"," ")
   .replaceAll("DL"," ")
   .replaceAll("X264"," ")
   .replaceAll("   AA"," ")
   .replaceAll("    x"," ")
   .replaceAll("x26"," ")
   .replaceAll("    26"," ")
   .replaceAll("GB"," ")
   .replaceAll("RIp"," ")
   .replaceAll("ray"," ")
   .replaceAll("    C"," ")
.replaceAll("Dubbed"," ")
.replaceAll("Dual"," ")
.replaceAll("   5"," ")
   .replaceAll("   1"," ")
   .replaceAll("    2"," ")
   .replaceAll("    4"," ")
   .replaceAll("    8"," ")
   .replaceAll("900MB"," ")
   .replaceAll("   TV"," ")
   .replaceAll("   720"," ")
   .replaceAll("    B"," ")
   .replaceAll("    R"," ")
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
.replaceAll("  ch"," ")
.replaceAll("  Ri"," ")
.replaceAll(" 0"," ")
.replaceAll("  Gb"," ")
.replaceAll("   a"," ")
.replaceAll("   Aud"," ")
.replaceAll("   l"," ")
.replaceAll("   E"," ")
.replaceAll("   R"," ")
.replaceAll("   ORG"," ")
.replaceAll("   IMAX"," ")
.replaceAll("  Do"," ")
.replaceAll("   Au"," ")
.replaceAll("  DVD"," ")
.replaceAll("  H"," ")
.replaceAll("   i"," ")
.replaceAll(" 20"," ")
.replaceAll("–"," ")
.replaceAll("  Indi"," ")
.replaceAll("  INDI"," ")
.replaceAll("  wnlo"," ")
.replaceAll("900Mb"," ")
.replaceAll("  a","")
.replaceAll("  s"," ")
.replaceAll("  6"," ")
.replaceAll("  RR"," ")
.replaceAll("TS 950"," ")
.replaceAll("  C"," ")
.replaceAll("  D"," ")
.replaceAll(" 900"," ")
.replaceAll("   u"," ")
.replaceAll("18"," ")
.replaceAll("  e"," ")
.replaceAll("   b"," ")
.replaceAll("   Mb"," ")
.replaceAll("  xtended"," ")
.replaceAll("  Unrated"," ")*/
.trim()
/*
.replaceAll("  ","-")
.split("-")[0]*/
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
