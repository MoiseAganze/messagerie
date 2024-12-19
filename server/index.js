const app=require("express")()

const server=require("http").createServer(app)

const io =require("socket.io")(server)

app.get("/",(req,res)=>{
    res.sendFile(`${__dirname}/public/index.html`)
})
io.on('connection',(socket)=>{
    console.log("un user s'est connecte");
    socket.on('disconnect',()=>{
        console.log("deconnected");
        
    })
    socket.on("mess",(msg)=>{
        io.emit('mess',msg)
        
    })
    
})
server.listen(10000,()=>console.log("port 10000"))