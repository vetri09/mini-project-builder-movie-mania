//elements
const languages = {
    english: 'en',
    tamil: 'ta',
    hindi: 'hi',
    telugu: 'te',
    malayalam: 'ml'
}

document.getElementById("languages").addEventListener("change", ()=>{
    let languageKey = languages[document.getElementById("languages").value];
    url = `https://api.themoviedb.org/3/movie/popular?api_key=2aced914c045bbf9ca3537c5fe2d7db5&with_original_language=${languageKey}&page=1`;
    
    execute();
})

let url = `https://api.themoviedb.org/3/movie/popular?api_key=2aced914c045bbf9ca3537c5fe2d7db5&with_original_language=en&page=1`;

function execute(){
    let container =document.getElementsByClassName("container")[0];
    container.innerHTML = '';
    let fragment = `<div class="movie">
        <h2 class="movie-name"></h2>
        <p class="release-date"></p>
        <img src="" alt="" class="movie-still">
        <div class="likesnviews">
            <p class="like"></p>
            <p class="views"></p>
        </div>
        </div>`;
    for(let i=0; i<20; i++){
        container.innerHTML +=fragment;
        axios(url)
        .then(data =>{
            // console.log(data.data.results[0]);
            let movieName=document.getElementsByClassName("movie-name")[i];
            let releaseDate=document.getElementsByClassName("release-date")[i];
            let poster=document.getElementsByClassName("movie-still")[i];
            let heart=document.getElementsByClassName("like")[i];
            let views=document.getElementsByClassName("views")[i];
            movieName.innerHTML=data.data.results[i].original_title;
            releaseDate.innerHTML=`Released: ${data.data.results[i].release_date}`;
            poster.src=`https://image.tmdb.org/t/p/w500${data.data.results[i].poster_path}`;
            heart.innerHTML=`<svg height="40px" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="40px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="_x31_66_x2C__Heart_x2C__Love_x2C__Like_x2C__Twitter"><g><path d="M365.4,59.628c60.56,0,109.6,49.03,109.6,109.47c0,109.47-109.6,171.8-219.06,281.271    C146.47,340.898,37,278.568,37,169.099c0-60.44,49.04-109.47,109.47-109.47c54.73,0,82.1,27.37,109.47,82.1    C283.3,86.999,310.67,59.628,365.4,59.628z" style="fill:#000;"/></g></g><g id="Layer_1"/></svg>
            ${data.data.results[i].vote_average}`;
            // heart.innerHTML=data.data.results[i].vote_average;
            views.innerHTML=`
            <svg id="Layer_1_1_" style="enable-background:new 0 0 16 16;" version="1.1" viewBox="0 0 16 16" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M12,9H8H4c-2.209,0-4,1.791-4,4v3h16v-3C16,10.791,14.209,9,12,9z"/><path d="M12,5V4c0-2.209-1.791-4-4-4S4,1.791,4,4v1c0,2.209,1.791,4,4,4S12,7.209,12,5z"/></svg>
            ${data.data.results[i].vote_count}`;
        });
    }
};
execute();