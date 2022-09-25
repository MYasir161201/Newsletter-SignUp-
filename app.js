const express=require("express");
const BodyParser=require("body-parser");
const request=require("request");
const https = require("https");

const client = require("@mailchimp/mailchimp_marketing");

const app=express();
app.use(BodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
});

client.setConfig({apiKey: "72f677b97ca00434fbac2efcfb725199-us10",  server: "us10"});

app.post("/",function(req,res){
  const firstname=req.body.fname;
  const lastname=req.body.lname;
  const email=req.body.email;

  // const listId = "cd80229764";

  //Creating an object with the users data
const subscribingUser = {
 firstName: firstname,
 lastName: lastname,
 email: email
};

//Uploading the data to the server
const run = async () => {
   try {
     const response = await client.lists.addListMember("cd80229764", {
       email_address: subscribingUser.email,
       status: "subscribed",
       merge_fields: {
         FNAME: subscribingUser.firstName,
         LNAME: subscribingUser.lastName
       }
     });
     console.log(response);
     res.sendFile(__dirname + "/success.html");
   } catch (err) {
     console.log(err.status);
     res.sendFile(__dirname + "/failure.html");
   }
 };

 run();
});



// for redirecting in case of failure
app.post("/failure",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000.");
});


// API Key
// 72f677b97ca00434fbac2efcfb725199-us10
// audience // IDEA:
// cd80229764
