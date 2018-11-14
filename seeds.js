var mongoose = require("mongoose");
var campground = require("./modules/campgrounds.js");
var comment = require("./modules/comments.js")

var data=[
    {
        name: "plage bleu" ,
        image: "https://www.voyageavecnous.fr/wp-content/uploads/2015/01/plage-paradisiaque-maldives.jpg",
        description:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuille"
    },
     {
        name: "plage bleu" ,
        image: "https://www.voyageavecnous.fr/wp-content/uploads/2015/01/plage-paradisiaque-maldives.jpg",
        description:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuille"
    },
     {
        name: "plage bleu" ,
        image: "https://www.voyageavecnous.fr/wp-content/uploads/2015/01/plage-paradisiaque-maldives.jpg",
        description:"Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. Il n'a pas fait que survivre cinq siècles, mais s'est aussi adapté à la bureautique informatique, sans que son contenu n'en soit modifié. Il a été popularisé dans les années 1960 grâce à la vente de feuille"
    }
    ];

function seedDB(){
   // REMOVE ALL CAMPGROUNDS
    campground.remove({}, function (err){
        if(err){
            console.log(err);
        };
        console.log("removed campground");
        //ADD A FEW CAMPGROUNDS
        data.forEach(function(seed){
            campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                }else
                console.log("campground created");
                comment.create({
                    text:"great place",
                    autor: "David"
                }, function (err, comment){
                    if(err){
                        console.log(err);
                    }else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("comment created");
                    }
                })
            })
        })    
    })
};

module.exports = seedDB;