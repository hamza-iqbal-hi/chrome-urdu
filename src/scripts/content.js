const defaultFont = "gulzar";
let fontToApply = defaultFont;

const getSavedFont = () => {
  return chrome.runtime.sendMessage({ action: "cu-get-font" }, (response) => {
    if (response && response.font) updateFontToApply(response.font);
  });
};

const changeFontForWebpage = () => {
  const urduElements = document.querySelectorAll(":lang(ur)");
  console.log(fontToApply);
  urduElements.forEach((element) => {
    element.style.fontFamily = fontToApply;
  });
};

const updateFontToApply = (newFontFamily) => {
  fontToApply = newFontFamily;
  changeFontForWebpage();
};

const injectFonts = () => {
  const fontStylesheet = document.createElement("style");
  fontStylesheet.rel = "stylesheet";
  fontStylesheet.textContent = `
    @font-face {
      font-family: "al-qalam";
      src: url(https://github.com/hamza-iqbal-hi/chrome-urdu/blob/main/fonts/al-qalam.ttf?raw=true) format("truetype");
      font-style: normal;
      font-weight: 400;
      unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
    }
    @font-face {
      font-family: "gandhara-suls";
      src: url(https://github.com/hamza-iqbal-hi/chrome-urdu/blob/main/fonts/gandhara-suls.ttf?raw=true) format("truetype");
      font-style: normal;
      font-weight: 400;
      unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
    }
    @font-face {
      font-family: "gulzar";
      src: url(https://github.com/hamza-iqbal-hi/chrome-urdu/blob/main/fonts/gulzar.ttf?raw=true) format("truetype");
      font-style: normal;
      font-weight: 400;
      unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
    }
    @font-face {
      font-family: "nastaleeq-kasheeda";
      src: url(https://github.com/hamza-iqbal-hi/chrome-urdu/blob/main/fonts/nastaleeq-kasheeda.ttf?raw=true) format("truetype");
      font-style: normal;
      font-weight: 400;
      unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
    }
    @font-face {
      font-family: "nastaleeq";
      src: url(https://github.com/hamza-iqbal-hi/chrome-urdu/blob/main/fonts/nastaleeq.ttf?raw=true) format("truetype");
      font-style: normal;
      font-weight: 400;
      unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
    }
    @font-face {
      font-family: "sameer-mosan";
      src: url(https://github.com/hamza-iqbal-hi/chrome-urdu/blob/main/fonts/sameer-mosan.ttf?raw=true) format("truetype");
      font-style: normal;
      font-weight: 400;
      unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
    }
    body{
      font-family: ${defaultFont};
    }`;

  document.head.appendChild(fontStylesheet);
};

const callback = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      changeFontForWebpage();
    }
  }
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, request.action === "changeFont", request.font);
  if (request.action === "changeFont") {
    const selectedFont = request.font;
    updateFontToApply(selectedFont);
  }
});

const config = { attributes: true, childList: true, subtree: true };

const observer = new MutationObserver(callback);
observer.observe(document.body, config);
injectFonts();
getSavedFont();
