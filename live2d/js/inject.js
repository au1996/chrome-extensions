/**
 * 向页面注入JS；能被页面调用
 * @returns
 */
function showTime() {
  const liveDom = document.getElementById('live2d-widget')

  if (!liveDom) return

  if (liveDom.style.display === 'none') {
    liveDom.style.display = 'block'
  } else {
    liveDom.style.display = 'none'
  }
}

var text_text = '文本文本----我可以在页面中被调用'
