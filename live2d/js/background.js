chrome.contextMenus.create({
  id: chrome.runtime.id,
  title: '使用看板娘搜索：%s', // %s 表示选中的文本
  contexts: ['selection'], // selection 表示选中事件
})

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.create({
    url: 'https://www.baidu.com/s?ie=utf-8&wd=' + encodeURI(info.selectionText),
  })
})
