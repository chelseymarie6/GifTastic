var topics = ["Star Trek", "Star Wars", "SNL", "Game of Thrones"];

$("#gif-button").html("This is a fantastic gif generator button!");

$("#gif-button").on("click", function() {
    // var gif = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/trending?api_key=2a046d21cf8b42c98cb59a53cdb927f9";

    $.ajax({
        url: queryURL,
        method: 'GET'
      }).done(function(response) {
        console.log(response);
    });

});








