require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors');
require('./config/mongoDB')()
const authRouter = require('./routers/authRouter');
const roleRouter = require('./routers/roleRouter');

const app = express();

// MIDDLEWARE 
app.use(cors({
    origin: [
        process.env.CLIENT1
        // list more allowed origins
    ], credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// ROUTES
app.use(authRouter)
app.use(roleRouter)


app.listen(5000, () => console.log('🚀: http://localhost:5000'))