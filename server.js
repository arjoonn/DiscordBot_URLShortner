const express = require('express')
const URL = require('./model/url')
const mongoose=require('mongoose')
const PORT=3001
const app=express()

//mongodb connection
mongoose
  .connect("mongodb://127.0.0.1:27017/url-shortner-frombot")
  .then(() => console.log("connected to mongoDB successfullyy"))
  .catch((error) => console.log("connection error",error));


app.get('/:shortId',async(req,res)=>{
    const { shortId } = req.params;
    try {
        const entry = await URL.findOne({ shortId });
    
        if (!entry) {
          return res.status(404).send("Short URL not found ❗");
        }
    
        return res.redirect(entry.redirectUrl);

}catch (error) {
    console.error("Error finding shortId:", error);
    return res.status(500).send("Internal Server Error ❌");
  }
});



app.listen(PORT,()=>{
    console.log(`server running at:http://localhost:${PORT} `);
    
})