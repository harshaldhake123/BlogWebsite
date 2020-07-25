//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const posts = [{
    postTitle: "Day 1",
    postBody: "Orci nulla pellentesque dignissim enim sit amet venenatis. Vestibulum lorem sed risus ultricies tristique nulla aliquet enim. Massa vitae tortor condimentum lacinia quis vel eros. Velit euismod in pellentesque massa placerat duis. Libero nunc consequat interdum varius sit amet mattis vulputate enim. Scelerisque in dictum non consectetur. Urna condimentum mattis pellentesque id nibh tortor. Eu nisl nunc mi ipsum faucibus. Tincidunt augue interdum velit euismod in pellentesque. Tellus molestie nunc non blandit. Ac felis donec et odio. Odio euismod lacinia at quis risus sed vulputate."
},
    {
        postTitle: "Day 2",
        postBody: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin libero nunc consequat interdum varius sit amet mattis. Lacus sed turpis tincidunt id aliquet. Auctor elit sed vulputate mi sit. Lacus sed turpis tincidunt id aliquet risus feugiat in. Vel pharetra vel turpis nunc eget lorem dolor. Phasellus faucibus scelerisque eleifend donec pretium. Ut consequat semper viverra nam. Massa vitae tortor condimentum lacinia quis vel eros donec ac. At varius vel pharetra vel turpis nunc eget. Lorem mollis aliquam ut porttitor leo a. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Eu augue ut lectus arcu bibendum. Vulputate ut pharetra sit amet aliquam id diam maecenas ultricies. Habitant morbi tristique senectus et netus.\n" +
            "\n"
    }];


app.get("/", function (req, res) {
    res.render("home", {homeContent: homeStartingContent, posts: posts});
});

app.get("/about", function (req, res) {
    res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function (req, res) {
    res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function (req, res) {
    res.render("compose");
});

app.post("/compose", function (req, res) {
    const post = {
        postTitle: req.body.postTitle,
        postBody: req.body.postBody
    };

    posts.push(post);
    res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
    let requestedTitle = req.params.postName;
    posts.forEach(function (post) {
        const storedTitle = post.postTitle;

        if (_.lowerCase(storedTitle) === _.lowerCase(requestedTitle)) {
            res.render("post", {postTitle: post.postTitle, postBody: post.postBody});

        }
    });
});


//Starting up the server
app.listen(3000, function () {
    console.log("Server started on port 3000");
});
