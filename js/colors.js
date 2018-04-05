(function() {
  window.addEventListener('load', function() {
    var classes = [
		'bg-fuchsia navy lighten',
		'bg-fuchsia white darken',
		'bg-fuchsia black lighten',
		'bg-yellow purple darken',
		'bg-yellow maroon darken',
		'bg-yellow navy lighten',
		'bg-yellow blue darken',
		'bg-yellow black lighten',
		'bg-purple lime darken',
		'bg-purple silver darken',
		'bg-purple black lighten',
		'bg-purple white darken',
		'bg-purple yellow darken',
		'bg-orange maroon darken',
		'bg-orange navy lighten',
		'bg-orange black lighten',
		'bg-maroon lime darken',
		'bg-maroon aqua darken',
		'bg-maroon green darken',
		'bg-maroon orange darken',
		'bg-maroon yellow darken',
		'bg-maroon gray darken',
		'bg-maroon white darken',
		'bg-maroon silver darken',
		'bg-red navy lighten',
		'bg-red white darken',
		'bg-red black lighten',
		'bg-aqua navy lighten',
		'bg-aqua maroon darken',
		'bg-aqua fuchsia darken',
		'bg-aqua black lighten',
		'bg-blue lime darken',
		'bg-blue navy lighten',
		'bg-blue yellow darken',
		'bg-blue white darken',
		'bg-blue black lighten',
		'bg-blue silver darken',
		'bg-teal navy lighten',
		'bg-teal maroon darken',
		'bg-teal black lighten',
		'bg-lime blue darken',
		'bg-lime navy lighten',
		'bg-lime maroon darken',
		'bg-lime fuchsia darken',
		'bg-lime black lighten',
		'bg-olive navy lighten',
		'bg-olive white darken',
		'bg-olive black lighten',
		'bg-green navy lighten',
		'bg-green black lighten',
		'bg-green maroon darken'
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
