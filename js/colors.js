(function() {
  window.addEventListener('load', function() {
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
		'bg-gray navy darken',
		'bg-gray maroon darken',
		'bg-gray black darken',
		'bg-fuchsia navy darken',
		'bg-fuchsia white darken',
		'bg-fuchsia black darken',
		'bg-yellow purple darken',
		'bg-yellow maroon darken',
		'bg-yellow navy darken',
		'bg-yellow blue darken',
		'bg-yellow black darken',
		'bg-purple lime darken',
		'bg-purple silver darken',
		'bg-purple black darken',
		'bg-purple white darken',
		'bg-purple yellow darken',
		'bg-orange maroon darken',
		'bg-orange navy darken',
		'bg-orange black darken',
		'bg-maroon lime darken',
		'bg-maroon aqua darken',
		'bg-maroon green darken',
		'bg-maroon orange darken',
		'bg-maroon yellow darken',
		'bg-maroon gray darken',
		'bg-maroon white darken',
		'bg-maroon silver darken',
		'bg-red navy darken',
		'bg-red white darken',
		'bg-red black darken',
		'bg-aqua navy darken',
		'bg-aqua maroon darken',
		'bg-aqua fuchsia darken',
		'bg-aqua black darken',
		'bg-blue lime darken',
		'bg-blue navy darken',
		'bg-blue yellow darken',
		'bg-blue white darken',
		'bg-blue black darken',
		'bg-blue silver darken',
		'bg-navy blue darken',
		'bg-navy aqua darken',
		'bg-navy olive darken',
		'bg-navy green darken',
		'bg-navy lime darken',
		'bg-navy red darken',
		'bg-navy orange darken',
		'bg-navy yellow darken',
		'bg-navy fuchsia darken',
		'bg-navy gray darken',
		'bg-navy silver darken',
		'bg-navy white darken',
		'bg-teal navy darken',
		'bg-teal maroon darken',
		'bg-teal black darken',
		'bg-lime blue darken',
		'bg-lime navy darken',
		'bg-lime maroon darken',
		'bg-lime fuchsia darken',
		'bg-lime black darken',
		'bg-olive navy darken',
		'bg-olive white darken',
		'bg-olive black darken',
		'bg-green navy darken',
		'bg-green black darken',
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
