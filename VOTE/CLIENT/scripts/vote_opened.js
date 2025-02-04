const main = document.getElementsByClassName("main")[0];
const alter = document.getElementsByClassName("alter")[0];
const socket = io("http://localhost:8500");

const data = {
    name_client: "TEST",
    id_client: socket.id , 
};

 

socket.on("connect", () => {
    console.log("🆔 Client connecté avec ID :", socket.id);

    const data = {
        name_client: "TEST",
        id_client: socket.id,
    };

    socket.emit("client_connection", data);
    socket.emit("ask_vote_session") ; 
    socket.on("is_vote_opened" , (opened)=>{
        if(opened){
            alter.style.display="none" ;
        }else{
            main.style.display = "none" ;
            alter.style.display = "block" ;
            const checkvote = setInterval(()=>{
                socket.emit("ask_vote_session") ; 
                socket.on("is_vote_opened"  , (newOpened)=>{
                    console.log("server a repondu avec :"+newOpened)
                    if( newOpened){
                        window.location.reload() ; 
                        clearInterval(checkvote) ; 
                    }
                })
            } , 20000)
        }
    })  
});


window.addEventListener("beforeunload", () => {
    socket.emit("client_disconnecting");
});

