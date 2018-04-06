var Signal = signals.Signal;

var appVersion = document.querySelector('[name=version]').content;

var scrollManager = {
	locked : false,
	lastPosition : 0
};

scrollManager.lock = function(timer){
	if(typeof timer !== "number"){ timer=1000; };
	setTimeout("scrollManager.locked=false;", timer);
	scrollManager.locked=true;
};

function scrollToTop() {
	var position = document.body.scrollTop || document.documentElement.scrollTop;
	if (position){
		window.scrollBy(0,-Math.max(3, Math.floor(position / 16)));
		scrollAnimation=setTimeout('scrollToTop()',3);
	}
	else clearTimeout(scrollAnimation);
}();

window.addEventListener("load", function(evt) {

	document.querySelector('.version').innerHTML = 'v' + appVersion; // Dynamically updates footer version

	util.parseUrlVariables();

	config.debug = window.location.get["debug"] ? window.location.get["debug"] : config.debug;

	document.addEventListener("keydown", function(evt) {
		if(evt.ctrlKey || evt.metaKey || evt.keyCode == 27) { return; }

		ui.search.focus();
		ui.search.show();
		// window.scrollTo(0,0);
		scrollToTop();
	});

	document.addEventListener("keyup", function(evt) {
		// if(evt.keyCode == 17) { evt.preventDefault(); ctrlDown = false; }
		// Escape
		if(evt.keyCode == 27) {
			evt.preventDefault();
			ui.search.focus();
			ui.search.show();
			ui.search.clear();
			ui.results.clear();
		}
	});

	window.addEventListener("scroll", function(evt){
		if(!scrollManager.locked && scrollManager.lastPosition < window.scrollY) {
			// Scrolled down the page
			ui.search.hide();
			scrollManager.lock(333);
		} else if(!scrollManager.locked && scrollManager.lastPosition > window.scrollY) {
			// Scrolled up the page
			ui.search.show();
			scrollManager.lock(333);
		}

		if(window.scrollY < 32) {
			// Fallback to ensure that scrolling to the top always expands search
			scrollManager.locked = false;
			ui.search.show();
		}
		scrollManager.lastPosition = window.scrollY;
	});

	schema.onDownloadBegin.add(ui.spinner.show);
	schema.onDownloadComplete.add(schema.parse);
	schema.onReady.add(db.download);

	db.onDownloadBegin.add(ui.spinner.show);
	db.onDownloadComplete.add(ui.spinner.hide);
	db.onDownloadComplete.add(db.parse);

	ui.search.onSubmit.add(search);
	ui.search.onSubmit.add(util.parseUrlVariables);
	// ui.search.onSubmit.add(ui.results.clear);
	// ui.search.onSubmit.add(ui.spinner.show);
	ui.search.onUpdate.add(ui.search.btn_clear.toggle);
	// ui.search.onUpdate.add(util.updateUrl);

	ui.search.onClear.add(util.updateUrl);
	ui.search.onClear.add(ui.spinner.hide);

	db.onQuery.add(ui.results.clear);
	db.onQuery.add(ui.spinner.show);
	db.onQuery.add(ui.results.error.hide);

	db.onQueryComplete.add(ui.results.show);
	db.onQueryComplete.add(ui.results.highlight);

	ui.results.onUpdate.add(ui.spinner.hide);
	// ui.results.onUpdate.add(ui.results.highlight);
	ui.results.onUpdate.add(ui.nav.update);
	ui.results.onUpdate.add(util.updateUrl);
	ui.results.onClear.add(ui.spinner.hide);
	ui.results.onError.add(ui.spinner.hide);
	ui.results.onError.add(ui.nav.update);

	try {
		schema.download("./db/schema.json");
	} catch (err) {
		switch(err.name) {
			case "XHRException":
				ui.results.error.show(err.message);
				console.log(err);
				break;
			case "XHRNotSupportedException":
				ui.results.error.show(err.message);
				console.log(err);
				break;
			default:
				ui.results.error.show(err.message);
				console.log(err);
				break;
		}
	}

	if(window.location.get.hasOwnProperty('q')) {
		ui.search.value = window.location.get['q'];
		ui.search.submit();
	}

});

