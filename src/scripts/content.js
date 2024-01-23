chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeFont") {
    const selectedFont = request.font || "Arial, sans-serif";
    changeArabicFont(selectedFont);
  }
});

function changeArabicFont(selectedFont) {
  const urduElements = document.querySelectorAll(":lang(ur)");
  urduElements.forEach((element) => {
    element.style.fontFamily = selectedFont;
  });
}
const injectFonts = () => {
  const fontStylesheet = document.createElement("style");
  fontStylesheet.rel = "stylesheet";
  const url = chrome.runtime.getURL("src/assets/fonts/font.css");
  document.head.appendChild(fontStylesheet);
  fontStylesheet.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Gulzar&display=swap');
    @font-face {
        font-family: "sameer-mosan";
        src: url(https://urdulabss3.s3.ap-south-1.amazonaws.com) format("truetype");
        font-style: normal;
        font-weight: 400;
        unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
      }`;
};
const config = { attributes: true, childList: true, subtree: true };
const callback = function (mutationsList, observer) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      changeArabicFont("sameer-mosan");
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(document.body, config);
injectFonts();
