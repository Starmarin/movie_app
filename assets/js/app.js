const movieKey = '436fedae44d7b81338702a9341ae7a74';
const movieDB = 'https://api.themoviedb.org';
const imageDB = 'https://image.tmdb.org/t/p/w500';
const search = 'hello';

const searchButton = document.querySelector('#search');;
const searchInput = document.querySelector('#input');
const moviesSearchable = document.querySelector('#movies');

function generateMovieDBUrl(path) {
    const url = `${movieDB}/3${path}?api_key=${movieKey}`;
    return url;
}
function requestMovies(url, Complete, Error) {
    fetch(url)
        .then((res) => res.json())
        .then(Complete)
        .catch(Error);
}

function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, renderSearchMovies, handleGeneralError);
}


function getVideosByMovieId(movieId, content) {
    const url = generateMovieDBUrl(`/movie/${movieId}/videos`);
    const render = createVideoTemplate.bind({ content });
    requestMovies(url, render, handleGeneralError);
}



function createImageContainer(imageUrl, id) {
    const tempDiv = document.createElement('div');
    tempDiv.setAttribute('class', 'imageContainer');
    tempDiv.setAttribute('data-id', id);

    const movieElement = `
        <img src="${imageUrl}" alt="" data-movie-id="${id}">
    `;
    tempDiv.innerHTML = movieElement;

    return tempDiv;
}

function resetInput() {
    searchInput.value = '';
}

function handleGeneralError(error) {
    console.log('Error: ', error.message);
    alert('Internal Server');
}

function renderSearchMovies(data) {
    moviesSearchable.innerHTML = '';
    const moviesBlock = generateMoviesBlock(data);
    moviesSearchable.appendChild(moviesBlock);
}

function generateMoviesBlock(data) {
    const movies = data.results;
    const section = document.createElement('section');
    section.setAttribute('class', 'card');

    for (let i = 0; i < movies.length; i++) {
        const { poster_path, id } = movies[i];

        if (poster_path) {
            const imageUrl = imageDB + poster_path;

            const imageContainer = createImageContainer(imageUrl, id);
            section.appendChild(imageContainer);
        }
    }

    const movieSectionAndContent = createMovieContainer(section);
    return movieSectionAndContent;
}

function createMovieContainer(section) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');
    movieElement.insertBefore(section, movieElement.firstChild);
    return movieElement;
}

searchButton.onclick = function (event) {
    event.preventDefault();
    const value = searchInput.value

    if (value) {
        searchMovie(value);
    }
    resetInput();
}


searchMovie(search);
