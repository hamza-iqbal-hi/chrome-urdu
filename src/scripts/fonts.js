const injectFontsIntoWebpage = (fontFamilies) => {
  const baseURL =
    "https://github.com/hamza-iqbal-hi/chrome-urdu/blob/main/fonts";
  const fontFaceStyles = fontFamilies.map((font) => {
    return `@font-face {
        font-family: "${font}";
        src: url(${baseURL}/${font}.ttf?raw=true) format("truetype");
        font-style: normal;
        font-weight: 400;
        unicode-range: U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0898-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC;
      }`;
  });
  const fontStylesheet = document.createElement("style");
  fontStylesheet.rel = "stylesheet";
  fontStylesheet.textContent = fontFaceStyles.join("\n");
  document.head.appendChild(fontStylesheet);
};
const getAllFonts = () => {
  return [
    "al-qalam",
    "gandhara-suls",
    "gulzar",
    "nastaleeq-kasheeda",
    "nastaleeq",
    "sameer-mosan",
  ];
};

injectFontsIntoWebpage(getAllFonts());
