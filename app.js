var express               = require("express"),
    app                   = express(),
    request               = require("request"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    localStrategy         = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    user                  = require("./modules/user.js"),
    campground            = require("./modules/campgrounds"),
    comment               = require("./modules/comments.js"),
    seedDB                = require("./seeds.js"),
    methodOverride        = require("method-override"),
    flash                 = require("connect-flash");

var indexRoutes      = require("./routes/index.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    commentRoutes    = require("./routes/comments.js");

// 'mongodb://localhost:27017/yelp_app'
mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true });

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use("/", express.static("public"));
app.use(flash());

seedDB();
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"YelpCamp is great!",
    resave : false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function (req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comment", commentRoutes);

app.listen(process.env.PORT : 5000, process.env.IP, function(){
   console.log("The YelpCamp app has started!");
});
