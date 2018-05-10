
$( document ).ready(function() {
  var html;
  var jsonURL = "https://www.adido-digital.co.uk/site/scripts/test.php";
  $.ajax({
    type: "GET",
    url: jsonURL,
    cache: false,
    dataType: "html",
    data: {
      get_param: 'value'
    },
    //if getting the json is successful
    success: function(data) {
      var data = JSON.parse(data);

      $('.search').on("input", function(){
        $(".result").remove();
        $('.hidden-results').css('display', 'none');
        var searchInput = this.value;
        if (searchInput.length >= 3) {
          $.each(data.data.results,function(){
            var dataResult = this;
            searchInput = searchInput.toUpperCase();
            dataResult.value = dataResult.value.toUpperCase();
            console.log(searchInput);
            if (dataResult.value.includes(searchInput)) {
              var image = JSON.stringify(dataResult.image);
              image = image.replace(/\\\//g, '');
              $('.hidden-results').css('display', 'block');
              html = '<div class="result">' + '<div class="flex-results-left"><img class="image" src='+image+'>' + '<p class="value">' + dataResult.value + '</p>' + '<div> <span class="brand">Brand: ' + dataResult.brand + '</span>' + '<span> | </span> <span class="brand">Weight: ' + dataResult.weight + '</span></div></div> <div class="flex-results-right"><button class="quote" type="button" name="button">Quote</button><button class="Basket" type="button" name="button">Basket</button> </div></div>';
              $(".hidden-results").append(html);
            }
          });
        } else if (searchInput.length <= 3) {
          console.log("less than 3");
          $(".result").remove();
        }
      });
    },
  });

  $(".dropdown-trigger").on({
      mouseenter: function () {
        $(this).addClass("active");
       $(".dropdown").css("display", "block");
       $(".hidden-nav").css("display", "flex");
      }
  });
  $(".dropdown").on({
      mouseleave: function () {
        $(".dropdown-trigger").removeClass("active");
       $(".dropdown").css("display", "none");
       $(".hidden-nav").css("display", "none");
      }
  });
});
