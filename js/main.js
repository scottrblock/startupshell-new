window.my_config = {
  offset : parseInt($('#main-nav-list .first').css('margin-right'))
} 

var buildHomePage = function () {
  return {

    buildMagicLine: function () {
      var $el, leftPos, newWidth,
             $mainNav = $("#main-nav-list");
         
         $mainNav.append("<li id='magic-line' class='magic-line'></li>");
         var $magicLine = $("#magic-line");
         var $curItem = $('.active', $mainNav);

         $magicLine
             .width($curItem.width())
             .css("left", $("a", $curItem).position().left - my_config.offset)
             .data("origLeft", $magicLine.position().left)
             .data("origWidth", $magicLine.width());
             
         $("#main-nav-list li a").click(function(e) {
          $el = $(this);
           buildHomePage.moveLine($el, $magicLine);

          $.scrollTo( $el.attr('href'), 800, {offset:-80} );

         return false;
         });
    },

    moveLine : function ($el, $magicLine){
       leftPos = $el.position().left - my_config.offset;
       newWidth = $el.parent().width();
       $magicLine.stop().animate({
           left: leftPos,
           width: newWidth
       }, 200);

      $('#main-nav-list .active').removeClass('active');
      $el.parent().addClass('active');
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
    },

    repositionMagicLine: function (i) {
        $('#main-nav-list .active').removeClass('active');
        $('#main-nav-list li:eq(' + i + ')').addClass('active');
        buildHomePage.reDrawMagicLine();
    },

    resizeBackgrounds: function () {
      var h = 750;
      var y = 1200;

      var backZoom =$(window).height() /  (h * $(window).width() / 1200);
      var percent =  (backZoom*100).toFixed(1) + "%"
      $('.main-container-wrapper').css('height', ($(window).height() - 80)*3);
      $('.main-container-wrapper').css('background-size', percent);
      $('.section-content').css('height', $(window).height() -80);
      $('.red-background').css('height', '100%');
    },

    listenForScrolls: function () {
      $('.section-title').waypoint(function(d) {
        var eq = $(this).attr('data-attr-count');
        eq = parseInt(eq.charAt(eq.length - 1));  //kind of gross but better than upping scroll throttle

        if(d == 'down'){
          eq = eq + 1
        }

        if(eq >= 0){
          buildHomePage.moveLine($('#main-nav-list li:eq(' + eq + ') a'), $('#magic-line'));
        }
      });
    },

    listenForButtonClicks: function () {
      $('.bottom-button').click(function(){
        $.scrollTo( $(this).attr('href'), 800, {offset:-80} );
        return false;
      });
    }

  }


}();


$(document).ready(function () {
  var s = skrollr.init({
    forceHeight: false
  });

  buildHomePage.buildMagicLine();
  buildHomePage.handleMediaQueries();
  buildHomePage.resizeBackgrounds();
  buildHomePage.listenForScrolls();
  buildHomePage.listenForButtonClicks();

  skrollr.menu.init(s, {
      animate: true, //skrollr will smoothly animate to the new position using `animateTo`.
      duration: 600, //How long the animation should take in ms.
      easing: 'sqrt' //The easing function to use.
  });
});













