

var buildHomePage = function () {
  return {

    buildMagicLine: function () {
      var $el, leftPos, newWidth,
             $mainNav = $("#main-nav-list");
         
         $mainNav.append("<li id='magic-line' class='magic-line'></li>");
         var $magicLine = $("#magic-line");
         var $curItem = $('.active', $mainNav);

         var offset = parseInt($('#main-nav-list .first').css('margin-right'))

         $magicLine
             .width($curItem.width())
             .css("left", $("a", $curItem).position().left - offset)
             .data("origLeft", $magicLine.position().left)
             .data("origWidth", $magicLine.width());
             
         $("#main-nav-list li a").click(function(e) {
           $el = $(this);
           leftPos = $el.position().left - offset;
           newWidth = $el.parent().width();
           $magicLine.stop().animate({
               left: leftPos,
               width: newWidth
           }, 200);

           return false;
         });
    },

    handleMediaQueries: function () {
      enquire.register("screen and (min-width: 960px) and (max-width: 1160px)", {
        match: function(){
          buildHomePage.reDrawMagicLine();
        },
        unmatch: function(){
          buildHomePage.reDrawMagicLine();
        }
        
      });

      enquire.register("screen and (min-width: 360px) and (max-width: 767px)", {
        match: function(){
          buildHomePage.removeMagicLine();
        },
        unmatch: function(){
          buildHomePage.reDrawMagicLine();
        }
        
      });
    },

    reDrawMagicLine: function () {
      buildHomePage.removeMagicLine();
      buildHomePage.buildMagicLine();
    },

    removeMagicLine: function () {
      $('#magic-line').remove();
    }

  }


}();










$(document).ready(function () {
  buildHomePage.buildMagicLine();
  buildHomePage.handleMediaQueries();
});