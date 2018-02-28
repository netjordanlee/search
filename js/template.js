/* Supports IE9+ */
var template = (function(){
	var __class__ = {};

	__class__.load = function (name) {
		var _template = document.querySelector('[name='+name+']');
		if(_template.content)
			return document.importNode(_template.content.firstElementChild, true);
		if (_template.firstElementChild)
			return document.importNode(_template.firstElementChild, true);

		throw "[Template] Unable to parse template: " + name;
	}

	return __class__;
})();