export default class client {
    constructor(id){
        this.admin_id = id ; 
        this.taken = true ;        
    }

    adminTaken(){
        return this.taken  ; 
    }
}