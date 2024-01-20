const cheerio = require("cheerio");

function fixUrls(HtmlData, site) {

  var $ = cheerio.load(HtmlData);

  // Iterate over <link> tags to use absolute URLs
  $("link").map(function (i, el) {

    var hrefSrc = $(this).attr("href");

    if (hrefSrc.indexOf("http") == -1) {
      // Prepend the site path to the 'src' attr
      $(this).attr("href", site + hrefSrc);
    } 
    
  });

  // Iterate over <a> tags to use relative file paths
  $("a").map(function (i, el) {

      var hrefSrc = $(this).attr("href");

      if (hrefSrc.indexOf("http") == -1) {
        // Prepend the site path to the 'src' attr
        $(this).attr("href", site + hrefSrc);
      } 
      
  });

  // Iterate over <img> tags to look for relative 'src' paths
  $("img").map(function (i, el) {
  // Get the 'src' attr for the image
    var imgsrc = $(this).attr("src");
    // Crudely see if the path is relative or absolute
    if (imgsrc.indexOf("http") == -1) {
    // Prepend the site path to the 'src' attr
      $(this).attr("src", site + imgsrc);
    }
  });

  return $.html();
}

module.exports = { fixUrls };