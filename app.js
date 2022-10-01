const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = [];
const workItems = [];

app.set("view engine", "ejs");
//doesn't matter what value is set - true or false - as long as value is set
app.use(bodyParser.urlencoded({extended: true})); 
// this is telling express to locate the files and serve up for our browser
app.use(express.static("public"));

app.get("/", function(req, res) {

   const day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});
});


app.post ("/", function(req, res) {
    //before we can use `body` we first need to set bodyparser (see line 12)
    const item = req.body.newItem; 
    
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }

});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
})

app.get("/about", function(req, res) {
    res.render("about");
});


app.listen(3000, function(){
    console.log("Server started on port 3000");
});
