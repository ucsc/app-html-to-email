const express = require("express");
const router = express.Router();
const inlineCss = require("inline-css");
const { fixUrls } = require('../helpers/urls');

/**
 * Redirect a domain to a different destination
 * @param {string} url - the URL of the page we want to prep for send.
 * @returns {string} - HTML code
 */
router.get("/*", async (req, res) => {

  if (req.query.url) {
    
    const { url } = req.query;
    const site = new URL(url);

    if (site.hostname.endsWith('ucsc.edu')) {
      
      try {
        const response = await fetch(url);
        const data = await response.text();
        const html = fixUrls(data, site.origin);

        inlineCss(html, { url: site.origin, removeLinkTags: false }).then(function(html) {
          res.send(`<h2 style="text-align:center;margin:2rem auto;">Code</h2><div style="margin:1rem auto; width:50%;"><textarea rows="10" style="width:100%;">${html}</textarea></div><h2 style="text-align:center;margin:2rem auto;">Preview</h2>${html}`);  
        }).catch(function (err) {
          console.log("Error: " + err);
        });        
      } catch (error) {
          res.status(404).send(`Unable to fetch URL or prepare the code: ${error.message}`);
      }
    
    } else {
        req.flash('info', `Your URL must be a ucsc.edu address`);
        res.render('index', { title: 'Email Preparer' });
    }  

  } else {
    res.render('index', { title: 'Email Preparer' });
  
  }
});

module.exports = router;
