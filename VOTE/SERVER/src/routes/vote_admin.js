import fs from 'fs'
export default class Admin_vote{
    constructor(req , res){
        this.req = req ; 
        this.res = res;   
    }

    setheaders() {
        this.res.setHeader("Content-Type", "text/html");
        this.res.statusCode = 200; 
    }
    
    setContent(){
        const FILEPATH = "public/Pages/admin_vote.html"; 
        fs.readFile(FILEPATH  , ( err , data)=>{ 
            this.res.end( data , 'utf-8');
        })
    }

    buildresponse(){
        this.setheaders();
        this.setContent();

    }

}