const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);

let array = [];

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// Find news by search words and send them back
app.post('/', (req, res) => {
	var searchWord = req.body.searchWord;
	var country = req.body.country;
	var language = 'en';

	if (country === 'jp') {
		language = ''
	}

	array = [];
	
	newsapi.v2.topHeadlines({
		country: country,
		language: language,
		q: searchWord,
    pageSize: 40
  }).then((news) => {
		var data = news['articles'];
		for (var n in data) {
			var item = {
				title: data[n].title,
				description: data[n].description,
				url: data[n].url,
				urlToImage: data[n].urlToImage
			}
			array.push(item);
			console.log(array);
		}
		res.redirect('/');
	})
});

// For fetching data from index.html
app.get('/news', (req, res) => {
	res.send(array);
})

app.listen(3000);
console.log('I am listening to port 3000')
