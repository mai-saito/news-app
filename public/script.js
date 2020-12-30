const container = document.querySelector('.container');
const newsList = document.querySelector('.news-list');
// const input = document.querySelector('.input');
// const submit = document.querySelector('.submit-button');


fetch('/news')
	.then(response => {
		return response.json();
	}).then(jsonData => {
		for (var n in jsonData) {
			// console.log(jsonData[n].title);
			var item = document.createElement('li');
		
			var url = document.createElement('a');
			url.setAttribute('href', jsonData[n].url);
			url.innerText = jsonData[n].title;
			url.classList.add('titleUrl');

			var image = document.createElement('img');
			image.setAttribute('src', jsonData[n].urlToImage);

			var description = document.createElement('p');
			description.innerText = jsonData[n].description;
			item.appendChild(image);
			item.appendChild(url);
			
			item.appendChild(description);
			newsList.appendChild(item);
		}
	});

