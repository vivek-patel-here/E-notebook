const path =require("path");
require('dotenv').config({path:path.join(__dirname,'.env')})
const express =require('express');
const main = require("./middlewares/DB");
const userRoute =require("./Routes/authentication.js");
const noteRoute =require("./Routes/note.js");
const app = express();
const {ensureAuthenticated} = require("./middlewares/ensureAuthenticated.js");


//***************Only for development environment*******************
const cors = require('cors');
app.use(cors());

//connection with database
main(process.env.DB_URL).then(()=>{
    console.log('Connected with Database successfully!')
}).catch((err)=>{
    console.log("Unable to connect with database\nDut to :\n",err)
})

//parse req.body
app.use(express.urlencoded({extended:true}));
app.use(express.json())


//Routes
app.use('/user',userRoute)
app.use('/notes',ensureAuthenticated,noteRoute)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on the port ${process.env.PORT}`)
})