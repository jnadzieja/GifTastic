// http://api.giphy.com/v1/gifs/feqkVgjJpYtjy?api_key=6rFo1gdMKiLJWl6ZNmlMZGIjOIkbgsmj

// Declaring global variables for functions later on
var topics = ["dog", "cat", "bird", "hamster", "goldfsh", "turtle", "salamander", "rabbit"]

function generateGifs() {
  let topic = $(this).attr("data-animal");
  let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=6rFo1gdMKiLJWl6ZNmlMZGIjOIkbgsmj"

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)

    const results = response.data

    for (let i = 0; i < 10; i++) {
      const newDiv = $("<div>");
      const rating = results[i].rating;
      const gif = $("<img>");
      const p = $("<p>").text("Rating: " + rating);
      gif.attr("src", results[i].images.fixed_height_still.url);
      gif.addClass("imgToggle");
      gif.attr("data-state", "still");
      gif.attr("data-still", results[i].images.fixed_height_still.url);
      gif.attr("data-animate", results[i].images.fixed_height.url);
      newDiv.append(gif);
      newDiv.append(p);
      $("#gifsDiv").prepend(newDiv);
    }
  });
}

function toggleGif() {
  let state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
}

function generateButtons() {
  $("#buttonsDiv").empty();
  for (let i = 0; i < topics.length; i++) {

    const addButton = $("<button>");
    addButton.text(topics[i]);
    addButton.addClass("gifButton");
    addButton.addClass("btn")
    addButton.addClass("btn-secondary")
    addButton.addClass("m-2")
    addButton.addClass("shadow")
    addButton.attr("data-animal", topics[i]);
    $("#buttonsDiv").append(addButton);
  }
}

$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  let topic = $("#newAnimal").val().trim();
  if ((topic.trim() === "") || (topics.indexOf(topic) >= 0)) {
    $("#newAnimal").val("");
    if (topic.trim() === "") {
      alert("Cannot submit a blank button.")
      return;
    } else {
      alert("Button already created!")
      return;
    }
  }
  topics.push(topic);
  generateButtons();
  $("#newAnimal").val("");
});

$(document).on("click", ".gifButton", generateGifs);
$(document).on("click", ".imgToggle", toggleGif);

generateButtons();

