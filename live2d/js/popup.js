const GET_LOCATION_HREF = 'get-location-href'
const TOGGLE_LIVE2D = 'toggle-live2d'
const TOFFLE_GRAYSCALE = 'toggle-grayscale'
const live2dDom = document.getElementById('switch-live2d')
const grayscaleDom = document.getElementById('switch-grayscale')

initLive2dStatus()

/**
 * 看板娘开关添加change事件
 */
live2dDom.addEventListener('change', async (event) => {
  const status = event.target.checked
  const message = {
    cmd: TOGGLE_LIVE2D,
    status,
  }

  const { href } = await sendMessageToInitScript(message)
  chrome.storage.local.set({ [href + TOGGLE_LIVE2D]: status })
})

/**
 * 置灰开关添加change事件
 */
grayscaleDom.addEventListener('change', (event) => {
  const status = event.target.checked

  sendMessageToInitScript({ cmd: TOFFLE_GRAYSCALE, status })
})

/**
 * 初始化看板娘状态
 */
async function initLive2dStatus() {
  const localStorage = await chrome.storage.local.get()
  const message = {
    cmd: GET_LOCATION_HREF,
    storage: localStorage,
  }

  const { href } = await sendMessageToInitScript(message)
  const status = localStorage[href + TOGGLE_LIVE2D]

  if (status) {
    live2dDom.children[0].checked = true
  } else {
    live2dDom.children[0].checked = false
  }
}

/**
 * 发送消息到init.js
 * @param {*} message
 * @returns
 */
async function sendMessageToInitScript(message) {
  const tabList = await chrome.tabs.query({ active: true })
  const response = await chrome.tabs.sendMessage(tabList[0].id, message)
  return response
}
