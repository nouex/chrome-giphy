'use strict';

const server = require('express')()
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const url = require('url')
const querystring = require('querystring');

const API_KEY = process.env.API_KEY
require("assert").ok(API_KEY)
const port = parseInt(process.env.PORT, 10) || 8080

server.use(morgan("tiny"))
server.use("/v1", function (req, _, next) {
    /**
     * NOTE: node-http-proxy used by http-proxy-middleware does not look at
     *  req.query or req.params, it does however use req.originalUrl to pass
     *  the url params over to the target.  Quite inconvenient but I didn't
     *  find any proper way to configure this.
     */
    const parsedOrigUrl = url.parse(req.originalUrl, false)
    const parsedOrigQuery = querystring.parse(parsedOrigUrl.query)
    parsedOrigQuery.api_key = API_KEY
    parsedOrigUrl.search = querystring.stringify(parsedOrigQuery)
    req.originalUrl = url.format(parsedOrigUrl)
    next()
  },
  proxy({
    target: 'http://api.giphy.com',
    headers: {
      Host: "api.giphy.com" }
  })
);

server.get('*', (req, res) => {
  re.end("???")
})

server.listen(port, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${port}`)
})