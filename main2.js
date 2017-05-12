var Signal = signals.Signal;

var ctrlDown = false; //TODO: Move to a better place

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
		if(evt.keyCode == 17) { ctrlDown = true; return; }
		ui.search.focus();
		ui.search.show();
		//TODO: Scroll to top
	});

	document.addEventListener("keyup", function(evt) {
		if(evt.keyCode == 17) { evt.preventDefault(); ctrlDown = false; }
		if(evt.keyCode == 27) { evt.preventDefault(); ui.search.clear(); ui.search.focus(); ui.search.show(); } //ESC
		if(evt.keyCode == 192) { evt.preventDefault(); ui.search.focus(); ui.search.show(); } //GRAVE/TILDE
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
	ui.search.onUpdate.add(ui.results.clear);
	//ui.search.onSubmit.add(ui.spinner.show);
	ui.search.onUpdate.add(ui.search.btn_clear.toggle);

	db.onQuery.add(ui.results.clear);
	db.onQuery.add(ui.spinner.show);
	db.onQuery.add(ui.results.error.hide);

	db.onQueryComplete.add(ui.results.show);

	ui.results.onUpdate.add(ui.spinner.hide);
	ui.results.onClear.add(ui.spinner.hide);
	ui.results.onError.add(ui.spinner.hide);

	db.download("./db.min.xml");
});

