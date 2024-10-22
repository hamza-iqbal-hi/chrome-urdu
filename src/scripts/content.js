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
    if (element.parentNode && element.parentNode.style)
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
const isFontAvailable = (fontFamily) => {
  var testElement = document.createElement("span");
  testElement.style.fontFamily = fontFamily;
  testElement.style.fontSize = "100px";
  testElement,
    (textContent = ` ایک ٹیلے پر واقع مزار خواجہ فریدالدین گنج شکرؒ کے احاطہء صحن میں
  ذرا سی ژالہ باری چاندی کے ڈھیروں کی مثل بڑے غضب کا نظارا دیتی ہے۔`);
  document.body.appendChild(testElement);

  var computedFontFamily = window.getComputedStyle(testElement).fontFamily;
  //document.body.removeChild(testElement);
  return computedFontFamily === fontFamily;
};

// Example usage
var fontExists = isFontAvailable("gulzar");
console.log("Gulzar font exists:", fontExists);
