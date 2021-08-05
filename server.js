var express = require('express');
var bodyparser = require('body-parser');
var app = express();
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

var db = require('./models');

var Article = db.Posts;

app.get('/', function (req, res) {
	Article.findAll({attributes:['id', 'article']})
  .then(articles => {
  	articles.forEach(article => {
  		console.log(article.dataValues.id, article.dataValues.article);
  	});
  });
});


//create article api {param : article}

app.post('/create_article', function (req, res) {
	Article.create({ 
	    article: req.body.article,
	    rate_count: 0
	})
    .then(function (article) {
      res.json(article);
    });
});

//edit article api {param : id , edited_article}

app.post('/edit_article', function (req, res) {
	Article.findOne({ where: { id: req.body.id } })
	  .then(article => {
	    // Check if record exists in db
	    if (article) {
	      article.update({
	        article: req.body.edited_article
	      })
	      .then(function () {
	      	res.json("Successfully edited");
	      })
	    }
	});
});

//delete article api {param : id}

app.post('/delete_article', function (req, res) {
	Article.destroy({ 
	    where: { id: req.body.id }
	})
    .then(function () {
      res.json("Successfully deleted");
    });
});

//rate article api
app.post('/rate_article', function (req, res) {
  	Article.findOne({ where: { id: req.body.id } })
	  .then(article => {
	    // Check if record exists in db
	    if (article) {
	      article.update({
	        rate_count: article.dataValues.rate_count+1
	      })
	      .then(function () {
	      	res.json("Successfully rated");
	      })
	    }
	});
});



app.listen(3000, function() {
  // db.sequelize.sync();
  console.log("App listening on 3000!");
  Article.findAll({attributes:['id', 'article']})
  .then(articles => {
  	articles.forEach(article => {
  		console.log(article.dataValues.id, article.dataValues.article);
  	});
  });
});