import fs from 'fs'

export default class HomeRoute{
    constructor(req , res){
        this.req = req ;
        this.res = res ; 
    }

    setheaders() {
            this.res.setHeader("Content-Type", "text/html");
            this.res.statusCode = 200; 
        }
        
        setContent(){
            const FILEPATH = "public/Pages/home.html"; 
            fs.readFile(FILEPATH  , ( err , data)=>{ 
                this.res.end( data , 'utf-8');
            })
        }
    
        buildresponse(){
            this.setheaders();
            this.setContent();
    
        }

}