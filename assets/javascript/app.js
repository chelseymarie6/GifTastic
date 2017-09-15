var movieArray = ["Star Wars", "Jurassic Park", "The Godfather", "Speed", "The Dark Knight", "Pulp Fiction", "Lord of the Rings", "Fight Club", "Inception", "The Matrix", "Spirited Away", "Interstellar", "Saving Private Ryan", "Star Trek"];
var buttonsHTML = " ";
var newMovieValue;
var searchMovie;
var giphyArray = [];

// Generates buttons using the movie array
function generateButtons() {
    for (var i = 0; i < movieArray.length; i++) {
        buttonsHTML += "<button class='btn btn-lrg btn-primary movie-buttons' data-movie=" + movieArray[i] + ">" + movieArray[i] + "</button>";
    }
    $("#movie-buttons-container").html(buttonsHTML);
}

//calls generate buttons function and hold on click events
$(document).ready(function(){
    generateButtons();

    //on click function for new movie after user inputs
    $("body").on("click", "#add-movie", function(event) {
        event.preventDefault();
        newMovieValue = $("#movie-input").val();
        console.log(newMovieValue);
        newButton = "<button class='btn btn-lrg btn-primary movie-buttons' data-movie=" + newMovieValue + ">" + newMovieValue + "</button>";
        $("#movie-buttons-container").append(newButton);
    });

    //on click function to call Giphy API
    $("body").on("click", ".movie-buttons", function(event) {
        $(".giphy-div").empty();
        searchMovie = $(this).attr("data-movie");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchMovie + "&limit=10" + "&api_key=dc6zaTOxFJmzC";
        // my api key = 2a046d21cf8b42c98cb59a53cdb927f9
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response.data);
            for (var i = 0; i < response.data.length; i++) {
                console.log(response.data[i]);
                $('.giphy-div').append("<div class='outer-container'><p class='title'>Rating: "+ response.data[i].rating.toUpperCase() +"</p><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                giphyArray.push(response.data[i].images.downsized.url);
            }    
        });
    });

    //on click function for animating still images/freezing animated images
    $("body").on("click", ".images-returned", function(event) {
        var state = $(this).attr("data-state");
        var thisImgStill = $(this).attr("data-still");
        var thisImgAnimate = $(this).attr("data-animate");
        if (state === "still"){
            $(this).attr("src", thisImgAnimate);
            $(this).attr("data-state", "animate");
        }
        if (state !== "still"){
            $(this).attr("src", thisImgStill);
            $(this).attr("data-state", "still");
        }
    });

});
