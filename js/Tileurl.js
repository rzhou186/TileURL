/* Constructor: Tileurl
 * --------------------
 * Handles all logic for a single TileURL. Takes in
 * the ID of the TileURL element, and updates its 
 * webpage element dynamically as its URL text input
 * changes.
 */
function Tileurl(tileurlId) {
  this.elem = $("#" + tileurlId);
  this.iframeElem = this.elem.find("iframe");
  this.urlElem = this.elem.find("input.url");

  var that = this;
  this.urlElem.keyup(function() {
    that.update();
  });
  this.update();
}

/* Method: Tileurl.prototype.update
 * --------------------------------
 * Extracts the current value of the URL text input
 * element, then loads the associated webpage.
 */
Tileurl.prototype.update = function() {
  this.iframeElem.attr("src", 
    this.urlElem.val()
  );
}
