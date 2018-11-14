var express = require("express"), 
    router  = express.Router(), 
    passport = require("passport"), 
    user = require("../modules/user.js");

router.get("/", function(req,res){
   res.render("landing");
});

//=========================
//AUTH ROUTES
//=========================
router.get("/register", function(req, res){
   res.render("Auth/register"); 
});

router.post("/register", function(req, res){
    var newUser = new user({username : req.body.username});
    user.register(newUser, req.body.password, function(err, user){
       if(err){
           req.flash("error", err.message );
           res.render("Auth/register");
       } else{
           passport.authenticate("local")(req, res, function(){
               req.flash("success", "welcome!" );
               res.redirect("/campgrounds");
           })
       }
    });
})

router.get("/login", function(req, res){
    res.render("Auth/login.ejs");    
});

router.post("/login", passport.authenticate("local",
{
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}), function(req, res){});

router.get("/logout", function(req, res){
   req.logout();
   res.redirect("/campgrounds");
});


module.exports = router;