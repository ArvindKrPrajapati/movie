
var deleteUrl = "https://api-shorts.herokuapp.com/v1/movie/delete?id="
var getUrl = "https://api-shorts.herokuapp.com/v1/movie/all?page="


const fetch = require('node-fetch');
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

 



const fetchData =async (page)=>{
  console.log("fetching ...")
  try {
    const res=await fetch(getUrl+page)
    const resData=await res.json()
    console.log("### fetched ###")
    await console.log("deleting...")
     
   await resData.data.map(async(o,i)=>{
       try {
        const dr= await  fetch(deleteUrl+o._id)
        const dd=await dr.json()
        console.log(`*** deleted ${i+1} ***`)
      } catch (e) {
        console.log("error while deleting")
      }
      
    })
  } catch (e) {
    console.log("error while fetching")
  }
}


fetchData(1)