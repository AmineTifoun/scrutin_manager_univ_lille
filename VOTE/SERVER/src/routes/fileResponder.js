import fs from 'fs';
import path from "path";
import { getContentTypeFrom }  from '../tools/contentTypeUtil.js';
import ERROR from '../tools/ERROR.js'


export default class FileResponder {
    constructor(req , res ){
       this.req = req ; 
       this.res = res ;
    }
    
    buildResponse(){
        const filePath = path.join(process.cwd(), "public", this.req.url);
        try {
            fs.accessSync(filePath, fs.constants.R_OK);
            const content = fs.readFileSync(filePath);
            this.res.setHeader('Content-type' , getContentTypeFrom(filePath)) ;
            this.res.statusCode = 200 ;                  
            this.res.end(content);
        } catch (error) {
            const err = new ERROR( this.req , this.res);
            err.buildResponse() ;
       }
    }   
}