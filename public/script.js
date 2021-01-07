const container = document.querySelector('.container');
const newsList = document.querySelector('.news-list');

// Fetch data from the server
fetch('/news')
	.then(response => {
		return response.json();
	}).then(jsonData => {
		for (var n in jsonData) {
			var item = document.createElement('li');

			// Creat URL link to original websites
			var url = document.createElement('a');
			url.setAttribute('href', jsonData[n].url);
			url.setAttribute('target', '_blank');
			url.innerText = jsonData[n].title;
			url.classList.add('titleUrl');

			// Set images
			var image = document.createElement('img');
			if (jsonData[n].urlToImage){
			image.setAttribute('src', jsonData[n].urlToImage);
			} else {
				image.setAttribute('src', 'images/noimage.png');
			}

			// Set Descriptions
			var description = document.createElement('p');
			if (jsonData[n].description) {
				description.innerText = jsonData[n].description;
			} else {
				description.innerText = "More info on the original website..."
			}

			item.appendChild(image);
			item.appendChild(url);
			item.appendChild(description);
			newsList.appendChild(item);
		}
	});

