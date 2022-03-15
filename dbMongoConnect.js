const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const connectionString = process.env.MONGO_URI

//Conexion a mongodb

mongoose.connect(connectionString)
.then(()=>{
    console.log('DB connect')
}).catch(err=>{
    console.log(err)
})