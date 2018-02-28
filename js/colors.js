(function() {
  window.addEventListener('load', function() {
    var classes = [
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
        elements[i].classList.add(selectedClasses[c]); // Can only add one at a time!
      }
    }
  });
})();