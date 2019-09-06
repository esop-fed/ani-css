let express = require("express");
let app = express();
 
app.use(express.static(__dirname));//关键是这一句，我的目录是html的目录
app.use("/ani-css/", express.static(__dirname)); 
 
app.listen(3030, ()=>{
    console.log("listening on http://localhost:3030");
})
