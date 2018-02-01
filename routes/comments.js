var express         =   require("express"),
    Campground      =   require("../models/campground"),
    Comment         =   require("../models/comment"),
    middleware      =   require("../middleware"),
    router          =   express.Router({mergeParams: true});

//GET Comment Submit form
router.get("/new", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", "Woopsie! Something went wrong!");
            res.redirect("/campgrounds");
        }else {
            res.render("comments/new", {campground: campground});
        }
    });
});
//POST to the campground page
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            req.flash("error", "Woopsie! Something went wrong!");
            res.redirect("/campgrounds");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment._id);
                    campground.save();
                    req.flash("success", "Comment posted!");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });

});
//EDIT Route show
router.get("/:comment_id/edit", middleware.checkCommentOwner, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "Cannot fi   nd that Campground!");
            return res.redirect("back");
        }
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Woopsie! Something went wrong!");
                res.redirect("back");
            }else{
                    res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
            }
        }); 
    });
});
//EDIT Put
router.put("/:comment_id", middleware.checkCommentOwner, function(req, res){

   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       } else{
            req.flash("success", "Comment edited!");
           res.redirect("/campgrounds/" + req.params.id);       
       }
       }); 
});
//DESTROY Comment
router.delete("/:comment_id", middleware.checkCommentOwner, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            req.flash("error", "Woopsie! Something went wrong!");
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted!");
            res.redirect("back");
        }
    });
});



module.exports = router;