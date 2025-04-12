const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const connectDB =require('./config/db')
const authRoutes=require('./routes/authRoutes')
const linkRoutes=require('./routes/linkRoutes')
const redirectRoute=require('./routes/redirectRoutes')
const analyticsRoutes = require('./routes/analyticsRoutes');

dotenv.config()
connectDB()
const app=express()

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
    res.send('server is running fine')
})

app.use('/api/auth',authRoutes)
app.use('/api/link',linkRoutes)
app.use('/',redirectRoute)
app.use('/api/analytics', analyticsRoutes)


const Port=process.env.PORT || 50000;
app.listen(Port,()=>{
    console.log(`the server is on http://localhost:${Port}`)
})

