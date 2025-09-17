{{- if (or site.Params.main.enableDarkMode site.Params.main.colorMode.enabled) -}}

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const supportedThemes = ['auto', 'dark', 'light'];

  // retrieves the currently stored theme from local storage (cookie)
  const storedTheme = localStorage.getItem('theme')

  // retrieves the theme preferred by the client, defaults to light
  function getPreferredTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // retrieves the current theme, either from local storage or client's preferences
  function getTheme() {
    if (storedTheme) {
      return storedTheme
    } else {
      return "auto";
    }
  }

  // applies and stores requested theme
  function setTheme(theme) {
    if (!supportedThemes.includes(theme)) {
      theme = 'auto'
    }
    localStorage.setItem('theme', theme)

    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (getPreferredTheme()))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }

    document.querySelectorAll('.navbar-mode-selector').forEach(chk => {
      chk.checked = (document.documentElement.getAttribute('data-bs-theme') === 'light')
    })
  }

  function showActiveTheme(theme) {
    const activeSelectors = document.querySelectorAll('.theme-icon-active')
    const activeButtons = document.querySelectorAll(`[data-bs-theme-value="${theme}"]`)
    if (activeButtons.length > 0) {
      const activeIcon = activeButtons[0].querySelector('span')

      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
      })

      for (let i = 0; i < activeSelectors.length; ++i) {
        activeSelectors[i].innerHTML = activeIcon.innerHTML
      }

      for (let i = 0; i < activeButtons.length; ++i) {
        activeButtons[i].classList.add('active')
      }
    }
  }


  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('load', () => {
    showActiveTheme(getTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value');
          setTheme(theme)
          showActiveTheme(theme)
        })
      })
  })

  // initialize theme directly when script is invoked
  setTheme(getTheme())
})()

{{- end -}}