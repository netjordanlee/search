/* GLOBAL VARIABLES */
var db = [];
var results = [];
var timer;
var currentPage = 0;
var ctrlDown = false; //To enable keyboard shortcuts for copying
var qs;

// keep focus on search box when typing
$(document).keydown(function(e) {

  if (e.keyCode == 17) { ctrlDown = true;
    return; }
  if (ctrlDown && e.keyCode == 67 || ctrlDown && e.keyCode == 86 || ctrlDown && e.keyCode == 88) {
    return; }

  // esc code to clear search and focus on search box
  if (e.keyCode == 27) { // escape key maps to keycode `27`
    e.preventDefault();

    $('.search').val('');
    searchIsEmpty();
    clearResults();

    $('.search').focus();
  }

  $('.search').focus();

  $('html, body').animate({
    scrollTop: $("body").offset().top
  }, 333);
});


// grave accent / ñ (~/`) to focus on search box
$(document).keydown(function(e) {

  if (e.keyCode == 17) { ctrlDown = true;
    return; }

  if (e.keyCode == 192) { // grave accent / ñ (~/`) key maps to keycode `192`
    e.preventDefault();

    $('.search').focus();
  }
});


$(document).keyup(function(e) {
  if (e.keyCode == 17) { ctrlDown = false;
    return; }
});


$(document).ready(function() {
  displayLoading(true);

  fetchDatabase();
  readURL();

  $("body").delay(666).fadeIn(333);

  $('.search').on('keyup', function(e) {
    clearTimeout(timer);

    if (e.keyCode == 27) { // escape key maps to keycode `27` - code to clear search
      e.preventDefault();
      clearResults();
      searchIsEmpty();
    } else if ($('.search').val().length > 1) {
      displayLoading(true);
      timer = setTimeout("search($('.search').val())", 666);
      searchIsFull();
    } else {
      clearResults();
      searchIsEmpty();
    }
  });

  $('input[type="checkbox"]').on('change', function(e) { // All checkboxes trigger search on change
    clearTimeout(timer);

    if ($('.search').val().length > 1) {
      timer = setTimeout("search($('.search').val())", 666);
      searchIsFull();
    } else {
      clearResults();
      searchIsEmpty();
    }
  });
  displayLoading(false);
});


function searchIsFull() {
  if (document.getElementById("chk-match-all").checked && document.getElementById("chk-match-phrase").checked) {
    window.history.pushState( {} , '', '?p=1&k=1&q=' + $('.search').val());
  } else if (document.getElementById("chk-match-all").checked) {
    window.history.pushState( {} , '', '?p=0&k=1&q=' + $('.search').val());
  } else if (document.getElementById("chk-match-phrase").checked) {
    window.history.pushState( {} , '', '?p=1&k=0&q=' + $('.search').val());
  } else {
    window.history.pushState( {} , '', '?p=0&k=0&q=' + $('.search').val());
  }
}


function searchIsEmpty() {
  if (document.getElementById("chk-match-all").checked && document.getElementById("chk-match-phrase").checked) {
    window.history.pushState( {} , '', '?p=1&k=1&q=0');
  } else if (document.getElementById("chk-match-all").checked) {
    window.history.pushState( {} , '', '?p=0&k=1&q=0');
  } else if (document.getElementById("chk-match-phrase").checked) {
    window.history.pushState( {} , '', '?p=1&k=0&q=0');
  } else {
    window.history.pushState( {} , '', '?p=0&k=0&q=0');
  }
}


function trim(x) {
  return x.replace(/^\s+|\s+$/gm, '');
}


function readURL() {
  var qs = (function(a) {
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
    return b;
  })(window.location.search.substr(1).split('&'));


  if (!qs["q"]) {
    $('.search').val("");
    displayLoading(false);
  } else if (qs["q"] && qs["q"] != "0") {
    clearTimeout(timer);
    $('.search').val(qs["q"]);
    $('.search').val(qs["q"]);
    displayLoading(true);
    timer = setTimeout("search($('.search').val())", 666);
  } else {
    $('.search').val("");
    displayLoading(false);
  }


  if (!qs["k"]) {
    //
    } else if (qs["k"] && qs["k"] == "1") {
      document.getElementById("chk-match-all").checked = true;
    } else if (qs["k"] && qs["k"] == "0") {
      document.getElementById("chk-match-all").checked = false;
  }

  if (!qs["p"]) {
    //
    } else if (qs["p"] && qs["p"] == "1") {
      document.getElementById("chk-match-phrase").checked = true;
    } else if (qs["p"] && qs["p"] == "0") {
      document.getElementById("chk-match-phrase").checked = false;
  }
};

