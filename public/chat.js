//make connection
var client = io.connect("http://localhost:3000");
var message=document.getElementById('message'),
    username=document.getElementById("username"),
    btn=document.getElementById("btn"),
    output =document.getElementById("output"),
    feedback=document.getElementById("feedback");

    //emmit events
    btn.addEventListener("click",function(){
        client.emit("chat",{
                 message:message.value,
                username:username.value
        });
        event.preventDefault();
    });
    //feed back
    message.addEventListener("keydown",function(){
        client.emit("typing",username.value);
    });

    //listen for event
    client.on("chat",function(data){
        console.log(data);
        data.reverse().forEach(i => {
            var newElement = document.createElement('div');
             newElement.className = "chats";
            newElement.innerHTML =  "<p><strong>"+i.username+":</strong><br>"+i.message+"</p>";
           output.appendChild(newElement);
           output.insertBefore(newElement,output.lastChild)           
        });
        
        feedback.innerHTML ="";
        message.value="";
    });
    
    client.on("typing",function(data){
        feedback.innerHTML = "<i>"+ data + " is typing .....</i>";
    })