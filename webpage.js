$(document).ready(function () {

    var games = ["Zelda", "Mario", "Final Fantasy", "Fire Emblem"];

    function displayGameInfo() {


        
        var game = $(this).data("name");
        var queryUrl = "https://api.giphy.com/v1/gifs/search?q=" +
            game + "&api_key=dc6zaTOxFJmzC&limit=10"

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).done(function (response) {

            var gifDiv = $("#game-gifs");

            for (var i = 0; i < 11; i++) {
                if (gameRating !== "r" && gameRating !== "pg-13") {

                    var gameRating = response.data[i].rating;
                    var p = $("<p>").text("Rating: " + gameRating);

                    var imgURL = response.data[i].images.fixed_height.url;
                    console.log(imgURL);
                    var gameImg = $("<img id='gif-move'>").attr("src", imgURL);

                    gifDiv.prepend(p);
                    gifDiv.prepend(gameImg);

                    $("#games-spot").prepend(gifDiv);

                    // $("#gif-move").on("click", function () {

                    // });
                }
                else if (gameRating == "r" || gameRating == "pg-13") {
                    $("#games-spot").html("Sorry! Try another search.");
                }
            }
        });
    }
    function buttonUse() {

        $("#buttons-spot").empty();

        for (var i = 0; i < games.length; i++) {

            var a = $("<button>");
            a.addClass("game");
            a.attr("data-name", games[i]);
            a.text(games[i]);
            // console.log(games[i]);
            $("#buttons-spot").append(a);
        }
    }

    $("#add-game").on("click", function (event) {

        event.preventDefault();

        var game = $("#game-input").val().trim();
        games.push(game);
        // console.log(game);

        $("#game-input").val("");

        buttonUse();
        // console.log(queryUrl);

    })

    $(document).on("click", ".game", displayGameInfo);
    buttonUse();

});