window.applicationCache.addEventListener('checking', function(evt) {
	// If browser supports Service Worker, abort applicationCache update
	if(('serviceWorker' in navigator) && !config.debug) {
		evt.preventDefault();
		console.warn('Blocked ApplicationCache checking for update because ServiceWorker support was detected.');
		return false;
	}
}, false);

window.applicationCache.addEventListener('updateready', function(evt) {
	if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
		// Browser downloaded a new app cache.
		ui.notification.show();
	} else {
	// Manifest didn't change nothing new to serve
	}
}, false);

function search(query) {
	try {
		db.query(query);
	} catch (err) {
		switch(err.name) {
			case "BadQueryException":
				ui.results.error.show("Please use a maximum of 8 keywords.");
				break;
			case "NullResultsException":
				ui.results.error.show("Unable to find what you're looking for, please check the spelling and try again.");
				break;
			default:
				ui.results.error.show(err.stack);
				console.log(err);
				break
		}
	}
}

function bmh(haystack, needle) {
	// Boyer-Moore-Horspool search
	haystack = haystack.toUpperCase();
	needle = needle.toUpperCase();

	if (needle.length < 2) {
		return -1;
	}

	var badMatchTable = {};
	var maxOffset = haystack.length - needle.length;
	var offset = 0;
	var last = needle.length - 1;
	var scan;

	// Generate the bad match table, which is the location of offsets
	// to jump forward when a comparison fails
	Array.prototype.forEach.call(needle, function(char, i) {
		badMatchTable[char] = last - i;
	});

	// Now look for the needle
	while (offset <= maxOffset) {
		// Search right-to-left, checking to see if the current offset at
		// needle and haystack match.  If they do, rewind 1, repeat, and if we
		// eventually match the first character, return the offset.
		for (scan = last; needle[scan] === haystack[scan + offset]; scan--) {
			if (scan === 0) {
				return offset;
			}
		}

		offset += badMatchTable[haystack[offset + last]] || last;
	}

	return -1;
}


////////////////////////////////////////////////////////////////////////////////////////////////////

var UIColorMode = { RANDOM : 0, WHITE : 1, BLACK : 0 };

var config = {
	debug : false,
	ui : {
		results_per_page : 10,
		color_mode : UIColorMode.RANDOM
	}
};

////////////////////////////////////////////////////////////////////////////////////////////////////

var util = {};

util.sendShareEmail = function (record) {
	// Would be better to pull record properties from the Record object instead of the RecordCard
	// perhaps have RecordCard store a reference to pass on?
	// TODO: Reimplement in accordance with schema?
	if(record instanceof Record) {
		var sourceUrl = encodeURIComponent(String.format('{0}?q={1}&r={2}&p={3}', (window.location.origin + window.location.pathname), encodeURIComponent(ui.search.value), record.LocationCode.hashCode(), ui.results.page));
		var subject = encodeURIComponent(String.format("{0} > {1} > {2}", document.title, ui.search.value.toUpperCase(), record.Description));
		var message = "";

		message += 'Hello,%0D%0A%0D%0A';
		message += String.format('%09{0} is located at {1}.%0D%0A',
			encodeURIComponent(record.Description),
			encodeURIComponent(record.AddressLocation));

		message += String.format('%09They can be contacted at {0}.%0D%0A',
			encodeURIComponent(record.PhoneNumber));

		message += String.format('%09Their {0} Cerner Code is {1} and they are part of the {2}.%0D%0A',
			encodeURIComponent(record.Cerner),
			encodeURIComponent(record.LocationCode),
			encodeURIComponent(record.LHD));

		message += record.Other.isNullOrEmpty() ? '' : String.format('%09Notes: {0}%0D%0A',
			encodeURIComponent(record.Other));

		message += String.format('%0D%0ASource: {0}%0D%0A',
			sourceUrl);

		window.location.href = String.format("mailto:?subject={0}&body={1}", subject, message);
	}
};

