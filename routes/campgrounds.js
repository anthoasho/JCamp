var Campground      =   require("../models/campground"),
    express         =   require("express"),
    middleware      =   require("../middleware"),
    router          =   express.Router();
    

//SHOW all campgrounds
router.get("/", function(req, res){
        Campground.find({}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
               res.render("campgrounds/index", {campground: allCampgrounds, page: 'campgrounds'});
           }
        });
});
//POST a new campground
router.post("/", middleware.isLoggedIn, function(req, res){
        //get data
        var name = req.body.name,
            image = req.body.image,
            price = req.body.price,
            description = req.body.description,
            author = {
            id: req.user._id,
            username: req.user.username
            },
            newCamp = {name: name, image: image, description: description, price: price, author: author};
        Campground.create(newCamp, function(err, newlyCreated){
            if(err){
                req.flash("error", "Woopsie! Something went wrong!");
                res.redirect("/campgrounds");  
            }else{
                req.flash("success", "Successfully posted!");
                res.redirect("campgrounds");
            }
        });
}); 
//Show new Campground form 
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});
//Show individual Campgrounds
router.get("/:id", function(req, res){
        Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found!");
                res.redirect("/campgrounds");
            }else {
                res.render("campgrounds/show", {campground: foundCampground});
            }
        });
});
//Show edit form
router.get("/:id/edit", middleware.checkCampgroundOwner, function(req, res){
        
        Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            req.flash("error", "Woopsie! Something went wrong!");
            res.redirect("/campgrounds");
        } else{
            res.render("campgrounds/edit", {campground:foundCampground});
        }
        });
});
        
//PUT edit 
router.put("/:id", middleware.checkCampgroundOwner, function(req, res){

   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           req.flash("error", "Woopsie! Something went wrong!");
           res.redirect("/campgrounds");
       } else{   
            req.flash("success", "Edit completed!");
           res.redirect("/campgrounds/" + req.params.id);       
       }
       }); 
});
//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwner, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            req.flash("error", "Woopsie! Something went wrong!");
            res.redirect("/campgrounds");
        } else {
            req.flash("success", "Removed campground!");
            res.redirect("/campgrounds");
        }
    });
});
module.exports = router;