function Tileurl(tileurl_id) {
  this.element = $("#" + tileurl_id);
  this.iframe = this.element.find("iframe");
  this.url = this.element.find("input.url");

  var that = this;
  this.url.keyup(function() {
    that.update();
  });
}

Tileurl.prototype.update = function() {
  this.iframe.attr("src", this.url.val());
}