util.raiseUpdateTicket = function (record) {
	var recepient = "";
	var subject = String.format("Trouble Ticket - {0}:{1}", (new Date()).yymmdd(), record.LocationCode.hashCode());
	var message = String.format(
	'-----// In This Field, Make The Appropriate Changes To The Record. //-----%0D%0A%0D%0A' +
	'LHD: {0}%0D%0A' +
	'Cerner: {1}%0D%0A' +
	'LocationCode: {2}%0D%0A' +
	'Description: {3}%0D%0A' +
	'AddressLocation: {4}%0D%0A' +
	'PhoneNumber: {5}%0D%0A' +
	'Sector: {6}%0D%0A' +
	'ORG: {7}%0D%0A' +
	'CostCentreCode: {8}%0D%0A' +
	'EntityCode: {9}%0D%0A' +
	'INST: {10}%0D%0A' +
	'Other: {11}%0D%0A%0D%0A' +
	'Comments: Your comments here...%0D%0A%0D%0A%0D%0A' +
	'-----// DO NOT EDIT BELOW THIS LINE //-----%0D%0A%0D%0A' +
	'LHD: {0}%0D%0A' +
	'Cerner: {1}%0D%0A' +
	'LocationCode: {2}%0D%0A' +
	'Description: {3}%0D%0A' +
	'AddressLocation: {4}%0D%0A' +
	'PhoneNumber: {5}%0D%0A' +
	'Sector: {6}%0D%0A' +
	'ORG: {7}%0D%0A' +
	'CostCentreCode: {8}%0D%0A' +
	'EntityCode: {9}%0D%0A' +
	'INST: {10}%0D%0A' +
	'Other: {11}%0D%0A%0D%0A',
	encodeURIComponent(record.LHD), encodeURIComponent(record.Cerner),
	encodeURIComponent(record.LocationCode), encodeURIComponent(record.Description),
	encodeURIComponent(record.AddressLocation), encodeURIComponent(record.PhoneNumber),
	encodeURIComponent(record.Sector), encodeURIComponent(record.ORG),
	encodeURIComponent(record.CostCentreCode), encodeURIComponent(record.EntityCode),
	encodeURIComponent(record.INST), encodeURIComponent(record.Other));

	window.location.href = (String.format("mailto:{0}?subject={1}&body={2}", recepient, subject, message));
};

util.raiseMissingTicket = function () {
	var recepient = "";
	var subject = String.format("Trouble Ticket - {0}:NEW", (new Date()).yymmdd());
	var message = String.format(
	'-----// In This Field, Fill Out What You Know About The Missing Record //-----%0D%0A%0D%0A' +
	'LHD: %0D%0A' +
	'Description: %0D%0A' +
	'AddressLocation: %0D%0A' +
	'PhoneNumber: %0D%0A' +
	'Sector: %0D%0A' +
	'ORG: %0D%0A' +
	'Comments: %0D%0A%0D%0A');

	window.location.href = (String.format("mailto:{0}?subject={1}&body={2}", recepient, subject, message));
};

util.updateUrl = function () {
	if(('replaceState' in history) && (window.location.origin !== undefined)) {
		var url = String.format('{0}?q={1}&p={2}',
			(location.origin + location.pathname),
			encodeURIComponent(ui.search.value),
			encodeURIComponent((ui.results.page ? ui.results.page : 0)));
		history.replaceState({}, document.title, url);
	}
};

util.parseUrlVariables = function() {
	var a = window.location.search.substr(1).split('&');
	if (a == "") return {};
	var b = {};
	for (var i = 0; i < a.length; ++i)
	{
		var p=a[i].split('=', 2);
		if (p.length == 1)
			b[p[0]] = "";
		else
			b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
	}
	window.location.get = b;
};

////////////////////////////////////////////////////////////////////////////////////////////////////

var ui = {};

ui.search = document.getElementById('search');
ui.search.btn_clear = document.getElementById('btn-clear');
// ui.search.chk_match_all = document.getElementById('chk-match-all');
// ui.search.chk_match_phrase = document.getElementById('chk-match-phrase');

ui.results = document.getElementById('output');

ui.results.error = template.load('error');
ui.results.error.message = (function(){var a=document.createElement('p');a.id='error-text';ui.results.error.insertBefore(a,ui.results.error.lastChild);return a;})();

ui.spinner = (function(){var a=document.getElementById('loading');a.remove();return a;})(); // It works, don't ask
ui.container = document.getElementById('content');

ui.nav = {
	btn_prev : document.getElementById('btn-prev'),
	btn_next : document.getElementById('btn-next'),
	pages : document.getElementById('combo-pages')
};

