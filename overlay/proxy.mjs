import http from 'node:http'
import { parse as parseUrl } from 'node:url'

const PORT = 3002
const FRONTEND = '127.0.0.1'
const FRONTEND_PORT = 3001
const BACKEND = '127.0.0.1'
const BACKEND_PORT = 3000

const headInject =
  '<style>img[src="/logo.png"],img[alt="logo"],img[alt="徽标"]{display:none!important}.text-xl.font-medium{display:none!important}</style>'

const injectJs =
  '<script>document.addEventListener("click",function(e){var a=e.target.closest("a");if(a&&a.textContent.trim()==="\u4e3b\u9875"&&a.getAttribute("href")==="/"){e.preventDefault();e.stopPropagation();window.location.href="http://localhost:5678/"}},true);document.querySelectorAll("p,span").forEach(function(e){var t=e.textContent||"";if(t.indexOf("\u00a9")!==-1&&t.indexOf("\u7248\u6743\u6240\u6709")!==-1)e.style.display="none"})</script>'

function isHtmlResponse(headers) {
  const ct = headers['content-type'] || ''
  return ct.includes('text/html')
}

function inject(html) {
  return html.replace('</head>', `${headInject}</head>`).replace('</body>', `${injectJs}</body>`)
}

function handleProxy(proxyReq, res, targetHost, targetPort) {
  const reqOpts = parseUrl(proxyReq.url)
  const options = {
    hostname: targetHost,
    port: targetPort,
    path: reqOpts.path,
    method: proxyReq.method,
    headers: { ...proxyReq.headers, 'accept-encoding': 'identity', host: `${targetHost}:${targetPort}` },
  }

  const preq = http.request(options, (pres) => {
    if (!isHtmlResponse(pres.headers)) {
      res.writeHead(pres.statusCode, pres.headers)
      pres.pipe(res)
      return
    }

    const headers = { ...pres.headers }
    delete headers['content-length']
    res.writeHead(pres.statusCode, headers)

    let data = ''
    pres.on('data', (c) => (data += c))
    pres.on('end', () => {
      res.end(inject(data))
    })
  })

  preq.on('error', () => {
    res.writeHead(502)
    res.end()
  })

  proxyReq.pipe(preq)
}

const server = http.createServer((req, res) => {
  const pathname = parseUrl(req.url).pathname

  if (req.headers.upgrade === 'websocket') {
    handleProxy(req, res, FRONTEND, FRONTEND_PORT)
    return
  }

  if (pathname.startsWith('/api/')) {
    handleProxy(req, res, BACKEND, BACKEND_PORT)
    return
  }

  handleProxy(req, res, FRONTEND, FRONTEND_PORT)
})

server.listen(PORT, '0.0.0.0', () => {
  console.log('overlay proxy ready on http://localhost:' + PORT)
})