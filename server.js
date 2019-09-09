let express = require("express");
let app = express();
 
app.use(express.static(__dirname));
app.use("/ani-css/", express.static(__dirname)); 
 
app.listen(3030, ()=>{
    console.log("listening on http://localhost:3030");
})
