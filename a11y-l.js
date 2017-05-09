(function($){

	$(document).ready(function() {
		var classes = [
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
			$(this).addClass(classes[ Math.floor( Math.random()*classes.length ) ] );
		});
	});

})(jQuery);
