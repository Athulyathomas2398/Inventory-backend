require('dotenv').config();
const express=require('express');
const cors=require('cors');
require('./db/connection.js')
const itemRoutes=require('./routes/itemRoutes.js')
const goodsInRoutes=require('./routes/goodsInRoutes.js')
const goodsOutRoutes=require('./routes/goodsOutRoutes.js')
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api/items', itemRoutes);
app.use('/api/items', goodsInRoutes);
app.use('/api/items', goodsOutRoutes);
const PORT=3000||process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
app.get('/',(req,res)=>{
    res.status(200).send('Server is running')
})