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
	console.log(xmlData);
	var xmlDoc;
	try {
		var parser = new DOMPaster();
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
	var keyword = [query];
	keyword.concat(query.trim().split(' '));

	if(keyword.length > 8) {
		throw "Maximum of 8 keywords";
	}

	for (var i = 0; i < db.record.length; i++) {
		var recordScore = 0;
		for (var k = 0; k < keyword.length; k++) {
			var keywordScore = recordScore;

			keywordScore = bmh(db.record[i].LHD, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.1)) : (keywordScore);
			keywordScore = bmh(db.record[i].cerner, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.1)) : (keywordScore);
			keywordScore = bmh(db.record[i].locationCode, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 1)) : (keywordScore);
			keywordScore = bmh(db.record[i].description, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.5)) : (keywordScore);
			keywordScore = bmh(db.record[i].addressLocation, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.7)) : (keywordScore);
			keywordScore = bmh(db.record[i].phoneNumber, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 1)) : (keywordScore);
			keywordScore = bmh(db.record[i].sector, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.1)) : (keywordScore);
			keywordScore = bmh(db.record[i].ORG, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.1)) : (keywordScore);
			keywordScore = bmh(db.record[i].costCentreCode, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 1)) : (keywordScore);
			keywordScore = bmh(db.record[i].entityCode, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.1)) : (keywordScore);
			keywordScore = bmh(db.record[i].INST, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.1)) : (keywordScore);
			keywordScore = bmh(db.record[i].other, keyword[k]) > -1 ? (keywordScore + (keyword[k].length * 0.1)) : (keywordScore);

			keywordScore = (k=0) ? keywordScore*10 : keywordScore; // If match phrase

			// if(keywordScore == recordScore && ui.search.chk_match_all.checked) {
			// 	keywordScore = 0;
			// 	break;
			// }
		}

		if(recordScore > 0) {
			db.query.results.push({index:i, score:recordScore});
		}
	}

	if(results.length == 0) throw "No results";

	db.query.results.sort(function(a,b) {
		if(a.score === b.score) return 0;
		return (a.score > b.score) ? -1 : 1;
	});


	db.onQueryComplete.dispatch();
};

db.query.results = [];

db.searchOptions = {
	MATCH_PHRASE : 0,
	MATCH_ALL: 1
};

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