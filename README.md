# UCSC email preparer

An app to fetch a webpage and prepare it for use as an HTML email.

## Purpose

This app fetches the HTML from a URL and "inlines" the styles so the HTML will work in an email.

We use this app to:

- Prepare Tuesday Newsday for sending.

## How this app works

1. This app is written in Javascript, using [Express][1], and it runs on Heroku.
2. It uses a [config object][2] to check that the URL comes from an allowed domain.

[1]: https://expressjs.com/
