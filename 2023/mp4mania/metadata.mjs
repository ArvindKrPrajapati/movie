import fetch from 'node-fetch'


export const metadata=async (link)=>{
  const _l=encodeURIComponent(link)
  const api="https://api.shotstack.io/v1/probe/"
  const res=await fetch(api+_l)
  return await res.json()
}


