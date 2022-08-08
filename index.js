var addUrl = "https://api-shorts.herokuapp.com/v1/movie/add"
var searchUrl = "https://api-shorts.herokuapp.com/v1/movie?id="


const fetch = require('node-fetch');
let { data } = require('./data')
const allData=data
let {page}=require("./page")
console.log("page : ",page)
try {
  var {skipped} =require("./skipped")
} catch (e) {
  skipped=[]
}

const limit =data.length
page=(page - 1)*limit
console.log("data left : ",data.length - page)

data=data.slice(page,page+limit)
//data =data.slice(50)
const fs=require('fs')
const readline = require('readline')



const readInput = (question) => {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => interface.question(question, answer => {
    interface.close();
    resolve(answer);
  }))
}


var i = 0;
if(skipped==undefined){
  skipped=[]
}


const fetchData = async () => {
  if(data.length==0){
    await fs.writeFileSync("./page.js","module.exports={page:1}")
    await saveSkipped()
    console.log("no data")
    return
  }
  if(data.length<=i){
    const p=(page / 20)+2
    const a = "module.exports={page:"+p+"}"
    await fs.writeFileSync("./page.js",a)
    console.log("\x1b[32m","All Data saved successfully");
    console.log("\x1b[37m");
  }
  if (i >= data.length) return;
  let url = "https://api.themoviedb.org/3/search/movie?query=" + data[i].name + "&api_key=a7bab20bfb05393e01bf1ff859667255"
  console.log("\x1b[34m", `loading...(  ${i+1} / ${data.length} )`)
  try {
    const response = await fetch(url);
    const resData = await response.json();
    console.log("\x1b[37m", "original name : " + data[i].name.toLowerCase() + "( "+data[i].year+ " )")
   let filterData=[]
   let myindex=0
    await resData.results.map((o, index) => {
     const f=o.title.replace(":","").toLowerCase()
     const my =data[i].name.toLowerCase()
      
     if(!(data[i].skip)){
         if(f==my){
       //filter based on Date
          if(data[i].year){
             if(o.release_date?.split("-")[0]==data[i].year){
                filterData.push(o)
                console.log("\x1b[36m", "( " + myindex + " ) " + f+"  ( "+o.release_date+" ) ")
                 myindex++;
             }
           }else{
             filterData.push(o)
             console.log("\x1b[36m", "( " + myindex + " ) " + f+"  ( "+o.release_date+" ) ")
             myindex++;
           }
        
      }
     }else{
       filterData.push(o)
       console.log("\x1b[36m", "( " + myindex + " ) " + f+"  ( "+o.release_date+" ) ")
       myindex++;
     }
       
     })




    //take input
    let selectedMovie;
    if(filterData.length==1){
       selectedMovie=0
       const fetchMovie =  filterData[selectedMovie].title.replace(":","").toLowerCase()
       const myMovie =data[i].name.toLowerCase()
       
       if(fetchMovie==myMovie){
         console.log("\x1b[32m"," ##### saving using match algorithm #####")
       }else{
          selectedMovie = await readInput("\x1b[33m What is matched result index ?  or press enter to skip    ")
       }
       
    }else{
      if(filterData.length==0){
        console.log("  **Nothing found ,Automatically skiping..**")
      }else{
       selectedMovie = await readInput("\x1b[33m What is matched result index ?  or press enter to skip    ")
       }
     }
    
    
     // constate object to be saved
      const details = filterData[selectedMovie]
      if (details) {
        let obj = { ...details, links: data[i].href }
        console.log("\x1b[37m", "saving");
        const alreadySaved=await search(details.id)
        if(alreadySaved){
          obj={...alreadySaved , links:[...alreadySaved.links,data[i].href[0]]}
        }
       // console.log(obj)
       await fetch(addUrl,
          {
            headers: {
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(obj)
          })
          .then(res => res.json())
          .then((d) => {
            if (d.success) {
              console.log("\x1b[32m","saved");
            } else {
              console.log("\x1b[31m","error while saving");
            }
          })
          .catch((e) => {
            console.log("\x1b[31m","error while saving");
          })

      }else{
        skipped.push(page+i)
        const a="module.exports={skipped:["+skipped+"]}"
        await fs.writeFileSync("./skipped.js",a)
        console.log("skipped")
      }

    


    // //end

    i = i + 1
    console.log("\n\n")
    fetchData()
  } catch (e) {
    console.log(e)
  }
}



const saveSkipped =async ()=>{
  const uniqueIndex=await [...new Set(skipped)]
  let index=0;
  skipped=[]
  await fs.writeFileSync("./skipped.js","")
  await fs.writeFileSync("./data.js","const data=[")
  if(uniqueIndex.length==0){
   fs.appendFileSync("./data.js","]\n module.exports={data}")
  }
 await allData.map((o,i)=>{
   index=index+1
    if(uniqueIndex.includes(i)){
      let w;
      const key=Object.keys(o.href[0])[0]
      
      switch (key) {
        case 'p_320':
          value=o.href[0].p_330
          break;
        case 'p_480':
          value=o.href[0].p_480
          break;
        case 'p_720':
          value=o.href[0].p_720
          break;
        default:
          value=o.href[0].p_1080
          break;
      }
     
      if(uniqueIndex.length == index){
         w=`\n{
                name:"${o.name}",
                skip:true,
                year:${o.year},
                href:[{
                 ${key} : "${value}"
                }]
              }\n
           ]
           module.exports={data}`
       }else{
        w=`\n{
                name:"${o.name}",
                skip:true,
                year:${o.year},
                href:[{
                    ${key} : "${value}"
                }]
              },`
              
       }
            fs.appendFileSync("./skipped-data.js",w)
            
    }
  })
}




const search =async (id)=>{
  try {
    /* code */
    const res=await fetch(searchUrl+id)
    const j=await res.json()
    return j.data
  } catch (e) {
    return null
  }
}


fetchData()

// "links": [
//   {
//       "p_720": "http://162.12.215.254/Data/Movies/Dual%20Audio/2019/Avengers%20Endgame%202019%20Dual%20Audio%20ORG%20720p%20BRRip%201.7Gb%20x264/Avengers%20Endgame%202019%20Dual%20Audio%20ORG%20720p%20BRRip%201.7Gb%20x264.mkv"
//   },
//   {
//       "p_480": "http://162.12.215.254/Data/Movies/Hollywood/2019/Avengers%3A%20Endgame%20%282019%29/Avengers%20Endgame%202019%20NEW%20SOURCE%20720p%20HD-TC%201XBET.mkv"
//   }
// ]