function fetchDatabase() {
  var xml;
  var xhttp;

  if ('ActiveXObject' in window) {
    xhttp = new ActiveXObject("Microsoft.XMLHTTP"); //IE w/ FS Access
  } else if (window.XMLHttpRequest) {
    xhttp = new XMLHttpRequest();
  } else {
    document.getElementsByTagName("body").innerHTML = "<p>Your browser does not support the necessary \"XHR\" technology to run this web app.</p>";
  }

  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4) {
      var parser = new DOMParser();
      try {
        xml = parser.parseFromString(xhttp.responseText.replace(/^\s+|\s+$/g, ''), "text/xml").getElementsByTagName("entry");
      } catch (e) {
        console.log("XML parsing error.");
        return;
      };

      for (var i = 0; i < xml.length; i++) {
        db[i] = {
          LHD: xml[i].getElementsByTagName("LHD")[0].textContent,
          Cerner: xml[i].getElementsByTagName("Cerner")[0].textContent,
          LocationCode: xml[i].getElementsByTagName("LocationCode")[0].textContent,
          Description: xml[i].getElementsByTagName("Description")[0].textContent,
          AddressLocation: xml[i].getElementsByTagName("AddressLocation")[0].textContent,
          PhoneNumber: xml[i].getElementsByTagName("PhoneNumber")[0].textContent,
          Sector: xml[i].getElementsByTagName("Sector")[0].textContent,
          ORG: xml[i].getElementsByTagName("ORG")[0].textContent,
          CostCentreCode: xml[i].getElementsByTagName("CostCentreCode")[0].textContent,
          EntityCode: xml[i].getElementsByTagName("EntityCode")[0].textContent,
          INST: xml[i].getElementsByTagName("INST")[0].textContent,
          Other: xml[i].getElementsByTagName("Other")[0].textContent,
        };
      }

      xhttp = null;
    }
  };

  xhttp.open("GET", "./db.xml", true);
  xhttp.send();
}


function boyer_moore_horspool(haystack, needle) {
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


function search(query) {
  displayLoading(true);
  clearResults();

  var keyword = document.getElementById("chk-match-phrase").checked ? [query.trim()] : query.trim().split(" ");
  // keyword.push(query.trim());

  if (keyword.length > 5) {
    $("#output").html("<div class='infobar'><div /> Please use a maximum of 5 keywords!</div>");
    displayLoading(false);
    return;
  }

  for (var i = 0; i < db.length; i++) {
    var score = 0;
    for (var j = 0; j < keyword.length; j++) {
      var oldScore = score;

      // bmh() returns -1 for zero  matches and 1+ for matches
      // if bmh() matches, score = score + length of keyword matched, else score = score (no change)
      score = boyer_moore_horspool(db[i].LHD, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].Cerner, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].LocationCode, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].Description, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].AddressLocation, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].PhoneNumber, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].Sector, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].ORG, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].CostCentreCode, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].EntityCode, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].INST, keyword[j]) > -1 ? (score + keyword.length) : (score);
      score = boyer_moore_horspool(db[i].Other, keyword[j]) > -1 ? (score + keyword.length) : (score);

      if (score == oldScore && document.getElementById("chk-match-all").checked) { //If match all, on the first keyword miss...
        score = 0;
        break; //Guarantee item won't be added to results and don't check any more keywords
      }
    }

    if (score > 0) { //One or more matches
      results.push([i, score]); //Add to results (i = db id)
    }
  }

  results.sort(function(a, b) {
    if (a[1] === b[1]) {
      return 0;
    } else {
      return (a[1] > b[1]) ? -1 : 1;
    }
  });

  displayResults();
}


