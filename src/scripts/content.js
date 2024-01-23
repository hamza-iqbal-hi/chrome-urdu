chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeFont") {
    const selectedFont = request.font || "Arial, sans-serif"; // Default to Arial if no font is selected
    changeArabicFont(selectedFont);
  }
});

function changeArabicFont(selectedFont) {
  const arabicElements = document.querySelectorAll(":lang(ar)");
  arabicElements.forEach((element) => {
    element.style.fontFamily = selectedFont;
  });
}
