

fetch('https://api.myjson.com/bins/so5pk')

  .then (response => {
    if (response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' + response.status);
      return;
    };

    response.json()
      .then(data => {

				const moviesContainer = document.querySelector('.movies-wrapper');
			
				data.forEach(element => {

					const movie = buildMovieCart(element);
					moviesContainer.appendChild(movie);

				});
		
      }); 
  })   

  .catch(function(err) {
    console.log('Fetch Error: ', err);
    });


	function buildMovieCart(element) {

		const movie = document.createElement('div');
		movie.className = 'movie-container';

		const divPoster = document.createElement('div');
		divPoster.className = 'poster-wrap';

		const moviePoster = document.createElement('img');
		moviePoster.src = element.image;
		moviePoster.className = 'movie-poster';
		divPoster.appendChild(moviePoster);
		moviePoster.addEventListener('click', function(){
			event.preventDefault();
			playVideo(event.target);
		});

		const movieDescription = document.createElement('p');
		movieDescription.className = 'movie-description';
		movieDescription.innerHTML = element.description;
		divPoster.appendChild(movieDescription);

		movie.appendChild(divPoster);

		const movieName = document.createElement('h2');
		movieName.className = 'movie-name';
		movieName.innerHTML = element.name;
		movie.appendChild(movieName);

		const videoLink = document.createElement('span');
		videoLink.className = 'is-hidden';
		videoLink.innerHTML = element.video;
		movie.appendChild(videoLink);

		movie.appendChild(videoLink);

		return movie;
	}

	function playVideo (movie) {

		const videoLink = movie.parentNode.parentNode.lastChild.innerHTML;
		const videoPlayer = document.querySelector('.video-player');

		if (videoPlayer.querySelector('source')) {

			if (videoPlayer.querySelector('source').src !== videoLink) {
				videoPlayer.pause();
				videoPlayer.firstChild.nextElementSibling.setAttribute('src', videoLink);
				videoPlayer.load();
				videoPlayer.play();
			}
		
		} else {
				let movieSrc =  document.createElement('source');
				movieSrc.src = videoLink;
				movieSrc.type = 'video/mp4';
				videoPlayer.appendChild(movieSrc);
		}

		

	}