ui.nav.update = function () {
	if(ui.results.page == null || ui.results.last_page == null || db.query.results.length == 0) {
		ui.nav.pages.clear();
		ui.nav.pages.disabled = true;
		ui.nav.btn_prev.disabled = true;
		ui.nav.btn_next.disabled = true;
	} else {
		ui.nav.pages.clear();
		ui.nav.pages.disabled = false;
		for (var i = 0; i < ui.results.last_page; i++) {
			var option = document.createElement('option');
			option.text = String.format("- Page {0} of {1} -", i+1, ui.results.last_page);
			option.value = i;
			if (i == ui.results.page) {
				option.selected = true;
			}
			ui.nav.pages.appendChild(option);
		}

		if(ui.results.page == (ui.results.last_page - 1)) { ui.nav.btn_next.disabled = true; }
				else { ui.nav.btn_next.disabled = false; };
		if(ui.results.page == 0) { ui.nav.btn_prev.disabled = true; }
				else { ui.nav.btn_prev.disabled = false; };
	}
}

ui.nav.pages.update = function () {

};

ui.nav.pages.clear = function () {
	var options = ui.nav.pages.querySelectorAll('option');
	if(options.length > 0) {
		for(var i = 0; i < options.length; i++) {
			options[i].remove();
		}
	}
};

ui.nav.pages.addEventListener('change', function() {
	ui.results.show(ui.nav.pages.value); // FIX
});

ui.nav.btn_next.addEventListener('click', function() {
	ui.results.show(ui.results.page+1);
});

ui.nav.btn_prev.addEventListener('click', function() {
	ui.results.show(ui.results.page-1);
});

////////////////////////////////////////////////////////////////////////////////////////////////////

ui.spinner.show = function () {
	if(!ui.spinner.__self) {
		ui.spinner.__self = ui.container.appendChild(ui.spinner);
	}
};

ui.spinner.hide = function () {
	if(ui.spinner.__self) {
		ui.spinner.__self.remove();
		ui.spinner.__self = null;
	}
};

////////////////////////////////////////////////////////////////////////////////////////////////////

ui.search.onUpdate = new Signal();
ui.search.onSubmit = new Signal();
ui.search.onClear = new Signal();

ui.search.submit = function () {
  if(db.state != DatabaseState.READY){
    if(db.state == DatabaseState.ERROR) {
     return;
    }
    setTimeout(ui.search.submit, 100);
    return;
  }
	ui.search.cancel();
	// ui.results.page = null;
	// ui.results.last_page = null;
	ui.search.onUpdate.dispatch(ui.search.value);
	if(ui.search.value.length > 1) {
		ui.spinner.show();
		ui.search.timeout = setTimeout("ui.search.onSubmit.dispatch(ui.search.value);", 666);
	} else if(ui.search.value.length == 0) {
		ui.search.onClear.dispatch();
	}
};

ui.search.cancel = function () { clearTimeout(ui.search.timeout); };

ui.search.clear = function () {
	ui.search.value = "";
	ui.search.onClear.dispatch();
	ui.search.onUpdate.dispatch(ui.search.value);
	// ui.search.submit;
	// window.scrollTo(0,0);
	scrollToTop();
};

ui.search.show = function () {
	document.getElementById("header").classList.remove("collapse");
}

ui.search.hide = function () {
	document.getElementById("header").classList.add("collapse");
}

ui.search.addEventListener("keyup", function(evt) {
	// if(ctrlDown || ctrlDown && [65,67,86,88].includes(evt.keyCode)) { return; } // Select All, Cut, Copy and Paste
	if(evt.ctrlKey || evt.metaKey) { return; } // Disable anything with ctrl pressed
	ui.search.submit();
	window.location.pathname
});

ui.search.btn_clear.toggle = function(value) {
	if(value.length > 0) {
		ui.search.btn_clear.show();
	} else {
		ui.search.btn_clear.hide();
	}
}

ui.search.btn_clear.show = function() {
	ui.search.btn_clear.classList.remove('hide');
}

ui.search.btn_clear.hide = function() {
	ui.search.btn_clear.classList.add('hide');
}

