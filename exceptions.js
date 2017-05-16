function Exception(message) {
	this.name = "Exception";
	this.message = message ? (this.name + ": " + message) : (this.name + ": Unspecified exception.")
	this.stack = (new Error().stack);
}
Exception.prototype = Error.prototype;

function BadQueryException(message) {
	this.name = "BadQueryException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": The query string was rejected for an unspecified reason.");
	this.stack = Error.prototype;
}
//BadQueryException.prototype = Error.prototype;

function NullResultsException(message) {
	this.name = "BadQueryException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": The query returned no results.");
	this.stack = Error.prototype;
}
//NullResultsException.prototype = Error.prototype;

function XHRNotSupportedException(message) {
	this.name = "XHRNotSupportedException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": This browser does not support XMLHTTPRequests.")
	this.stack = Error.prototype;
}
XHRNotSupportedException.prototype = Error.prototype;

function XHRException(message) {
	this.name = "XHRException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": The XMLHTTPRequest retuend an error.")
	this.stack = Error.prototype;
}
XHRException.prototype = Error.prototype;