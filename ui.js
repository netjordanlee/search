function ui() {};

ui.search = document.getElementById('search');
ui.search.chk_match_all = document.getElementById('chk-match-all');
ui.search.chk_match_phrase = document.getElementById('chk-match-phrase');

ui.results = document.getElementById('output');
ui.results.error_message = (function(){var a=document.getElementById('error');a.remove();return a;})();

ui.results.error = function (message) {
	ui.results.error_message.getElementById("error-text").textContent = message;
}

ui.results.error.show = function () {
	if(!ui.results.error_message.__self) {
		ui.results.error_message.__self = ui.container.appendChild(ui.results.error_message);
	}
}

ui.results.error.hide = function () {
	if(ui.results.error_message.__self) {
		ui.results.error_message.__self.remove();
	}
}

ui.spinner = (function(){var a=document.getElementById('loading');a.remove();return a;})(); //It works, don't ask
ui.container = document.getElementById('content');

ui.nav = {
	btn_prev : document.getElementById('btn-prev'),
	btn_next : document.getElementById('btn-next'),
	pages : document.getElementById('combo-pages')
};

/**************************************************************/

ui.spinner.show = function () {
	if(!ui.spinner.__self) {
		ui.spinner.__self = ui.container.appendChild(ui.spinner);
	}
};

ui.spinner.hide = function () {
	if(ui.spinner.__self) {
		ui.spinner.__self.remove();
	}
};

/**************************************************************/

ui.search.onUpdate = new Signal();
ui.search.onSubmit = new Signal();

ui.search.submit = function () {
	ui.search.cancel();
	if(ui.search.value.length > 1) {
		ui.search.onUpdate.dispatch();
		ui.search.timeout = setTimeout("ui.search.onSubmit.dispatch(ui.search.value);", 666);
	}
};

ui.search.cancel = function () { clearTimeout(ui.search.timeout); };

ui.search.clear = function () {
	ui.search.value = "";
	ui.search.onUpdate.dispatch();
	ui.search.submit;
};

ui.search.addEventListener("keyup", function(evt) {
	if(evt.keyCode == 27) { ui.search.clear(); }
	ui.search.submit();
});

ui.search.chk_match_phrase.addEventListener("onchange", function(evt) {
	ui.search.submit();
});

ui.search.chk_match_all.addEventListener("onchange", function(evt) {
	ui.search.submit();
});

/**************************************************************/

ui.results.onUpdate = new Signal();

ui.results.show = function (page) {
	if(typeof page === "undefined") page = 0;



	ui.results.onUpdate.dispatch();
};

ui.results.clear = function () {
	// JavaScript black magic, clearing innerHTML is very slow compared to looping through and removing each child?
	while(ui.results.lastChild) {
		ui.results.removeChild(ui.results.lastChild);
	}

	ui.results.onUpdate.dispatch();
};

/**************************************************************/

ui.nav.btn_prev.addEventListener("onclick", function(evt){
	
});

ui.nav.btn_next.addEventListener("onclick", function(evt){
	
});

ui.nav.pages.addEventListener("onchange", function(evt){
	
});