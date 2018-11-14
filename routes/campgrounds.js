var express = require("express"), 
    router  = express.Router(), 
    campground = require("../modules/campgrounds.js"),
    midleware = require("../midleware");

//INDEX


router.get("/", function(req,res){
    campground.find({}, function(err, campground){
       if(err){
           console.log(err);
       } else{
           res.render("campgrounds/campgrounds", {campground:campground, currentUser : req.user});
       }
    });
});

//CREATE
router.post("/",midleware.isLoggedIn, function(req, res){
    var name= req.body.name;
    var image = req.body.image;
    var autor = {
        id: req.user._id,
        username:req.user.username
    };
    var newCampground = {name:name, image:image, autor:autor};
    campground.create(newCampground, function(err, campground){
        if(err){
            console.log(err);
        }else{
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
    
});

//NEW
router.get("/new",midleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});

//SHOW
router.get("/:id", function(req, res){
    campground.findById(req.params.id).populate("comments").exec(function(err, foundcamp){
        if(err){
            console.log(err);
        }else{
           res.render("campgrounds/show", {camp:foundcamp}); 
        }
    });
});

//edit
router.get("/:id/edit", midleware.checkCampgroundOwner, function(req, res){
     campground.findById(req.params.id, function(err, foundcamp){
            res.render("campgrounds/edit", {camp:foundcamp});
     })
});

//update
router.put("/:id", midleware.checkCampgroundOwner, function(req, res){
   campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, foundcamp){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           res.redirect("/campgrounds/" + req.params.id)
       }
   }) 
});

//Delete
router.delete("/:id", midleware.checkCampgroundOwner, function(req, res){
   campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       }else{
           req.flash("success", "great" );
           res.redirect("/campgrounds");
       }
   }) 
});


module.exports = router;