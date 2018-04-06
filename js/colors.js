(function() {
  window.addEventListener('load', function() {
    var classes = [
		'bg-aqua darken',
		'bg-aqua lighten',
		'bg-blue darken',
		'bg-blue lighten',
		'bg-fuchsia darken',
		'bg-fuchsia lighten',
		'bg-green darken',
		'bg-green darken',
		'bg-green lighten',
		'bg-green lighten',
		'bg-lime darken',
		'bg-lime lighten',
		'bg-maroon darken',
		'bg-maroon lighten',
		'bg-navy darken',
		'bg-navy lighten',
		'bg-olive darken',
		'bg-olive lighten',
		'bg-orange darken',
		'bg-orange lighten',
		'bg-purple darken',
		'bg-purple lighten',
		'bg-red darken',
		'bg-red lighten',
		'bg-teal darken',
		'bg-teal lighten',
		'bg-yellow darken',
		'bg-yellow lighten'
    ];

    var elements = document.querySelectorAll(".colors-js");
    for (var i = 0; i < elements.length; i++) {
      var selectedClasses = classes[Math.floor(Math.random() * classes.length)].split(' ');
      for (var c = 0; c < selectedClasses.length; c++) {
        elements[i].classList.add(selectedClasses[c]); //Can only add one at a time!
      }
    }
  });
})();