ui.search.btn_clear.addEventListener("click", function(evt){
	ui.results.clear();
	ui.search.clear();
	ui.search.focus();
});

////////////////////////////////////////////////////////////////////////////////////////////////////

ui.results.onUpdate = new Signal(); // dispatch page number?
ui.results.onClear = new Signal();
ui.results.onError = new Signal();

ui.results.page = null;
ui.results.last_page = null;

ui.results.show = function (page) {
	if(typeof page === "undefined") page = 0;
	page = parseInt(page);

	// window.scrollTo(0,0);
	scrollToTop();
	ui.results.clear();

	var totalPages = Math.ceil(db.query.results.length / config.ui.results_per_page) - 1;

	// for (var i = 0; i < db.query.results.length; i++) {
	// 	var index = db.query.results[i].index;
	// 	var element = new ResultCard(db.record[index]);
	// 	ui.results.appendChild(element);
	// }

	if(page < 0 || page > totalPages) {
		throw new ResultsPageOutOfBoundsException();
	}

	ui.results.page = page;
	ui.results.last_page = totalPages+1;

	var finalPageResultIndex = db.query.results.length < config.ui.results_per_page + (page * config.ui.results_per_page) ?
			db.query.results.length : config.ui.results_per_page + (page * config.ui.results_per_page);

	for (var i = (page * config.ui.results_per_page); i < finalPageResultIndex; i++) {
		var index = db.query.results[i].index;
		var element = new ResultCard(db.record[index], JSON.stringify(db.query.results[i]));
		ui.results.appendChild(element);
	}

	ui.results.onUpdate.dispatch();
};

ui.results.clear = function () {
	ui.nav.pages.clear();
	ui.nav.pages.disabled = true;
	ui.nav.btn_prev.disabled = true;
	ui.nav.btn_next.disabled = true;
	ui.results.page = 0;
	ui.results.page = 0;
	ui.results.last_page = 0;

	// ui.results.page = null;
	// ui.results.last_page = null;
	// JavaScript black magic, clearing innerHTML is very slow compared to looping through and removing each child?
	while(ui.results.lastChild) {
		ui.results.removeChild(ui.results.lastChild);
	}

	ui.results.onClear.dispatch();
};

ui.results.highlight = function () {

	/*	Unfortunately causes two calls to ui.results.show()
		as Signal fires first and intercept not possible	*/
	if(window.location.get.hasOwnProperty('p')) {
		ui.results.show(window.location.get['p']);
	} else {
		ui.results.show();
	}

	if(window.location.get.hasOwnProperty('r')) {
		var hash = window.location.get['r'];
		var element = document.getElementById(hash);
		if(element) {
			window.scrollTo(0,element.offsetTop);
			element.parentElement.style.outline = '5px solid white';
		}
	}

	// Once only ever
	db.onQueryComplete.remove(ui.results.highlight);
}

ui.results.error.show = function (message) {
	ui.results.error.message.innerHTML = message + "</br>";

	if(!ui.results.error.__self) {
		ui.results.error.__self = ui.container.appendChild(ui.results.error);
	}

	ui.results.onError.dispatch(message);
}

ui.results.error.hide = function () {
	if(ui.results.error.__self) {
		ui.results.error.__self.remove();
		ui.results.error.__self = null;
	}
}

////////////////

ui.notification = document.getElementById('notification');

ui.notification.show = function () {
	ui.notification.classList.remove('hide');
}

ui.notification.hide = function () {
	ui.notification.classList.add('hide');
}

////////////////

var DatabaseState = {
	ERROR: -1,
	PENDING: 0,
	READY: 1
};

var schema = {};

schema.onDownloadBegin = new Signal();
schema.onDownloadComplete = new Signal();
schema.onReady = new Signal();

schema.download = function(url) {
	var data;
	var xhttp;
	if ('ActiveXObject' in window) {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE w/ FS Access
	} else if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		throw new XHRNotSupportedException();
	}

	xhttp.onreadystatechange = function () {
		if(xhttp.readyState == 4) {
			if(xhttp.status == 200 || xhttp.status == 0) {
				//HTTP OK or 0 for local fs
				if(xhttp.responseText.isNullOrEmpty()) {
					throw new XHRException("The request returned an empty respose.");
				} else {
					schema.onDownloadComplete.dispatch(xhttp.responseText);
					return xhttp.responseText;
				}
			} else {
				throw new XHRException("The request returned failed with the stauts code " + xhttp.status);
			}
		}
	}

	xhttp.open("GET", url, true);
	xhttp.send();
};

