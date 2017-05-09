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
      'bg-black silver lighten',
      'bg-white blue darken',
      'bg-white navy darken',
      'bg-white olive darken',
      'bg-white red darken',
      'bg-white maroon darken',
      'bg-white purple darken',
      'bg-white fuchsia darken',
      'bg-white black darken',
      'bg-silver blue darken',
      'bg-silver navy darken',
      'bg-silver maroon darken',
      'bg-silver fucshia darken',
      'bg-silver black darken',
      'bg-gray navy lighten',
      'bg-gray maroon lighten',
      'bg-gray black lighten'
    ];

    $('.a11y').each(function(i) {
      $(this).addClass(classes[Math.floor(Math.random() * classes.length)]);
    });
  });

})(jQuery);