function search(query) {
	try {
		db.query(query);
	} catch (error) {
		ui.results.error(error);
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
ui.results.error_message = (function(){var a=document.getElementById('error');a.remove();return a;})();

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

ui.search.submit = function () {
	ui.search.cancel();
	ui.search.onUpdate.dispatch(ui.search.value);
	if(ui.search.value.length > 1) {
		ui.search.timeout = setTimeout("ui.search.onSubmit.dispatch(ui.search.value);", 666);
	}
};

ui.search.cancel = function () { clearTimeout(ui.search.timeout); };

ui.search.clear = function () {
	ui.search.value = "";
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
	if(evt.keyCode == 27) { ui.search.clear(); }
	if(ctrlDown || ctrlDown && [65,67,86,88].includes(evt.keyCode)) { return; } //Select All, Cut, Copy and Paste
	//if(!ctrlDown) { ui.search.submit(); }
	ui.search.submit();
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
		ui.results.appendChild(new ResultCard(db.record[index]))
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

ui.results.error = function (message) {
	ui.results.error.show();
	ui.results.error_message.textContent = message;

	ui.results.onError.dispatch(message);
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
		console.log("Browser does not support XMLHTTPRequest");
	}

	xhttp.onreadystatechange = function () {
		if(xhttp.readyState == 4) {
			if(xhttp.status == 200 || xhttp.status == 0) {
				//HTTP OK or 0 for local fs
				db.onDownloadComplete.dispatch(xhttp.responseText);
			} else {
				console.log("Unable to download data, returned status code " + xhttp.status);
			}
		}
	}

	xhttp.open("GET", url, true);
	xhttp.send();
};

db.parse = function(xmlData) {
	var xmlDoc;
	try {
		var parser = new DOMParser();
		xmlDoc = parser.parseFromString(xmlData.replace(/^\s+|\s+$/g, ''), "text/xml").getElementsByTagName('entry');
		xmlData = null;
	} catch (e) {
		console.log(e);
		return;
	}

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
		throw "Maximum of 8 keywords";
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
			//if(hasMatchAll) {console.log(db.record[i]);};
			db.query.results.push({index:i, score:recordScore, matchPhrase:hasMatchPhrase, matchAll:hasMatchAll});
		}
	}

	if(db.query.results.length == 0) throw "No results";

	db.query.results.sort(function(a,b) {
		if(a.matchPhrase && !b.matchPhrase) { // If matchPhase bump up over all other results
			return -1;
		} else if(a.matchAll && !b.matchAll) { // If both do/don't matchPhrase but one also has matchAll, bump up
			return -1;
		} else if(a.score > b.score) {
			return -1; // If both do/don't matchPhrase/matchAll, rank on score
		} else if(a.score < b.score) {
			return 1;
		} else {
			console.log([a,b]);
			return (a.index > b.index) ? -1 : 1;
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
	var htmlResultCard;
	htmlResultCard = '<table>' +
                     '<tbody>';

    // If entry is null/empty/whitespace add hide class, else add show class (show is an empty class)
    htmlResultCard += 	String.format('<tr class="{1}"><td>LHD:</td><td>{0}</td></tr>', 					record.LHD.replace(/\n/g, "<br />"), 				(record.LHD.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1}"><td>Cerner:</td><td>{0}</td></tr>', 					record.cerner.replace(/\n/g, "<br />"), 			(record.cerner.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1}"><td>Code:</td><td>{0}</td></tr>', 					record.locationCode.replace(/\n/g, "<br />"), 		(record.locationCode.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1}"><td>Description:</td><td>{0}</td></tr>', 			record.description.replace(/\n/g, "<br />"), 		(record.description.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1}"><td>Address:</td><td>{0}</td></tr>', 				record.addressLocation.replace(/\n/g, "<br />"), 	(record.addressLocation.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1}"><td>Contact:</td><td>{0}</td></tr>', 				record.phoneNumber.replace(/\n/g, "<br />"), 		(record.phoneNumber.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1} hidden"><td>Sector:</td><td>{0}</td></tr>', 			record.sector.replace(/\n/g, "<br />"), 			(record.sector.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1} hidden"><td>ORG:</td><td>{0}</td></tr>', 				record.ORG.replace(/\n/g, "<br />"), 				(record.ORG.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1} hidden"><td>CostCentreCode:</td><td>{0}</td></tr>', 	record.costCentreCode.replace(/\n/g, "<br />"), 	(record.costCentreCode.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1} hidden"><td>EntityCode:</td><td>{0}</td></tr>', 		record.entityCode.replace(/\n/g, "<br />"), 		(record.entityCode.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1} hidden"><td>INST:</td><td>{0}</td></tr>', 			record.INST.replace(/\n/g, "<br />"), 				(record.INST.isNullOrEmpty()) ? "hide" : "show") +
    					String.format('<tr class="{1}"><td>Other:</td><td>{0}</td></tr>', 					record.other.replace(/\n/g, "<br />"), 				(record.other.isNullOrEmpty()) ? "hide" : "show");

    //Close Card
    // htmlResultCard += '<tr><td></td><td>' + '<a class="extra-item search-description" title="Search Description in Google Search..." href=\"http:\/\/google.com/search?q=' + encodeURIComponent(db[k].Description) + '\" target=\"_blank\">Search More...</a>' + '<a class="extra-item map-address" title="Search Address in Google Maps..." href=\"http:\/\/maps.google.com/maps?q=' + encodeURIComponent(db[k].AddressLocation) + '\" target=\"_blank\">Open Map...</a>' + '<a class="extra-item raise-ticket" title="Report a Problem or Request to Update Entries For This Contact..." href=\"#0\" onclick=\"SendTroubleTicket(' + k + ')\">Update Details...</a>' + '</td></tr>' + '</tbody>' + '</table>' + '</li>' + '<br \/><hr class="hr-styling"\/><br \/>';

    htmlResultCard += '<tr><td></td><td>' +
                      '<br/>' +
                      // '<a class="extra-item search-description shade" title="Search Description in Google Search..." href=\"http:\/\/google.com/search?q=' + encodeURIComponent(db[k].Description) + '\" target=\"_blank\">More Info</a>' +
                      // '<a class="extra-item map-address shade" title="Search Address in Google Maps..." href=\"http:\/\/maps.apple.com/maps?q=' + encodeURIComponent(db[k].AddressLocation) + '\" target=\"_blank\">View Map</a>' +
                      // '<a class="extra-item raise-ticket shade" title="Report a Problem or Request to Update Entries For This Contact..." href=\"#0\" onclick=\"SendTroubleTicket(' + k + ')\">Update Details</a>' +
                      '</td></tr>' +
                      '</tbody>' +
                      '</table>';

    var resultCard = document.createElement("li");
    resultCard.className = "shade";
    resultCard.innerHTML = htmlResultCard;
    return resultCard;
}