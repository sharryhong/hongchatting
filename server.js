var express = require("express");
var app = express();


var http = require("http").Server(app);
var io = require("socket.io")(http); // http를 이용하여 소켓통신을 하겠다.


app.set("port", process.env.PORT || 8080);

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/index.html");
});

// 소켓통신을 할 때는 요청, 응답의 구조가 아니다. 다리 하나 놓여있는 구조라고 보면된다. 
// 누군가 들어왔을 때 실행됨 
io.on("connection", function(socket){ 
    // console.log("a user connected");
    // socket.on("disconnect", function(){ // "disconnect": 약속어. 나갔을 때 실행 
    //     console.log("user disconnected");
    // });

    socket.on("chat message", function(msg){ // "chat message" : 약속어
        // console.log("message:" + msg);
        io.emit("chat message", msg);
    });
});

http.listen(app.get("port"), function(){
    console.log("Express chat server is running at localhost:" + app.get("port"));
});
