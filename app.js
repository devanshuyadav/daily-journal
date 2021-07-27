//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "It's such a beautiful day to start writing...";
const aboutContent = "This blog-website is created as a course along project, in order to learn NodeJS, EJS & Express. A future version is still in progress that uses DBMS to store blogs. Currently all blogs aren't being saved anywhere!!";

const app = express();

let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    hsc: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", { abc: aboutContent });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.title,
    body: req.body.post
  }
  if (req.body.cancel === "return_home") {
    res.redirect("/");
  } else {
    posts.push(post);
    res.redirect("/");
  }

});

app.get("/posts/:postTitle", function (req, res) {
  posts.forEach(function (post) {
    if (_.lowerCase(post.title) === _.lowerCase(req.params.postTitle)) {
      res.render("post", {
        title: post.title,
        body: post.body
      });
    }
    else console.log("URL Request Doesn't match any Existing post");
  });
});

app.listen(process.env.PORT || 4000, function () {
  let PORT;
  if (process.env.PORT === undefined) {
    PORT = 4000;
  } else {
    PORT = process.env.PORT;
  }

  console.log("server running on port " + PORT);
});