var campgroundRoutes    =   require("./routes/campgrounds"),
    commentRoutes       =   require("./routes/comments"),
    LocalStrategy       =   require("passport-local"),
    indexRoutes         =   require("./routes/index"),
    User                =   require("./models/user"),
    bodyParser          =   require("body-parser"),
    passport            =   require("passport"),
    mongoose            =   require("mongoose"),
    express             =   require("express"),
    methodOverride      =   require("method-override"), 
    flash               =   require("connect-flash"),
    app                 =   express();

mongoose.connect(process.env.DATABASEURL);
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

app.use(require("express-session")({
    secret: "A fox bites the tail of its enemies",
    resave: false, 
    saveUninitialized: false
}));

app.locals.moment = require('moment');
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error  = req.flash("error");
    res.locals.success  = req.flash("success");
    next();
});
app.get("/", function(req, res){
    res.render("landing");
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server started");
});
