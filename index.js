const express = require("express"); 

const mongoose = require("mongoose");

require("dotenv").config();

const port = 6969;

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log(`Server Successfully Connected http://localhost:${port}`))
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

const loginSchema = new mongoose.Schema({
    userName : {
        type: String,
        require:true,
        unique:true,
        },
    password : {
        type: String,
        require:true,
    },
},
{
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

app.get("/getuserdata", async(req,res)=>{
    try{
        let getAllUSer = await register.find().sort({_id: -1});
        if(!getAllUSer || getAllUSer.length===0){
            return res.status(404).json({
                message : "Data Not Found"
            });
        }
        res.json({
            data: getAllUSer
        })
    }catch(error){
        res.json({
            Error: error
        })
    }
});

// data get() panradhukku use panradhu
app.get("/getuserdatabasedonage", async(req,res)=>{
    try{
        let {age} = req.query;
        // let {id} = req.params;
        let getAllUSer = await register.find({age}).sort({_id: -1});
        if(!getAllUSer || getAllUSer.length===0){
           return res.status(404).json({
                message : "Data Not Found"
            });
        }
        res.json({
            data: getAllUSer
        })
    }catch(error){
        res.json({
            Error: error
        })
    }
});

//findById Method
app.get("/getobject",async (req,res)=>{
    try{
    let {objectId} = req.query;
    const findObject = await register.findById(objectId);
    if(!findObject){
        return res.status(404).json({
            Message:"Data Not Found"
        })
    }

    res.json({
        data: findObject
    })

    }catch(error){
        res.json({
            Error: error
        })
    }
    
});
const login = mongoose.model("login",loginSchema);



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
    console.log(`Server is Running `)
});