schema.parse = function(data) {
	var schemaObj = {};
	try {
		schemaObj = JSON.parse(data);
		schema.version = schemaObj.version;
		schema.dataurl = schemaObj.dataurl;
		schema.fields = schemaObj.fields;
		schema.position = schemaObj.position;

		// Sort by defined position in schema
		var highestAssignedPosition = 0;
		for (var i = 0; i < schema.fields.length; i++) {
			if(schema.fields[i].position > highestAssignedPosition) highestAssignedPosition = schema.fields[i].position;
		}

		// Where no position is defined, move to end of list in the order each field is defined
		for (var i = 0; i < schema.fields.length; i++) {
			if(schema.fields[i].position == null) schema.fields[i].position = ++highestAssignedPosition; // Increment then assign
		}

		// Sort all fields according to final position value
		schema.fields.sort(function(a, b) {
		    return a.position - b.position;
		});

		schemaObj = null; // Mm, memory management
		data = null;
		schema.onReady.dispatch(schema.dataurl); // Pass database file url to db.download();
	} catch (err) {
		throw err;
	}
};

schema.getFieldByName = function(name) {
	// Just a utility function for debugging purposes
	for(var i = 0; i < schema.fields.length; i++) {
		if(schema.fields[i].dataname == name) {
			return schema.fields[i];
		}
	}
	throw new Exception("Field not found.");
};

schema.version = -1;
schema.dataurl = "";
schema.fields = [];

var db = {};

db.state = DatabaseState.PENDING;
db.record = [];

db.onDownloadBegin = new Signal();
db.onDownloadComplete = new Signal();
db.onQuery = new Signal();
db.onQueryComplete = new Signal();

db.download = function(url) {
	var xmlData;
	var xhttp;
	if ('ActiveXObject' in window) {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP"); // IE w/ FS Access
	} else if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
	} else {
		throw new XHRNotSupportedException();
	}

	xhttp.onreadystatechange = function () {
		if(xhttp.readyState == 4) {
			if(xhttp.status == 200 || xhttp.status == 0) {
				// HTTP OK or 0 for local fs
				if(xhttp.responseText.isNullOrEmpty()) {
		db.state = DatabaseState.ERROR;
					throw new XHRException("The request returned an empty respose.");
				} else {
		db.state = DatabaseState.READY;
					db.onDownloadComplete.dispatch(xhttp.responseText);
					return xhttp.responseText;
				}
			} else {
		db.state = DatabaseState.ERROR;
				throw new XHRException("The request returned failed with the stauts code " + xhttp.status);
			}
		}
	}

	xhttp.open("GET", url, true);
	xhttp.send();
};

db.parse = function(xmlData) {
	var xmlDoc;
	var parser = new DOMParser();
	xmlDoc = parser.parseFromString(xmlData.replace(/^\s+|\s+$/g, ''), "text/xml").getElementsByTagName('entry');
	xmlData = null;

	for (var i = 0; i < xmlDoc.length; i++) {
		db.record.push(new Record(xmlDoc[i]));
	}
};

