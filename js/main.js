$(document).ready(function() {
  new Tileurl("tileurl-left");
  new Tileurl("tileurl-right");
  new TileurlForm(
    "tileurl-form", 
    [ "tileurl-left", "tileurl-right" ]
  );
}); 
