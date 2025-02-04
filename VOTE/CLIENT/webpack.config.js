const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    admin_vote: path.resolve(__dirname, "./scripts/admin_vote.js"),
    votant : path.resolve(__dirname , "./scripts/vote_opened.js") 
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../server/public"),
    filename: "scripts/[name].js",
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      template: "./Pages/admin_vote.html",
      filename: "./Pages/admin_vote.html", 
      chunks: ["admin_vote"], 
    }),
    new HtmlWebpackPlugin({
      template : "./Pages/votant_ouvert.html"  ,
      filename :"./Pages/votant_ouvert.html"  , 
      chunks : ["votant"]
    }) ,
    new HtmlWebpackPlugin({
        template : "./Pages/home.html"  ,
        filename: "./Pages/home.html" ,
    })
  ],
};
