const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Doubt = require('./models/Doubt')
const User = require('./models/User')
const multer = require('multer')
require("dotenv").config()
const upload = multer()
const connectionParams = {
    useNewUrlParser: true,
}

const PORT = process.env.PORT
try{
    mongoose.connect(process.env.MONGO_URI, connectionParams)
    .then(() => {
        console.log('Connected to Database');
    })
}
catch(e){
    console.log(e);
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://doubtnet.onrender.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(cors({
    origin : ['http://localhost:3000',"http://doubtnet.onrender.com"],
    credentials: true
}))
app.use(express.json())

app.post('/newdoubt',upload.none(), async(req,res) => {
    try{
         const {author, head, body} = req.body
        console.log(head);
        console.log(body);
        console.log('works');
        const newDoubt = await Doubt.create({
            author,
          head,
          body,
        });
    (console.log('Data inserted'))
}
catch(e){
    console.log('Couldnt Insert Data');
}
})

app.get('/doubts', async(req, res) => {
    const doubts = await Doubt.find()
    .sort({createdAt : -1})

    res.json(doubts)
})

app.put('/:id/like', async(req,res) =>{
    const id = req.params.id
    const doubt = await Doubt.findById(id)
    if(!doubt) return res.status(404).send('The doubt with the given ID was not found.')
    doubt.likes++
    await doubt.save()
    res.json(doubt)
})

app.put('/:id/reply',upload.none(),  async(req,res) =>{
    const id = req.params.id
    const {reply} = req.body
    const doubt = await Doubt.findById(id)
    if(!doubt) return res.status(404).send('The doubt with the given ID was not found.')
    doubt.replies.push(reply)
    await doubt.save()
    res.json(doubt)
})

app.delete('/:id/delete', async(req,res) => {
    const id = req.params.id
    const find = await Doubt.findById(id)
    if(!find)return res.status(400).send("Not Found...")
    const doubt = await Doubt.findByIdAndDelete(id)
res.json(doubt)
})

app.post('/signup', upload.none(), async(req,res) => {
    const {name,email,password} = req.body
    const check = await User.findOne({email : email})
    const exist = await User.findOne({name : name})

    if(!check && !exist){
        res.json("notexist")
        const user = await User.create({
            name : name,
            email : email,
            password : password,
        })
    }
    else{
        res.json("exist")
    }
})

app.post('/login', upload.none(), async(req,res) => {
    const {email,password} = req.body
    console.log(email);
    console.log(password);
    const user = await User.findOne({email:email, password:password})
    if(user){
        console.log(user.name);
        return res.json(user)
    }
    else{
        res.json("notexist")
    }
})

app.listen(PORT,() => {
    console.log('server running on port 5000...');
    //console.log(process.env.MONGO_URI);
})
