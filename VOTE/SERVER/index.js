import http from "http";
import { RequestControler } from "./src/Controller/ReqController.js";
import { Server as IOServer } from "socket.io";
import Admin from "./src/role/admin.js";


const admin = new Admin() ;
const port = 8500;
const server = http.createServer((req, res) => {
    const response = new RequestControler(req, res); 
    response.route();
});

server.listen(port, () => {
    console.log("Server connected on: " + port);
});

const io = new IOServer(server, {
    cors: {
        origin: "*", // Allow all origins (for testing)
       
    }
});

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);
    socket.on("admin_ask" , ()=>{ /* MANAGING THE ACCESS TO ADMIN */
        console.log(`The client ${socket.id} is asking to be admin`) ;
        console.log(`The Servet answer the client  ${socket.id} by :${admin.CanBeAdmin}`);
        socket.emit("admin_res" , admin.CanBeAdmin) ;
        admin.notpossible() ; 
    })

    socket.on("client_connection", (data)=>{
        admin.add_connecter(data) ;
        console.log(admin.nb_connexions)
    })

    const check = setInterval(()=>{
        socket.emit("update_nb_connexion" , admin.nb_connexions) ; 
        /*console.log("nb connexions recense :"+admin.nb_connexions)*/
    } , 200) ;

    socket.on("ask_vote_session" , ()=>{
        const data = {
            state :admin.isVoteOpened ,
            text : admin.textVote
        }
        
        socket.emit("is_vote_opened" , data) ;
    })

    socket.on("vote_activated" , (text)=>{
        admin.setText(text) ; 
        admin.startVote() ;
      })

    socket.on("client_disconnecting" , ()=>{
        console.log("nb connexions :"+admin.nb_connexions) ;
        console.log("client disconnected") ;
        admin.clientRemove() ;
        console.log("nb connexions :"+admin.nb_connexions) ;

    })  




    socket.on("vote" , (vote)=>{
        admin.set_votes(vote) ;
        console.log(admin.RESULT) ; 
    })

});





