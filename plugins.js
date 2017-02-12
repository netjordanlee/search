var doc = document.documentElement;
doc.setAttribute('data-useragent', navigator.userAgent);

// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

// Date formatting
if(!Date.yymmdd) {
    Date.prototype.yymmdd = function() {
        var mm = this.getMonth() + 1; // getMonth() is zero-based
        var dd = this.getDate();
        var hh = this.getHours();

        return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
    }
}

// String formatting
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

//String is null or empty method
if (!String.isNullOrEmpty) {
    String.prototype.isNullOrEmpty = function() {
        if (this == null || this == "null" || this == "" || this.replace(" ", "") == "") {
            return true;
        } else {
            return false;
        }
    }
    String.isNullOrEmpty = function(input) {
        if (input == null || this == "null" || input == "" || input.replace(" ", "") == "") {
            return true;
        } else {
            return false;
        }
    };
}
