const express= require("express");
const dotenv=require("dotenv")
dotenv.config();
const router=express.Router();

const OpenAI=require("openai");

const openAI=new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,

});

router.post("/chat", async(req,res)=>{
    const {prompt} =req.body;
    try{
    const completion = await openAI.completions.create({
        model: "gpt-3.5-turbo",
        message: [{role: "assistant", content: prompt}], 
        temperature: 1,
        max_tokens: 256,
        top_p:1,
        frequency_penalty:0,
        presence_penalty: 0,
    })
    res.send(completion.choices[0].message.content);
}
catch(err){
    res.status(500).send(err)
}
    
})

module.exports=router;
