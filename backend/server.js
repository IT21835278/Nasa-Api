const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const path =require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser")

// const userRoutes = require("./routes/userRoutes");
const authRouter = require ("./routes/authRoutes")

const app = express();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.urlencoded({extended:false}));

app.use(cors(
    {
        origin: ["http://localhost:5173","https://nasa-app.vercel.app"],
        credentials: true,
    }
));

//routes
app.use("/api/auth",authRouter)





//DB connection
const PORT = process.env.PORT || 5000;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () =>{
            console.log(`server Running is port ${PORT} 🚀 `);
        })
    })
    .catch((err)=>console.log(err))
