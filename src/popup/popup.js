document
  .getElementById("cu-change-font")
  .addEventListener("click", function () {
    const selectedFont = document.getElementById("fontSelector").value;

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "changeFont",
        font: selectedFont,
      });
    });
  });
