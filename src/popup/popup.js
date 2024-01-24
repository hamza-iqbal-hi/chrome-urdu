document
  .getElementById("cu-change-font")
  .addEventListener("click", function () {
    const selectedFont = document.getElementById("fontSelector").value;
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      const activeTab = tabs[0];
      chrome.tabs.sendMessage(activeTab.id, {
        action: "changeFont",
        font: selectedFont,
        message: "start",
      });
    });
    chrome.runtime
      .sendMessage({ action: "cu-save-font", font: selectedFont })
      .then(() => {});
  });

const getSelectedFont = () => {
  return chrome.runtime.sendMessage({ action: "cu-get-font" }, (response) => {
    if (response && response.font)
      document.getElementById("fontSelector").value = response.font;
  });
};
document.addEventListener("DOMContentLoaded", function () {
  getSelectedFont();
});
