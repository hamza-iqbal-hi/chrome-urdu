const key = "cu-font";

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  
  if (message.action === "cu-save-font") {
    chrome.storage.local.set({ [key]: message.font }, function () {});
  } else if (message.action === "cu-get-font") {
    chrome.storage.local.get([key], function (result) {
      sendResponse({ font: result[key] });
    });
    return true;
  }
});
