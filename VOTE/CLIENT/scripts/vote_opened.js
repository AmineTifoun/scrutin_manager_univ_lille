const main = document.getElementsByClassName("main")[0];
const alter = document.getElementsByClassName("alter")[0];
const vote = document.getElementsByClassName("data")[0] ; 
const text = document.getElementsByTagName("p")[0]
const socket = io("http://localhost:8500");

const data = {
    name_client: "TEST",
    id_client: socket.id , 
};

 

socket.on("connect", () => {
    const data = {
        name_client: "TEST",
        id_client: socket.id,
    };
    socket.emit("client_connection", data);
    const checker = setInterval(()=>{
        socket.emit("ask_vote_session") ; 
        socket.on("is_vote_opened" , (data)=>{
            if(data.state){
                alter.style.display="none" ;
                main.style.display ="block";
                text.textContent = data.text ;
                clearInterval(checker) ;
            }else{
                main.style.display = "none" ;
                alter.style.display = "block" ;     
            }
        })
    })
});


window.addEventListener("beforeunload", () => {
    socket.emit("client_disconnecting");
});


socket.on("is_vote_opened" , (text)=>{
    const textToVote = document.getElementsByTagName("p")[0] ;
    text.textContent = text  ; 
})


vote.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = event.submitter; 
    socket.emit("vote", value.value); 

    const clickedButtons = [...document.getElementsByTagName("button")];
    clickedButtons.forEach((button) => {
        if (button !== value) {
            button.disabled = true;
            button.style.opacity = 0.5;
        }
    });
});