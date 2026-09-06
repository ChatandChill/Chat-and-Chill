require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI;
if(MONGO_URI){
  mongoose.connect(MONGO_URI)
    .then(()=>console.log(✅ Connected to ${mongoose.connection.name} v6.7.0))
    .catch(e=>console.error('❌',e.message));
}

const userSchema = new mongoose.Schema({
  userId: String,
  nativeLanguage: String,
  walletBalance: { type:Number, default: 6765000000000 },
  isVerified: Boolean
});
const User = mongoose.model('User', userSchema);

app.get('/',(req,res)=>res.json({ status:'Supreme v6.7.0', mongo: mongoose.connection.readyState===1?'Connected':'Not Connected', db: mongoose.connection.name }));
app.get('/api/test',(req,res)=>res.json({ mongo: mongoose.connection.readyState }));

const PORT=process.env.PORT||5000;
app.listen(PORT,()=>console.log(🔥 v6.7.0 on ${PORT}));
