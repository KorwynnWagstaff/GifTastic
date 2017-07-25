$(document).ready(function() {
	var defaultGifs = ["Guns", "Toy Story", "Disney World", "Planet Earth", "Al Gore"];

	$("body").on("click", ".gif", function() {
		var gifName = $(this).attr("data-name");
		displayGifs(gifName);
	});
	$("body").on("click", "#btnAddGif", function() {
		event.preventDefault();
		addGifBtn();
	});

	generateBtns();

	function generateBtns() {
		$("#gifBtnDiv").empty();
		for (i=0; i < defaultGifs.length; i++) {
			var btn = $("<button>");
			btn.addClass("gif");
			btn.attr("data-name", defaultGifs[i]);
			btn.text(defaultGifs[i]);
			$("#gifBtnDiv").append(btn);
		}
	}
	function displayGifs(gifName) {
		$("#gifViewDiv").empty();
      	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        	gifName + "&api_key=dc6zaTOxFJmzC&limit=10";
      	$.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;
          for (var i = 0; i < results.length; i++) {
          	var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating.toUpperCase());
            var personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.prepend(personImage);
            gifDiv.prepend(p);
            $("#gifViewDiv").prepend(gifDiv);
         	}
       	});
	}
	function addGifBtn() {
		var newGifBtn = $("#newGif").val();
		if (newGifBtn != "") {
			defaultGifs.push(newGifBtn);
			generateBtns();
			displayGifs(newGifBtn);
		}
	}
});