export default class Admin {
    constructor(){
        this.can_be_admin = true ; 
        this.id = undefined ; 
        this.connexions = 0 ;
        this.vote_opened = false  ; 
        this.votes = {
            "FOR" : 0 ,
            "NPDD" : 0 ,
            "AGAINST" : 0 ,
            "NO ANSWERS" : 0
        }
        this.text="" ;
    }

    get CanBeAdmin(){
        return this.can_be_admin ;
    }

    add_connecter(client_data){
        this.connexions ++ ; 
    }

    notpossible(){
        this.can_be_admin = false  ; 
    }

    startVote(){
        this.vote_opened = true ;
    }
    get textVote(){
        return this.text ; 
    }
    get isVoteOpened(){
        return this.vote_opened ;
    }


    get nb_connexions(){
        return this.connexions  ;
    }

    clientRemove(client){
        this.connexions-- ; 
    }
    
    set_votes(index){
        this.votes[index]++ ;  
    }

    get RESULT(){
        return this.votes ; 
    }

    setText(text){
        this.text= text ; 
    }
} 