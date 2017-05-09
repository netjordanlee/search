(function($) {

  $(document).ready(function() {
    var classes = [
      'bg-black aqua lighten',
      'bg-black blue lighten',
      'bg-black lime lighten',
      'bg-black teal lighten',
      'bg-black olive lighten',
      'bg-black green lighten',
      'bg-black red lighten',
      'bg-black orange lighten',
      'bg-black purple lighten',
      'bg-black yellow lighten',
      'bg-black fuchsia lighten',
      'bg-black gray lighten',
      'bg-black white lighten',
      'bg-black silver lighten'
    ];

    $('.a11y').each(function(i) {
      $(this).addClass(classes[Math.floor(Math.random() * classes.length)]);
    });
  });

})(jQuery);