function displayResults(fromPage) {
  if (typeof(fromPage) === "undefined") { fromPage = 0 } else { fromPage; } //By default display page "0"
  // if (typeof(currentPage) === "undefined") { currentPage = 0 } else { currentPage; }

  displayLoading(false);

  var htmlOutput = "";

  // PAGINATION /////////////////////////////////////////////////////////////////////////////////

  var totalPages = Math.ceil(results.length / 10);
  var pageLimit = 0;
  var htmlPages = "";

  if (results.length == 0) {
    htmlOutput = '<li class="no-results"><p style="transform: rotate(90deg); font-size: 8.333vw; font-family: Arial, sans-serif; pointer-events: none;">:(</p>'
    if (document.getElementById("chk-match-all").checked && document.getElementById("chk-match-phrase").checked) {
      htmlOutput += '<p>We couldn\'t find what you are looking for,<br/>have you tried turning off "Match Phrase" or "Match All Keywords"?</p>';
    } else if (document.getElementById("chk-match-all").checked) {
      htmlOutput += '<p>We couldn\'t find what you are looking for,<br/>have you tried turning off "Match All Keywords"?</p>';
    } else if (document.getElementById("chk-match-phrase").checked) {
      htmlOutput += '<p>We couldn\'t find what you are looking for,<br/>have you tried turning off "Match Phrase"?</p>';
    } else {
      htmlOutput += '<p>We couldn\'t find what you are looking for.</p>';
    }
    htmlOutput += '<br/><p>If you think we\'re missing something, you can submit a <a href="#0" class="shade extra-item" onclick="SendMissingEntry()">missing entry report...</a></p></li>';

    $("#output").html(htmlOutput);
    return;
  }

  if (fromPage > totalPages - 1) {
    return; }
  if (fromPage < 0) {
    return; }

  $('html, body').animate({
    scrollTop: $("body").offset().top
  }, 333);

  currentPage = fromPage;
  console.log("DISPLAY PAGE: " + currentPage);

  var comboPages = document.getElementById("combo-pages");
  comboPages.innerHTML = "";

  for (var p = 0; p < totalPages; p++) {
    var comboPagesOption = document.createElement("option");
    comboPagesOption.text = String.format("- Page {0} of {1} -", p + 1, totalPages);
    comboPagesOption.value = p;
    if (currentPage == p) { comboPagesOption.selected = true; }
    comboPages.add(comboPagesOption);
  }

  // visually enable/disable pagination based on number of pages for accessibility
  var btnPrev = document.getElementById("btn-prev");
  var btnNext = document.getElementById("btn-next");

  btnPrev.setAttribute("disabled", "true");
  comboPages.setAttribute("disabled", "true");
  btnNext.setAttribute("disabled", "true");

  if (currentPage == 0 && totalPages > 1) {
    console.log("first page");
    btnPrev.setAttribute("disabled", "true");
    comboPages.removeAttribute("disabled");
    btnNext.removeAttribute("disabled");
  } else if (currentPage == totalPages - 1 && totalPages > 1) {
    console.log("last page");
    btnPrev.removeAttribute("disabled");
    comboPages.removeAttribute("disabled");
    btnNext.setAttribute("disabled", "true");
  } else if (currentPage == 0 && totalPages == 1) {
    console.log("first page is also last page");
    btnPrev.setAttribute("disabled", "true");
    comboPages.setAttribute("disabled", "true");
    btnNext.setAttribute("disabled", "true");
  } else {
    console.log("inbetween pages");
    btnPrev.removeAttribute("disabled");
    comboPages.removeAttribute("disabled");
    btnNext.removeAttribute("disabled");
  }

  // RESULT CARDS ///////////////////////////////////////////////////////////////////////////////

  var lastResult = results.length < 10 + (currentPage * 10) ? results.length : 10 + (currentPage * 10);

  for (var i = (currentPage * 10); i < lastResult; i++) {

    var k = results[i][0];

    //Open Card
    htmlResultCard = '<li class="shade">' +
                     '<table>' +
                     '<tbody>';

    // If entry is null/empty/whitespace add hide class, else add show class (show is an empty class)
    htmlResultCard += String.format('<tr class="{1}"><td>LHD:</td><td>{0}</td></tr>', db[k].LHD.replace(/\n/g, "<br />"), (db[k].LHD.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1}"><td>Cerner:</td><td>{0}</td></tr>', db[k].Cerner.replace(/\n/g, "<br />"), (db[k].Cerner.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1}"><td>Code:</td><td>{0}</td></tr>', db[k].LocationCode.replace(/\n/g, "<br />"), (db[k].LocationCode.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1}"><td>Description:</td><td>{0}</td></tr>', db[k].Description.replace(/\n/g, "<br />"), (db[k].Description.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1}"><td>Address:</td><td>{0}</td></tr>', db[k].AddressLocation.replace(/\n/g, "<br />"), (db[k].AddressLocation.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1}"><td>Contact:</td><td>{0}</td></tr>', db[k].PhoneNumber.replace(/\n/g, "<br />"), (db[k].PhoneNumber.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1} hidden"><td>Sector:</td><td>{0}</td></tr>', db[k].Sector.replace(/\n/g, "<br />"), (db[k].Sector.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1} hidden"><td>ORG:</td><td>{0}</td></tr>', db[k].ORG.replace(/\n/g, "<br />"), (db[k].ORG.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1} hidden"><td>CostCentreCode:</td><td>{0}</td></tr>', db[k].CostCentreCode.replace(/\n/g, "<br />"), (db[k].CostCentreCode.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1} hidden"><td>EntityCode:</td><td>{0}</td></tr>', db[k].EntityCode.replace(/\n/g, "<br />"), (db[k].EntityCode.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1} hidden"><td>INST:</td><td>{0}</td></tr>', db[k].INST.replace(/\n/g, "<br />"), (db[k].INST.isNullOrEmpty()) ? "hide" : "show");
    htmlResultCard += String.format('<tr class="{1}"><td>Other:</td><td>{0}</td></tr>', db[k].Other.replace(/\n/g, "<br />"), (db[k].Other.isNullOrEmpty()) ? "hide" : "show");
    // htmlResultCard += String.format('<tr class="{1}"><td>Score:</td><td>{0}</td></tr>', db[k].score.replace(/\n/g, "<br />"), (db[k].score.isNullOrEmpty()) ? "hide" : "show");

    //Close Card
    // htmlResultCard += '<tr><td></td><td>' + '<a class="extra-item search-description" title="Search Description in Google Search..." href=\"http:\/\/google.com/search?q=' + encodeURIComponent(db[k].Description) + '\" target=\"_blank\">Search More...</a>' + '<a class="extra-item map-address" title="Search Address in Google Maps..." href=\"http:\/\/maps.google.com/maps?q=' + encodeURIComponent(db[k].AddressLocation) + '\" target=\"_blank\">Open Map...</a>' + '<a class="extra-item raise-ticket" title="Report a Problem or Request to Update Entries For This Contact..." href=\"#0\" onclick=\"SendTroubleTicket(' + k + ')\">Update Details...</a>' + '</td></tr>' + '</tbody>' + '</table>' + '</li>' + '<br \/><hr class="hr-styling"\/><br \/>';

    htmlResultCard += '<tr><td></td><td>' +
                      '<br/>' +
                      '<a class="extra-item search-description shade" title="Search Description on the Wold Wide Web..." href=\"http:\/\/google.com/search?q=' + encodeURIComponent(db[k].Description) + '\" target=\"_blank\">More Info</a>' +
                      '<a class="extra-item map-address shade" title="Open Address in Maps..." href=\"http:\/\/maps.apple.com/maps?q=' + encodeURIComponent(db[k].AddressLocation) + '\" target=\"_blank\">View Map</a>' +
                      '<a class="extra-item raise-ticket shade" title="Share this Contact Card by Email..." href=\"#0\" onclick=\"emailURLLink(' + k + ')\">Share Card</a>' +
                      '<a class="extra-item raise-ticket shade" title="Report a Problem or Request to Update Entries For This Contact Card..." href=\"#0\" onclick=\"SendTroubleTicket(' + k + ')\">Update Details</a>' +
                      '</td></tr>' +
                      '</tbody>' +
                      '</table>' +
                      '</li>';

    // htmlResultCard.replace("hide", "show"); //Easily disable hiding empty elements

    htmlOutput += htmlResultCard;
  }

  $("#output").html(htmlOutput);
}


function clearResults() {
  results = [];
  $("#output").html("");
  var comboPages = document.getElementById("combo-pages");
  comboPages.innerHTML = "";
  $('#output').empty();
  displayLoading(false);
}


function displayLoading(toggle) {
  //TODO: Clean this up, use CSS to position elements instead of javascript
  // fix content position on load
  var menuHeight = $("#table-header").height();
  if (menuHeight > "160px") {
    $(".content").css("top", menuHeight);
  }

  $("#loading").remove();

  if (toggle) {
    $(".content").append("<div id='loading' class='loading-overlay' style='height: 100%; opacity: 1; pointer-events: auto;'><div class='spinner'></div></div>");

    $("#loading").css("height", "100%").css("opacity", "1").css("pointer-events", "auto");
  }
  if (!toggle) {
    $("#loading").css("opacity", "0").css("pointer-events", "none");

    $("#loading").one("webkitTransitionEnd msTransitionEnd transitionend", function(e) {
      if ('ActiveXObject' in window) {
        $("#loading").css("height", "0"); // Hack for IE10 pointer-events issue
      }
    });

    $("#loading").remove();
  }
}


function emailURLLink(id) {
    // console.log(db[id]);

    var shareSubject = encodeURIComponent(document.title) + " > " + encodeURIComponent($('.search').val()) + " > " + encodeURIComponent(db[id].Description);
    var destinationShareSubject = ("?subject=" + shareSubject);
    // var shareMessage = encodeURIComponent(location.href);

    var shareMessage = String.format(
      'Hello,%0D%0A%0D%0A' +
      '%09{3} is located at {4}.%0D%0A' +
      '%09You can contact {3} on {5}.%0D%0A' +
      '%09Their {1} Cerner Code is {2} and they are part of the {0}.%0D%0A' +
      '%09Notes: {11}%0D%0A%0D%0A' +
      'Source: ' + encodeURIComponent(location.href) + '%0D%0A',
      encodeURIComponent(db[id].LHD), encodeURIComponent(db[id].Cerner), encodeURIComponent(db[id].LocationCode), encodeURIComponent(db[id].Description),
      encodeURIComponent(db[id].AddressLocation), encodeURIComponent(db[id].PhoneNumber), encodeURIComponent(db[id].Sector), encodeURIComponent(db[id].ORG),
      encodeURIComponent(db[id].CostCentreCode), encodeURIComponent(db[id].EntityCode), encodeURIComponent(db[id].INST), encodeURIComponent(db[id].Other)
    );

    var destinationShareMessage = ("&body=" + shareMessage + "%0D%0A");

    var emailString = ("mailto:" + destinationShareSubject + destinationShareMessage);
    window.location.href = emailString
};


function SendTroubleTicket(id) {
  var mail_to = "laith.serhan@health.nsw.gov.au";
  var mail_subject = String.format("Trouble Ticket - {0}:{1}", (new Date()).yymmdd(), id);
  var mail_body = String.format(
    '-----// In This Field, Make The Appropriate Changes To The Record. //-----%0D%0A%0D%0A' + 'LHD: {0}%0D%0A' + 'Cerner: {1}%0D%0A' + 'LocationCode: {2}%0D%0A' + 'Description: {3}%0D%0A' + 'AddressLocation: {4}%0D%0A' + 'PhoneNumber: {5}%0D%0A' + 'Sector: {6}%0D%0A' + 'ORG: {7}%0D%0A' + 'CostCentreCode: {8}%0D%0A' + 'EntityCode: {9}%0D%0A' + 'INST: {10}%0D%0A' + 'Other: {11}%0D%0A%0D%0A' + 'Comments: Your comments here...%0D%0A%0D%0A%0D%0A' + '-----// DO NOT EDIT BELOW THIS LINE //-----%0D%0A%0D%0A' + 'LHD: {0}%0D%0A' + 'Cerner: {1}%0D%0A' + 'LocationCode: {2}%0D%0A' + 'Description: {3}%0D%0A' + 'AddressLocation: {4}%0D%0A' + 'PhoneNumber: {5}%0D%0A' + 'Sector: {6}%0D%0A' + 'ORG: {7}%0D%0A' + 'CostCentreCode: {8}%0D%0A' + 'EntityCode: {9}%0D%0A' + 'INST: {10}%0D%0A' + 'Other: {11}%0D%0A%0D%0A',
    encodeURIComponent(db[id].LHD), encodeURIComponent(db[id].Cerner), encodeURIComponent(db[id].LocationCode), encodeURIComponent(db[id].Description),
    encodeURIComponent(db[id].AddressLocation), encodeURIComponent(db[id].PhoneNumber), encodeURIComponent(db[id].Sector), encodeURIComponent(db[id].ORG),
    encodeURIComponent(db[id].CostCentreCode), encodeURIComponent(db[id].EntityCode), encodeURIComponent(db[id].INST), encodeURIComponent(db[id].Other));

  // window.open(String.format("mailto:{0}?subject={1}&body={2}", mail_to, mail_subject, mail_body), "_blank");
  // window.location(String.format("mailto:{0}?subject={1}&body={2}", mail_to, mail_subject, mail_body));
  window.location.href = (String.format("mailto:{0}?subject={1}&body={2}", mail_to, mail_subject, mail_body));
}

function SendMissingEntry() {
  var mail_to = "laith.serhan@health.nsw.gov.au";
  var mail_subject = String.format("Trouble Ticket - {0}:NEW", (new Date()).yymmdd());
  var mail_body = String.format(
    '-----// In This Field, Fill Out What You Know About The Missing Record //-----%0D%0A%0D%0A' + 'LHD: %0D%0A' + 'Description: %0D%0A' + 'AddressLocation: %0D%0A' + 'PhoneNumber: %0D%0A' + 'Sector: %0D%0A' + 'ORG: %0D%0A' + 'Comments: %0D%0A%0D%0A');

  // window.open(String.format("mailto:{0}?subject={1}&body={2}", mail_to, mail_subject, mail_body), "_blank");
  // window.location(String.format("mailto:{0}?subject={1}&body={2}", mail_to, mail_subject, mail_body));
  window.location.href = (String.format("mailto:{0}?subject={1}&body={2}", mail_to, mail_subject, mail_body));
}
