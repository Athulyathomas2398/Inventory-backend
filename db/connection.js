const mongoose=require('mongoose')

const connectionString=process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(res=>{
    console.log('mongoDB Connected');
    
}).catch(err=>{
    console.log('connection failed',err);
    
})