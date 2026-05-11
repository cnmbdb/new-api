setTimeout(function () {
  document.querySelectorAll('p, span').forEach(function (el) {
    var t = el.textContent || ''
    if (t.indexOf('©') !== -1 && t.indexOf('版权所有') !== -1)
      el.style.display = 'none'
  })

  document.querySelectorAll('a').forEach(function (el) {
    if (el.textContent.trim() === '主页' && el.getAttribute('href') === '/')
      el.setAttribute('href', 'http://localhost:5678/')
  })
}, 600)