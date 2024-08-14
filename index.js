const express = require("express"); 

const mongoose = require("mongoose");

const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://krishna43835:Hm2m0TaPEm1XttaC@cluster0.iyugs.mongodb.net/server_04")
.then(()=>console.log("MongoDB Connected"))
.catch((e)=>console.log(e))

const registerSchema = new mongoose.Schema({
    userName : {
        type: String,
        // require:true,
        // unique:true,
        // default:"test"
    },
    email :{
        type:String,
    },
    age:{
        type:Number,
    },
    gender:{
        type:String
    }
},{
    timestamps:true,
});

const register = mongoose.model("kaja",registerSchema);

app.post("/register", async (req,res)=>{
    try{
        let {userName,age,gender,email } = req.body;
        console.log(userName,age,gender,email);
let data = {
    ...req.body,
}

        let newUser = await register.create(req.body);
        res.json({
            data:newUser,
            message:"login succesfull"
        }) 
    }catch(error){
        console.log(error)
    }
})

const port = 7000;

// let data;

// app.get("/userdata",(req,res)=>{
//     if(!data){
//         message:"Data not found",
//         res.status(404).json({
//         });
//     }
// });
// app.use("/",(req,res)=>{
// res.send("TEST")
// });

app.listen(port,()=>{
    console.log(`Server is Running ${port}`)
});