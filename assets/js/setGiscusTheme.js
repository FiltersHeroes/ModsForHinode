window.addEventListener('load', function () {
  var bsTheme = document.documentElement.getAttribute("data-bs-theme");
  setGiscusTheme(bsTheme);
  
  function setGiscusTheme(theme) {
    const iframe = document.querySelector('iframe.giscus-frame');
    if (!iframe)
    {
      return;
    }
    iframe.contentWindow.postMessage({ giscus:
      {
        setConfig: {
          theme: theme,
        }
      } 
    }, "https://giscus.app");
  }

  for (let toggle of document.querySelectorAll('[data-bs-theme-value]'))
  {
    toggle.addEventListener('click', () => {
      var theme = toggle.getAttribute('data-bs-theme-value');
      if (theme == "auto") {
        theme = "preferred_color_scheme";
      }
      setGiscusTheme(theme);
    })
  };
}, false);
