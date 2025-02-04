let nb_connexions = 0  ; 
const main = document.getElementsByClassName("main")[0];
const alter = document.getElementsByClassName("alter")[0];
const actifs = document.getElementsByClassName("actifs")[0] ;/* CONATAINS NUMBER OF ACTIF CLIENT */
const text_avoter = document.getElementById("voteForm") ;
const socket = io("http://localhost:8500");

// Emit the request to check if there is already an admin
socket.emit('admin_ask');

// Handle the response from the server
socket.on("admin_res", (bool) => {
    // Now that we have the boolean, we can safely modify the display property
    if (bool) {
        alter.style.display = "none";  // Hide the "alter" div if there is already an admin
    } else {
        main.style.display = "none";   // Hide the "main" div if no admin
        alter.style.display = "block"; // Show the "alter" div
    }
});

socket.on("update_nb_connexion" , (data)=>{
    console.log(data) ;
    actifs.textContent = data ; 
    nb_connexions = data ;
} )

text_avoter.addEventListener("submit" , (event)=>{
    event.preventDefault() ;
    console.log("VOTE LANCE") ; 
    socket.emit("vote_activated" , event.target.elements.textToVote.value) ; 
})

