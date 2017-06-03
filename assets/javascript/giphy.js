// Game object
let demo = {
  // Properties
  // buttonArr: ["dog", "cat", "rabbit", "hamster", "cow"],
  buttonArr: ["Broad City", "Parks and Recreation", "Elf", "Bridesmaids", "SNL", "Borat"],

  // Methods
  init: function(data){
    for (var i = 0; i < demo.buttonArr.length; i++) {
      demo.addButton(demo.buttonArr[i]);
    }
  },

  addButton: function(item){
    $("#buttons").append("<button class='btn btn-primary btn-giphy small_margin' data-item=" + item + ">" + item + "</button>");
  },

};

$(function() {
  demo.init();

  // Creates new buttons
  $("#add_button").on("click", function(event){
    let btnText = $("#button_text").val().trim();

    if (btnText != "" && demo.buttonArr.indexOf(btnText) == -1) {
      demo.buttonArr.push(btnText);
      demo.addButton(btnText);
      $("#button_text").val("");
    }
  });

  // Allows new button creation on enter
  $("#button_text").keypress(function(event) {
    if (event.which == 13) {
      $("#add_button").click();
    }
  });

  // Diplays gifs according to button search term
  $(document.body).on('click', '.btn-giphy', function(event){
    $("#gifs").empty();

    $.ajax({
            url: "https://api.giphy.com/v1/gifs/search",
            method: 'GET',
            data: {
              q: $(this).data("item"),
              api_key: "dc6zaTOxFJmzC",
              limit: "10"
            }
        })
        .done(function(response) {
          // For each gif in the response
          for (var i = 0; i < response.data.length; i++) {
            // Create div for gif with proper still and animate sources
            let template = "<div class='large_margin'>" +
              "<p>Rating: " + response.data[i].rating.toUpperCase() + "<br/>" +
              "<img src='" + response.data[i].images.fixed_height_still.url + "' " +
                "data-still='" + response.data[i].images.fixed_height_still.url + "' " +
                "data-animate='" + response.data[i].images.fixed_height.url + "' " +
                "data-state='still' " +
                "class='gif-pause'>"
              "</div>";

            // Append the new div
            $("#gifs").append(template);
          }
        });
  });

  // Pause function for gifs
  $(document.body).on('click', '.gif-pause', function(event){
    if ($(this).data("state") == "still"){
      $(this).attr("src", $(this).data("animate"));
      $(this).data("state", "animate");
    } else {
      $(this).attr("src", $(this).data("still"));
      $(this).data("state", "still");
    }
  });
});
