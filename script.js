jQuery.loadScript = function (url, callback) {
  jQuery.ajax({
      url: url,
      dataType: 'script',
      success: callback,
      async: true
  });
}

$.loadScript("https://code.jquery.com/jquery-1.10.2.js", function() {
  //do stuff
});

$(function(){
  $("#nav-placeholder").load("index.html");
});