const defaultFont = "gulzar";
let fontToApply = defaultFont;

const getActiveFont = () => {
  return chrome.runtime.sendMessage({ action: "cu-get-font" }, (response) => {
    if (response && response.font) setFontToApply(response.font);
  });
};

const getElementsWithArabicOrUrduText = () => {
  const elementsWithArabicOrUrduText = [];

  const checkUrduScript = (elem) => {
    const urduRegex = /[\u0600-\u06FF]/;
    if (urduRegex.test(elem.textContent)) {
      elementsWithArabicOrUrduText.push(elem);
    }
  };

  var treeWalker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT, // Show only text nodes
    null,
    false
  );

  // Collect text nodes in an array
  var textNodes = [];
  while (treeWalker.nextNode()) {
    textNodes.push(treeWalker.currentNode);
  }

  for (let i = 0; i < textNodes.length; i++) {
    checkUrduScript(textNodes[i]);
  }

  return elementsWithArabicOrUrduText;
};
const changeFontForWebpage = () => {
  const urduElements = getElementsWithArabicOrUrduText();
  urduElements.forEach((element) => {
    element.parentNode.style.fontFamily = fontToApply;
  });
};

const setFontToApply = (newFontFamily) => {
  fontToApply = newFontFamily;
  changeFontForWebpage();
};

const onWebPageUpdate = (mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      changeFontForWebpage();
    }
  }
};

//request font change when user changes font
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "changeFont") {
    const selectedFont = request.font;
    setFontToApply(selectedFont);
  }
});

// adding observer to observe for changes in the webpage
const config = { attributes: true, childList: true, subtree: true };
const observer = new MutationObserver(onWebPageUpdate);
observer.observe(document.body, config);

//get activeFont from storage
getActiveFont();
