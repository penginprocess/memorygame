$(document).ready(function(){
  var app = {
    cards: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8],
    colors: ["hsl(25, 85%, 65%)",
              "hsl(55, 85%, 65%)",
              "hsl(90, 85%, 65%)",
              "hsl(160, 85%, 65%)",
              "hsl(220, 85%, 65%)",
              "hsl(265, 85%, 65%)",
              "hsl(310, 85%, 65%)",
              "hsl(360, 85%, 65%)"],
    init: function() {
      app.shuffle();
    },
    shuffle: function() {
      var random = 0;
      var temp = 0;
      for(i = 1; i < app.cards.length; i++){
        random = Math.round(Math.random() * i);
        temp = app.cards[i];
        app.cards[i] = app.cards[random];
        app.cards[random] = temp;
      }
      app.assignCards();
    },
    assignCards: function() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', app.cards[index]);
      });
      app.clickHandlers();
    },
    clickHandlers: function() {
      $('.card').on('click', function(){
          $(this).html('<h1>'+$(this).data('cardValue')+'</h1>').addClass('selected');
          $(this).css("background-color", app.colors[$(this).data('cardValue')-1]);
          app.checkMatch();
      });
    },
    checkMatch: function() {
      if($('.selected').length == 2) {
        if($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            $(this).css({"background-color":"Grey", "color":"Silver"});
            $(this).animate({opacity: 100}).removeClass('unmatched');
          });
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          app.checkWin();
        } else {
            setTimeout(function() {
              $('.selected').each(function() {
                $(this).html('').removeClass('selected');
                $(this).css("background-color", "rgb(32, 64, 86)");
              });
            }, 1000);

        }
      }
    },
    checkWin: function() {
      if($('.unmatched').length === 0 ) {
        $('.container').html('<h5>You Won!<h5>');
      }
    }
  };
  app.init();
});
