setTimeout(function () {
  document.querySelectorAll('p, span').forEach(function (el) {
    var t = el.textContent || ''
    if (t.indexOf('©') !== -1 && t.indexOf('版权所有') !== -1)
      el.style.display = 'none'
    if (el.textContent.trim() === '首页')
      el.style.cursor = 'pointer'
  })

  document.querySelectorAll('a, span').forEach(function (el) {
    var t = el.textContent || ''
    var href = el.getAttribute('href') || ''
    if (t.trim() === '主页' && href === '/')
      el.setAttribute('href', 'http://localhost:5678/')
    if (t.trim() === '首页') {
      el.onclick = function() { window.location.href = 'https://tokenapi.txsw.top/' }
      el.style.cursor = 'pointer'
    }
  })
}, 600)
