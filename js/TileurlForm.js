/* Constructor: TileurlForm
 * ------------------------
 * Handles all logic for the TileURL submission form.
 * Takes in the ID of the form element, and an array
 * of IDs for the TileURL elements to be submitted.
 * Overwrites the default submission behavior for the
 * form.
 */
function TileurlForm(tileurlFormId, tileurlIds) {
  this.elem = $("#" + tileurlFormId);
  var that = this;
  this.elem.submit(function(e) {
    e.preventDefault();
    that.submit(tileurlIds);
  });
}

/* Method: TileurlForm.prototype.submit
 * ------------------------------------
 * Takes in an array of IDs for the TileURL elements
 * to be submitted. Extracts data from the form 
 * element and the TileURL elements, then runs that
 * data through validations. Submits via AJAX if all
 * validations pass.
 */
TileurlForm.prototype.submit = function(tileurlIds) {
  var sid = this.elem.find("[name='sid']").val();
  var urls = this.extractUrls(tileurlIds);
  if (this.failsValidations(sid, urls)) {
    // Display some kind of error.
    return;
  }

  $.post("/new", {
    "data": JSON.stringify({
      "sid": sid,
      "urls": urls
    })
  }, function(state) {
    // Display some kind of error or redirect.
  });
}

/* Method: TileurlForm.prototype.extractUrls
 * -----------------------------------------
 * Takes in an array of IDs for the TileURL elements
 * to be submitted. Returns the array of the URL text 
 * inputs entered for these elements.
 */
TileurlForm.prototype.extractUrls = function(tileurlIds) {
  var urls = [];
  for (var i=0; i<tileurlIds.length; i++) {
    var tileurlElem = $("#" + tileurlIds[i]);
    urls[i] = tileurlElem.find("input.url").val();
  }
  return urls;
}

/* Method: TileurlForm.prototype.failsValidations
 * ----------------------------------------------
 * Takes in the necessary submission data and returns
 * returns true if any of it is blank. Returns false
 * otherwise.
 */
TileurlForm.prototype.failsValidations = function(sid, urls) {
  if (!sid) return true;
  for (var i=0; i<urls.length; i++)
    if (!urls[i]) return true;
  return false;
}
