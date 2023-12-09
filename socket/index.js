

const io=require('socket.io')(8080,{
    cors:{
        origin:"http://localhost:3000"
    }
})



let activeusers=[]


io.on("connection",(socket)=>{
    // add new user

    socket.on('new-user-add',(newuserid)=>{
        if(!activeusers.some((user)=>user.userid===newuserid)){
            activeusers.push({
                userid:newuserid,
                socketid:socket.id
            })
        }
        console.log("connected users",activeusers)

        io.emit('get-users',activeusers)
    })
    // send mess
    socket.on('send-message',(data)=>{
        const {receiverid}=data
        const user=activeusers.find((user)=>user.userid===receiverid)
        console.log("sending from socket to :",receiverid)
        console.log("data",data)
        if(user){
            io.to(user.socketid).emit("receive-message",data)
        }

    })

    socket.on("disconnect",()=>{
        activeusers=activeusers.filter((user)=>user.socketid!==socket.id)
        console.log("user Disconnected",activeusers)
        io.emit('get-users',activeusers)

    })
})