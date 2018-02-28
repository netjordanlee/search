function Exception(message) {
	this.name = "Exception";
	this.message = message ? (this.name + ": " + message) : (this.name + ": Unspecified exception.")
	this.stack = (new Error().stack);
}
Exception.prototype = Error.prototype;

function BadQueryException(message) {
	this.name = "BadQueryException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": The query string was rejected for an unspecified reason.");
	this.stack = (new Error().stack);
}
BadQueryException.prototype = Error.prototype;

function NullResultsException(message) {
	this.name = "NullResultsException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": The query returned no results.");
	this.stack = (new Error().stack);
}
NullResultsException.prototype = Error.prototype;

function ResultsPageOutOfBoundsException(message) {
	this.name = "ResultsPageOutOfBoundsException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": Attempted to access a page of results that doesn't exist.");
	this.stack = (new Error().stack);
}
ResultsPageOutOfBoundsException.prototype = Error.prototype;

function XHRNotSupportedException(message) {
	this.name = "XHRNotSupportedException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": This browser does not support XMLHTTPRequests.")
	this.stack = (new Error().stack);
}
XHRNotSupportedException.prototype = Error.prototype;

function XHRException(message) {
	this.name = "XHRException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": The XMLHTTPRequest retuend an error.")
	this.stack = (new Error().stack);
}
XHRException.prototype = Error.prototype;

function InvalidSchemaException(message) {
	this.name = "InvalidSchemaException";
	this.message = message ? (this.name + ": " + message) : (this.name + ": Unable to parse schema, it may be formatted incorrectly, corrupted or unavailable.")
	this.stack = (new Error().stack);
}
XHRException.prototype = Error.prototype;