db.query = function(query) {
	db.onQuery.dispatch();

	db.query.results = [];
	var keyword = [query.trim()];
	keyword = keyword.concat(query.trim().split(' '));

	if(keyword.length == 2) {
		/*	Performance hack: if keyword length is only 2...
			then k0 and k1 will always be the same, so...
			remove k1 to avoid searching same keyword twice	*/
		keyword = [keyword[0]];
	}

	for (var i = 0; i < keyword.length; i++) {
		if(keyword[i].length==1) {
			keyword.splice(i, 1); // Remove single character keywords for performance
		}
	}

	if(keyword.length > 9) {
		throw new BadQueryException("Maximum of 8 keywords");
	}

	for (var i = 0; i < db.record.length; i++) {
		var recordScore = 0;
		var hasMatchPhrase = false;
		var hasMatchAll = true; // True until proven false

		for (var k = 0; k < keyword.length; k++) {
			var newScore = recordScore;

			for (var f = 0; f < schema.fields.length; f++) {
				newScore = bmh(db.record[i][schema.fields[f].dataname], keyword[k]) > -1 ? (newScore + (keyword[k].length * schema.fields[f].weight)) : (newScore);
			}

			// Corner-case k0 is always the entire query
			if(k==0 && newScore > recordScore){
				hasMatchPhrase = true;
			}

			if(k!=0 && recordScore == newScore) {
				hasMatchAll = false;
			}

			recordScore += newScore;
		}

		if(recordScore > 0) {
			db.query.results.push({index:i, score:recordScore, matchPhrase:hasMatchPhrase, matchAll:hasMatchAll});
		}
	}

	if(db.query.results.length == 0) {
		throw new NullResultsException();
	}

	db.query.results.sort(function(a,b) {
		if(a.matchPhrase === b.matchPhrase) {
			if(a.matchAll === b.matchAll) {
				if(a.score === b.score) {
					if(a.index > b.index) { return -1; } else { return 1; }
				} else {
					if(a.score > b.score) { return -1; } else { return 1; }
				}
			} else {
				if(a.matchAll) { return -1; } else { return 1; }
			}
		} else {
			if(a.matchPhrase) { return -1; } else { return 1; }
		}
	});

	db.onQueryComplete.dispatch();
};

db.query.results = [];

// Record should not really be responsible for parsing
// but until a better solution can be implemented, this
// will have to suffice.
function Record(xmlElement) {
	for(var i = 0; i < schema.fields.length; i++) {
		var field = schema.fields[i];
		this[field.dataname] = xmlElement.getElementsByTagName(field.dataname)[0].textContent;
		this[field.dataname].visible = field.visible;
		this[field.dataname].weight = field.weight;
		this[field.dataname].title = field.title;
	}
}

function ResultCard(record, debug) {
	if(typeof debug !== "string") debug = "";
	var _parent = this; // This makes me sad, but can't see a better way

	var _element = template.load('result-card');
	_element.rows = _element.querySelector('.rows');

	// Currently relies on a hard-coded copy of the <template> element in index.html
	var createField = function (header, content) {
		var _row = document.createElement('div');
		_row.content = document.createElement('span');

		_row.innerHTML = String.format('{0}: ', header);
		_row.content.innerHTML = content.replace(/\n/g, "<br />");;

		_row.appendChild(_row.content);

		if(content.isNullOrEmpty()) {
			_row.classList.add('hide');
		}
		return _row;
	};

	for (var f = 0; f < schema.fields.length; f++) {
		if (schema.fields[f].title.length > 0) {
			this[schema.fields[f].dataname] = createField(schema.fields[f].title, record[schema.fields[f].dataname]);
			_element.rows.appendChild(this[schema.fields[f].dataname]);
		} else {
			this[schema.fields[f].dataname] = createField(schema.fields[f].dataname, record[schema.fields[f].dataname]);
			_element.rows.appendChild(this[schema.fields[f].dataname]);
		}
	}

	this.debug = createField('debug', debug); // Added post-facto
	_element.rows.appendChild(this.debug);

	if(!config.debug) {
		for (var f = 0; f < schema.fields.length; f++) {
			if(schema.fields[f].visible == false) {
				this[schema.fields[f].dataname].classList.add('hide');
			}
		}
		this.debug.classList.add('hide');
	}

	this.anchor	= _element.querySelector('a');
	// TODO: re-implement anchoring using non-hardcoded field (implement in schema?)
	this.anchor.id = record.LocationCode.hashCode();

	this.buttons = {};

	this.buttons.search = _element.querySelector('.search-description');
	this.buttons.search.href = String.format('http://google.com/search?q={0}', encodeURIComponent(record.Description));

	this.buttons.map = _element.querySelector('.map-address');
	this.buttons.map.href = String.format('http://maps.apple.com/maps?q={0}', encodeURIComponent(record.AddressLocation));

	this.buttons.share = _element.querySelector('.share-card');
	this.buttons.share.onclick = function () { util.sendShareEmail(record); };

	this.buttons.report = _element.querySelector('.raise-ticket');
	this.buttons.report.onclick = function () { util.raiseUpdateTicket(record); };

	return _element;
}
