var midlewareObj = {},
    campground = require("../modules/campgrounds"),
    comment = require("../modules/comments");

midlewareObj.checkCampgroundOwner = function(req, res, next){
  if (req.isAuthenticated()){
      campground.findById(req.params.id, function(err, foundCampground){
          if(err){
              req.flash("error", "Campground not found" );
              res.redirect("back");
          }else{
              if(foundCampground.autor.id.equals(req.user._id)){
                  next();
              }else{
                  req.flash("error", "Permission denied" );
                  res.redirect("back");
              }
          }
      });
  }  else{
      res.redirect("back");
  }
};

midlewareObj.checkCommentOwner = function(req, res, next){
  if (req.isAuthenticated()){
      comment.findById(req.params.comment_id, function(err, foundComment){
          if(err){
              res.redirect("back");
          }else{
              if(foundComment.autor.id.equals(req.user._id)){
                  next();
              }else{
                  res.redirect("back");
              }
          }
      });
  }  else{
      req.flash("error", "you don't have the permission" );
      res.redirect("back");
  }
};

midlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
        }
            req.flash("error", "Please logging first!");
            res.redirect("/login");
};

module.exports = midlewareObj;