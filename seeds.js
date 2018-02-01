var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");

var data = [
    {
        name: "Clouds rests", 
        image: "https://farm1.staticflickr.com/112/316612921_f23683ca9d.jpg",
        description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet luctus venenatis lectus magna fringilla. Sit amet justo donec enim diam vulputate ut pharetra sit. Eu non diam phasellus vestibulum. Duis at consectetur lorem donec massa sapien faucibus et molestie. Platea dictumst vestibulum rhoncus est pellentesque elit. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Risus pretium quam vulputate dignissim suspendisse. Semper eget duis at tellus at urna. Nisl rhoncus mattis rhoncus urna. Vivamus at augue eget arcu dictum varius duis. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. " 
    },    
    {
        name: "Delta tree", 
        image: "https://farm1.staticflickr.com/7/5954480_34a881115f.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet luctus venenatis lectus magna fringilla. Sit amet justo donec enim diam vulputate ut pharetra sit. Eu non diam phasellus vestibulum. Duis at consectetur lorem donec massa sapien faucibus et molestie. Platea dictumst vestibulum rhoncus est pellentesque elit. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Risus pretium quam vulputate dignissim suspendisse. Semper eget duis at tellus at urna. Nisl rhoncus mattis rhoncus urna. Vivamus at augue eget arcu dictum varius duis. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. "
    },    
    {
        name: "Firestarters", 
        image: "https://farm2.staticflickr.com/1255/767161131_39e0688cd2.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sit amet luctus venenatis lectus magna fringilla. Sit amet justo donec enim diam vulputate ut pharetra sit. Eu non diam phasellus vestibulum. Duis at consectetur lorem donec massa sapien faucibus et molestie. Platea dictumst vestibulum rhoncus est pellentesque elit. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Risus pretium quam vulputate dignissim suspendisse. Semper eget duis at tellus at urna. Nisl rhoncus mattis rhoncus urna. Vivamus at augue eget arcu dictum varius duis. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor. "
    }
]

function seedDB(){
    Campground.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // }else{
        //     console.log("removed"); 
        //     // add campgrounds
        //         data.forEach(function(seed){
        //             Campground.create(seed, function(err, campground){
        //                 if(err){
        //                     console.log(err);
        //                 } else{
        //                     console.log("created");
        //                     //create comment
        //                     Comment.create({
        //                         text: "this place is great but I hated it",
        //                         author: "homer"
        //                     }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         }else{
        //                         campground.comments.push(comment._id);
        //                         campground.save();
        //                         }
        //                     }
                            
        //                     )
        //                 }
        //                 });
        //              });
        // }
    });

}

module.exports = seedDB;