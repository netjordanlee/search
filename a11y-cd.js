(function($) {

  $(document).ready(function() {
    var classes = [
      'bg-fuchsia navy lighten',
      'bg-fuchsia white lighten',
      'bg-fuchsia black lighten',
      'bg-maroon lime lighten',
      'bg-maroon aqua lighten',
      'bg-maroon green lighten',
      'bg-maroon orange lighten',
      'bg-maroon yellow lighten',
      'bg-maroon gray lighten',
      'bg-maroon white lighten',
      'bg-maroon silver lighten',
      'bg-navy blue lighten',
      'bg-navy aqua lighten',
      'bg-navy olive lighten',
      'bg-navy green lighten',
      'bg-navy lime lighten',
      'bg-navy red lighten',
      'bg-navy orange lighten',
      'bg-navy yellow lighten',
      'bg-navy fuchsia lighten',
      'bg-navy gray lighten',
      'bg-navy silver lighten',
      'bg-navy white lighten'
    ];

    $('.a11y').each(function(i) {
      $(this).addClass(classes[Math.floor(Math.random() * classes.length)]);
    });
  });

})(jQuery);
