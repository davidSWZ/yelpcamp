var express    = require("express"), 
    router     = express.Router({mergeParams: true}),
    comment    = require("../modules/comments.js"),
    campground = require("../modules/campgrounds.js"),
    midleware  = require("../midleware");


router.get("/new",midleware.isLoggedIn, function(req, res){
   campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
       }else{
           res.render("comments/new", {campground:campground}) 
       }
   });
});

router.post("/",midleware.isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong" );
                    console.log(err);
                }else{
                    comment.autor.id = req.user._id;
                    comment.autor.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "comment added" );
                    res.redirect("/campgrounds/" + campground.id);
                }
            })
        }
    })
});


//Edit a comment
router.get("/:comment_id/edit", midleware.checkCommentOwner, function(req, res){
    comment.findById(req.params.comment_id, function (err, foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
        }
    })
    
});

//Update a comment
router.put("/:comment_id", midleware.checkCommentOwner, function (req, res){
  comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      }else{
          res.redirect("/campgrounds/"+ req.params.id);
      }
  })  
});

//DESTROY A COMMENT
router.delete("/:comment_id",midleware.checkCommentOwner, function (req, res){
   comment.findByIdAndRemove(req.params.comment_id, function (err){
       if(err){
           res.redirect("back");
       }else{
           req.flash("success", "deleted!" );
           res.redirect("/campgrounds/" + req.params.id);
       }
   }) 
});

module.exports = router;