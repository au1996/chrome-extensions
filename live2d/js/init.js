const GET_LOCATION_HREF = 'get-location-href'
const TOGGLE_LIVE2D = 'toggle-live2d'
const TOFFLE_GRAYSCALE = 'toggle-grayscale'

/**
 * @description: 初始化
 * 此页面的所有方法都不能直接在页面中调用，需要通过注入的js调用
 */
live2dWidget.init({
  model: {
    jsonPath: 'https://unpkg.com/live2d-widget-model-shizuku@1.0.5/assets/shizuku.model.json',
  },
  display: {
    superSample: 2,
    width: 300,
    height: 400,
    position: 'left',
    hOffset: 0,
    vOffset: 0,
  },
})

/**
 * 在下一轮事件循环动作，确保DOM已经生成
 */
setTimeout(() => {
  const href = location.href
  const status = localStorage.getItem(href + TOGGLE_LIVE2D)
  toggleLive2d(+status)
}, 0)

injectCustomJs()
addListener()

/**
 * 添加监听
 * @returns
 */
function addListener() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { cmd, storage, status } = request
    const href = location.href

    if (cmd === GET_LOCATION_HREF) {
      sendResponse({ href })
      toggleLive2d(storage[href + TOGGLE_LIVE2D])
      return
    }

    if (cmd === TOGGLE_LIVE2D) {
      sendResponse({ href })
      toggleLive2d(status)
      localStorage.setItem(href + TOGGLE_LIVE2D, +status)
      return
    }

    if (cmd === TOFFLE_GRAYSCALE) {
      toggleGrayscale(status)
      return
    }
  })
}

/**
 * 开关看板娘
 * @returns
 */
function toggleLive2d(status) {
  const ele = document.getElementById('live2d-widget')

  if (!ele) {
    console.error('liveDom is undefined')
    return
  }

  if (status) {
    ele.style.display = 'block'
  } else {
    ele.style.display = 'none'
  }
}

/**
 * 全屏置灰/还原
 * @returns
 */
function toggleGrayscale(status) {
  const dom = document.documentElement

  if (status) {
    dom.classList.add('gray')
    dom.classList.remove('colored')
  } else {
    dom.classList.add('colored')
    dom.classList.remove('gray')
  }
}

/**
 * 向页面注入JS；注入的js内部的方法能给页面调用
 * @param {*} jsPath
 */
function injectCustomJs(jsPath = 'js/inject.js') {
  const temp = document.createElement('script')
  temp.setAttribute('type', 'text/javascript')
  temp.src = chrome.runtime.getURL(jsPath) // chrome-extension://mdlgngagnfhcadopgbhkbpgmohbeedmd/js/inject.js
  document.head.appendChild(temp)
}
