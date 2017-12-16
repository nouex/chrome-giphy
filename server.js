'use strict';

const server = require('express')()
const proxy = require('http-proxy-middleware');
const morgan = require('morgan');
const url = require('url')
const querystring = require('querystring');
const serveStatic = require('serve-static')

const API_KEY = process.env.API_KEY
require("assert").ok(API_KEY)
const PORT = parseInt(process.env.PORT, 10) || 8080
require("assert").ok(PORT)

server.use(morgan("tiny"))
server.use(serveStatic('build', {'index': ['index.html', 'index.htm']}))
server.use("/v1", function (req, _, next) {
    /**
     * NOTE: node-http-proxy used by http-proxy-middleware does not look at
     *  req.query or req.params, it does however use req.originalUrl to pass
     *  the url params over to the target.  Quite inconvenient but I didn't
     *  find any proper way to configure this.
     */
    const parsedOrigUrl = url.parse(req.originalUrl, false)
    const parsedOrigQuery = querystring.parse(parsedOrigUrl.query)
    parsedOrigQuery.api_key = API_KEY.trim()
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
  res.end("???") // TODO: respond with a file not found or sum
})

server.listen(PORT, (err) => {
  if (err) throw err
  console.log(`> Ready on http://localhost:${PORT}`)
})
