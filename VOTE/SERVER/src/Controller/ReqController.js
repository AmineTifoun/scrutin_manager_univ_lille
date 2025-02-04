import { URL } from 'url'
import HomeRoute from '../routes/HomeRoute.js';
import Admin_vote from '../routes/vote_admin.js' ; 
import FileResponder from "./../routes/fileResponder.js"
import VotantRoute from './../routes/votantRoute.js'


export  class RequestControler {
    constructor(req , res){
        this.req = req ;
        this.res = res ; 
        this.routers = {
            "/" : new HomeRoute(req , res),
            "/votant" : new VotantRoute(req ,res),
            /*"/about": new about(req, res),*/
            "/admin_vote": new Admin_vote(req, res)
        }
    }


    route(){
        const url = new  URL(this.req.url ,`https://${this.req.headers.host}`);
        const path = url.pathname ; 
        if (path === "/favicon.ico") { /* LOGO DE CHARGEMENT CAUSANT UN BEUG SOLUTIONNE */
            this.res.writeHead(204); // 204 = No Content
            this.res.end();
            return;
        }
        const responder = this.routers[path];
        if( responder == undefined){ /* CHARGEMENT DES ASSEST ET DEPENDECIES*/
            const alter = new FileResponder( this.req ,this.res) ; 
            alter.buildResponse() ;
            return ;
        }
        responder.buildresponse() ; 
    }
}