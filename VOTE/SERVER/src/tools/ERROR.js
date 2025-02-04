


export default class ERROR {
    constructor( req ,res){
        this.req = req ;
        this.res =  res ;
    }

    buildResponse(){
        this.title = "Page d'erreur";
        this.res.setHeader("content-type"  , "text/html");
        this.res.statusCode = 404 ; 
        const content = `<!DOCTYPE html>
                <html>
                    <head>
                        <title>${this.title}</title>
                        <link href="./../public/style/style.css" rel="stylesheet" type="text/css"></link>
                    </head>
                    <body>
                    <h1>CHEMIN NON RECONNU </h1>
                    </body>
                    </html>`;
        this.res.end(content);
    }
}