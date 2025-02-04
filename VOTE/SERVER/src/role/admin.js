export default class Admin {
    constructor(){
        this.can_be_admin = true ; 
        this.id = undefined ; 
        this.connexions = 0 ;
        this.vote_opened = false ; 
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

    get isVoteOpened(){
        return this.vote_opened ;
    }


    get nb_connexions(){
        return this.connexions  ;
    }

    clientRemove(client){
        this.connexions-- ; 
    }
} 