const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const socket=require("socket.io");


const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://lakshman:lakshman @cluster0-0tqob.mongodb.net/chatDB", { useNewUrlParser: true , useUnifiedTopology: true},function(err){
    if(!err){
        console.log("connected with database");
        
    }else{
        console.log(err);
        
    }
});
const isDatasend=false;

const chatSchema=new mongoose.Schema({
    username:String,
    message:String
    });
    
    const Chat=mongoose.model("chat",chatSchema);
    const prem=new Chat({
        username:"sai",
        message:"hey prem"
    });
    //prem.save();
    Chats=[];
var server = app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("the server is running at 3000");
});
const io = socket(server);

io.on("connection",function(socket){
    console.log("made socket connection",socket.id);

    //saving data to database
   
        socket.on("chat",function(data){
            let chatSent =new Chat({
                username:data.username,
                message:data.message
            });
            chatSent.save(function(){
                io.sockets.emit("chat",[data])
             
            });
        // console.log(Chats);
       
       
    });
    
  
    socket.on("typing",function(data){
        socket.broadcast.emit("typing",data);
    });

    Chat.find({},function(err,chats){
        if(err){
            console.log(err);
            
        }else{
            console.log(chats);
           // Chats.push(chats)
           socket.emit("chat",chats);
        }
    }); 
 
    

    
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});





