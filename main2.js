var Signal = signals.Signal;

var scrollManager = {
	locked : false,
	lastPosition : 0
};

scrollManager.lock = function(timer){
	if(typeof timer !== "number"){ timer=1000; };
	setTimeout("scrollManager.locked=false;", timer);
	scrollManager.locked=true;
};

window.addEventListener("load", function(evt) {
	
	document.addEventListener("keydown", function(evt) {
		//if(evt.keyCode == 17) { ctrlDown = true; return; }
		if(evt.ctrlKey || evt.metaKey) { return; }
		if(!evt.ctrlKey || !evt.metaKey) {
			ui.search.focus();
			ui.search.show();
		}
		window.scrollTo(0,0);
	});

	document.addEventListener("keyup", function(evt) {
		//if(evt.keyCode == 17) { evt.preventDefault(); ctrlDown = false; }
		//Escape
		if(evt.keyCode == 27) {
			evt.preventDefault();
			ui.search.clear();
			ui.search.focus();
			ui.search.show();
		}
	});

	window.addEventListener("scroll", function(evt){
		if(!scrollManager.locked && scrollManager.lastPosition < window.scrollY) {
			// Scrolled down the page
			ui.search.hide();
			scrollManager.lock(333);
		} else if(!scrollManager.locked) {
			// Scrolled up the page
			ui.search.show();
			scrollManager.lock(333);
		} else if(window.scrollY == 0) {
			// Fallback to ensure that scrolling to the top always expands search
			ui.search.show();
		}
		scrollManager.lastPosition = window.scrollY;
	});

	db.onDownloadBegin.add(ui.spinner.show);
	db.onDownloadComplete.add(ui.spinner.hide);
	db.onDownloadComplete.add(db.parse);

	ui.search.onSubmit.add(search);
	//ui.search.onSubmit.add(ui.results.clear);
	//ui.search.onSubmit.add(ui.spinner.show);
	ui.search.onUpdate.add(ui.search.btn_clear.toggle);

	ui.search.onClear.add(ui.spinner.hide);

	db.onQuery.add(ui.results.clear);
	db.onQuery.add(ui.spinner.show);
	db.onQuery.add(ui.results.error.hide);

	db.onQueryComplete.add(ui.results.show);

	ui.results.onUpdate.add(ui.spinner.hide);
	ui.results.onUpdate.add(ui.results.highlight);
	ui.results.onClear.add(ui.spinner.hide);
	ui.results.onError.add(ui.spinner.hide);

	try {
		db.download("./db.min.xml");
	} catch (err) {
		switch(typeof(err)) {
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

	if(window.location.get['q']) {
		ui.search.value = window.location.get['q'];
		ui.search.submit();
	}
});

function search(query) {
	try {
		db.query(query);
	} catch (error) {
		if(error instanceof BadQueryException) {
			ui.results.error.show("Please use a maximum of 8 keywords.");
		} else if(error instanceof NullResultsException) {
			ui.results.error.show("Unable to find what you're looking for, please check the spelling and try again.");
		} else {
			ui.results.error.show(error.stack);
			console.log(error);
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

////////////////////////////////

var ui = {};

ui.search = document.getElementById('search');
ui.search.btn_clear = document.getElementById('btn-clear');
// ui.search.chk_match_all = document.getElementById('chk-match-all');
// ui.search.chk_match_phrase = document.getElementById('chk-match-phrase');

ui.results = document.getElementById('output');

ui.results.error = (function(){var a=document.getElementById('error');a.remove();return a;})();
ui.results.error.message = (function(){var a=document.createElement('p');a.id='error-text';ui.results.error.insertBefore(a,ui.results.error.lastChild);return a;})();

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
		ui.spinner.__self = null;
	}
};

/**************************************************************/

ui.search.onUpdate = new Signal();
ui.search.onSubmit = new Signal();
ui.search.onClear = new Signal();

ui.search.submit = function () {
	ui.search.cancel();
	ui.search.onUpdate.dispatch(ui.search.value);
	if(ui.search.value.length > 1) {
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
	//ui.search.submit;
};

ui.search.show = function () {
	document.getElementById("header").classList.remove("collapse");
}

ui.search.hide = function () {
	document.getElementById("header").classList.add("collapse");
}

ui.search.addEventListener("keyup", function(evt) {
	//if(ctrlDown || ctrlDown && [65,67,86,88].includes(evt.keyCode)) { return; } //Select All, Cut, Copy and Paste
	if(evt.ctrlKey || evt.metaKey) { return; } //Disable anything with ctrl pressed
	ui.spinner.show();
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
	ui.search.clear();
});

// ui.search.chk_match_phrase.addEventListener("change", function(evt) {
// 	ui.search.submit();
// });

// ui.search.chk_match_all.addEventListener("change", function(evt) {
// 	ui.search.submit();
// });

/**************************************************************/

ui.results.onUpdate = new Signal();
ui.results.onClear = new Signal();
ui.results.onError = new Signal();

ui.results.show = function (page) {
	if(typeof page === "undefined") page = 0;
	window.scrollTo(0,0);

	for (var i = 0; i < db.query.results.length; i++) {
		var index = db.query.results[i].index;
		var element = new ResultCard(db.record[index]);
		// var debugInfo = document.createElement("p");
		// debugInfo.textContent = JSON.stringify(db.query.results[i]);
		// element.appendChild(debugInfo);
		ui.results.appendChild(element);
	}

	ui.results.onUpdate.dispatch();
};

ui.results.clear = function () {
	// JavaScript black magic, clearing innerHTML is very slow compared to looping through and removing each child?
	while(ui.results.lastChild) {
		ui.results.removeChild(ui.results.lastChild);
	}

	ui.results.onClear.dispatch();
};

ui.results.highlight = function () {
	var hash = window.location.get['r'] ? window.location.get['r'] : window.location.hash.replace('#', '');
	var element = document.getElementById(hash);
	if(element) {
		window.scrollTo(0,element.offsetTop);
		element.parentElement.parentElement.style = 'border: 5px solid white';
	}
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

/**************************************************************/

ui.nav.btn_prev.addEventListener("onclick", function(evt){
	
});

ui.nav.btn_next.addEventListener("onclick", function(evt){
	
});

ui.nav.pages.addEventListener("onchange", function(evt){
	
});

////////////////

var db = {};

db.record = [];

db.onDownloadBegin = new Signal();
db.onDownloadComplete = new Signal();
db.onQuery = new Signal();
db.onQueryComplete = new Signal();

db.download = function(url) {
	var xmlData;
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
					db.onDownloadComplete.dispatch(xhttp.responseText);
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

db.parse = function(xmlData) {
	var xmlDoc;
	var parser = new DOMParser();
	xmlDoc = parser.parseFromString(xmlData.replace(/^\s+|\s+$/g, ''), "text/xml").getElementsByTagName('entry');
	xmlData = null;

	for (var i = 0; i < xmlDoc.length; i++) {
		db.record.push(new Record(
			xmlDoc[i].getElementsByTagName("LHD")[0].textContent,
			xmlDoc[i].getElementsByTagName("Cerner")[0].textContent,
			xmlDoc[i].getElementsByTagName("LocationCode")[0].textContent,
			xmlDoc[i].getElementsByTagName("Description")[0].textContent,
			xmlDoc[i].getElementsByTagName("AddressLocation")[0].textContent,
			xmlDoc[i].getElementsByTagName("PhoneNumber")[0].textContent,
			xmlDoc[i].getElementsByTagName("Sector")[0].textContent,
			xmlDoc[i].getElementsByTagName("ORG")[0].textContent,
			xmlDoc[i].getElementsByTagName("CostCentreCode")[0].textContent,
			xmlDoc[i].getElementsByTagName("EntityCode")[0].textContent,
			xmlDoc[i].getElementsByTagName("INST")[0].textContent,
			xmlDoc[i].getElementsByTagName("Other")[0].textContent
			)
		);
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
		 	remove k1 to avoid searching same keyword twice */
		keyword = [keyword[0]];
	}

	for (var i = 0; i < keyword.length; i++) {
		if(keyword[i].length==1) {
			keyword.splice(i, 1); //Remove single character keywords for performance
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

			newScore = bmh(db.record[i].LHD, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.1)) : (newScore);
			newScore = bmh(db.record[i].cerner, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.1)) : (newScore);
			newScore = bmh(db.record[i].locationCode, keyword[k]) > -1 ? (newScore + (keyword[k].length * 1)) : (newScore);
			newScore = bmh(db.record[i].description, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.5)) : (newScore);
			newScore = bmh(db.record[i].addressLocation, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.7)) : (newScore);
			newScore = bmh(db.record[i].phoneNumber, keyword[k]) > -1 ? (newScore + (keyword[k].length * 1)) : (newScore);
			newScore = bmh(db.record[i].sector, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.1)) : (newScore);
			newScore = bmh(db.record[i].ORG, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.1)) : (newScore);
			newScore = bmh(db.record[i].costCentreCode, keyword[k]) > -1 ? (newScore + (keyword[k].length * 1)) : (newScore);
			newScore = bmh(db.record[i].entityCode, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.1)) : (newScore);
			newScore = bmh(db.record[i].INST, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.1)) : (newScore);
			newScore = bmh(db.record[i].other, keyword[k]) > -1 ? (newScore + (keyword[k].length * 0.1)) : (newScore);

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

function Record(healthDistrict, cerner, locationCode, description, addressLocation, 
	phoneNumber, sector, org, costCentreCode, entityCode, inst, other) {
	this.LHD = healthDistrict;
	this.cerner = cerner;
	this.locationCode = locationCode;
	this.description = description;
	this.addressLocation = addressLocation;
	this.phoneNumber = phoneNumber;
	this.sector = sector;
	this.ORG = org;
	this.costCentreCode = costCentreCode;
	this.entityCode = entityCode;
	this.INST = inst;
	this.other = other;
};

function ResultCard(record) {
	var _element = template.load('result-card');

	var createField = function (query, recordField) {
		var _export = _element.querySelector(query);
		_export.content = _export.querySelector('span');
		_export.content.innerHTML = recordField.replace(/\n/g, "<br />");
		if(recordField.isNullOrEmpty()) {
			_export.classList.add('hide');
		}
		return _export;
	};

	this.lhd = 			createField('.lhd', record.LHD);
	this.cerner = 		createField('.cerner', record.cerner);
	this.code = 		createField('.locationCode', record.locationCode);
	this.description = 	createField('.description', record.description);
	this.address = 		createField('.addressLocation', record.addressLocation);
	this.contact = 		createField('.phoneNumber', record.phoneNumber);
	this.sector = 		createField('.sector', record.sector);
	this.org =  		createField('.org', record.ORG);
	this.costCode = 	createField('.costCentreCode', record.costCentreCode);
	this.entityCode = 	createField('.entityCode', record.entityCode);
	this.inst = 		createField('.inst', record.INST);
	this.other = 		createField('.other', record.other);

	this.sector.classList.add('hide');
	this.org.classList.add('hide');
	this.costCode.classList.add('hide');
	this.entityCode.classList.add('hide');
	this.inst.classList.add('hide');

	this.anchor	= _element.querySelector('a');
	this.anchor.id = String.hashCode(record.locationCode);

    return _element;
}