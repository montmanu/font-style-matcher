(function() {
  'use strict';

  var clipboard = new Clipboard('.clipboardButton');
  updateClipboardButtons();

  getAllNYTFonts();

  simulateFout.addEventListener('change', fout);
  downloadFont.addEventListener('change', download);
  useColours.addEventListener('change', colour);
  download();

  fallback.style.fontFamily = fallbackOutput.style.fontFamily = fallbackName.value;
  webfont.style.fontFamily = webfontOutput.style.fontFamily = webfontName.value;
  fallback.style.fontSize = fallbackOutput.style.fontSize = fallbackSize.value + 'px';
  webfont.style.fontSize = webfontOutput.style.fontSize = webfontSize.value + 'px';
  fallback.style.fontWeight = fallbackOutput.style.fontWeight = fallbackWeight.value;
  webfont.style.fontWeight = webfontOutput.style.fontWeight = webfontWeight.value;
  fallback.style.fontStyle = fallbackOutput.style.fontStyle = fallbackFontStyle.value;
  webfont.style.fontStyle = webfontOutput.style.fontStyle = webfontFontStyle.value;
  fallback.style.lineHeight = fallbackOutput.style.lineHeight = fallbackLineHeight.value;
  webfont.style.lineHeight = webfontOutput.style.lineHeight = webfontLineHeight.value;
  fallback.style.letterSpacing = fallbackOutput.style.letterSpacing = fallbackSpacing.value + 'px';
  webfont.style.letterSpacing = webfontOutput.style.letterSpacing = webfontSpacing.value + 'px';
  fallback.style.wordSpacing = fallbackOutput.style.wordSpacing = fallbackWordSpacing.value + 'px';
  webfont.style.wordSpacing = webfontOutput.style.wordSpacing = fallbackWordSpacing.value + 'px';

  fallbackName.addEventListener('input', updateFontFamily);
  webfontName.addEventListener('input', updateFontFamily);

  fallbackSize.addEventListener('input', updateFontSize);
  webfontSize.addEventListener('input', updateFontSize);

  fallbackLineHeight.addEventListener('input', updateLineHeight);
  webfontLineHeight.addEventListener('input', updateLineHeight);

  fallbackSpacing.addEventListener('input', updateFontSpacing);
  webfontSpacing.addEventListener('input', updateFontSpacing);

  fallbackWordSpacing.addEventListener('input', updateFontWordSpacing);
  webfontWordSpacing.addEventListener('input', updateFontWordSpacing);

  fallbackWeight.addEventListener('input', updateFontWeight);
  webfontWeight.addEventListener('input', updateFontWeight);

  fallbackFontStyle.addEventListener('input', updateFontStyle);
  webfontFontStyle.addEventListener('input', updateFontStyle);

  webfontOutput.addEventListener('blur', changeText);
  webfontOutput.addEventListener('focus', clearText);

  fallbackResetButton.addEventListener('click', resetStyles);
  webfontResetButton.addEventListener('click', resetStyles);

  clipboard.on('success', function(e) {
    var span = e.trigger.querySelector('span')
    span.textContent = 'Copied!';
    setTimeout(function() {
      span.textContent = 'Copy';
    }, 1000);
  });

  clipboard.on('error', function(e) {
    var span = e.trigger.querySelector('span')
    span.textContent = 'Error copying :(';
    setTimeout(function() {
      span.textContent = 'Copy';
    }, 1000);
  });

  function clearText() {
    fallbackOutput.style.height = this.offsetHeight + 'px';
    fallbackOutput.innerHTML = "";
  }

  function changeText() {
    fallbackOutput.style.height = 'auto';
    fallbackOutput.innerHTML = this.innerHTML;
  }

  function updateFontSize(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('font-size', which, value);
    updateStyle('font-size', which + 'Output', value);
    document.getElementById(which + 'SizeDisplay').textContent = value;
  }

  function updateLineHeight(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('line-height', which, value);
    updateStyle('line-height', which + 'Output', value);
    document.getElementById(which + 'LineHeightDisplay').textContent = value;
  }

  function updateFontSpacing(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('letter-spacing', which, value);
    updateStyle('letter-spacing', which + 'Output', value);
    document.getElementById(which + 'SpacingDisplay').textContent = value;
  }

  function updateFontWordSpacing(event) {
    var value = event.target.value + 'px';
    var which = event.target.dataset.target;
    updateStyle('word-spacing', which, value);
    updateStyle('word-spacing', which + 'Output', value);
    document.getElementById(which + 'WordSpacingDisplay').textContent = value;
  }

  function updateFontFamily(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-family', which, value);
    updateStyle('font-family', which + 'Output', value);

    if (which === 'webfont') {
      download();
    }
  }

  function updateFontWeight(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-weight', which, value);
    updateStyle('font-weight', which + 'Output', value);
    document.getElementById(which + 'WeightDisplay').textContent = value;
  }

  function updateFontStyle(event) {
    var value = event.target.value;
    var which = event.target.dataset.target;
    updateStyle('font-style', which, value);
    updateStyle('font-style', which + 'Output', value);
  }

  function updateStyle(name, element, value) {
    document.getElementById(element).style[name] = value;
    updateClipboardButtons();
  }

  function resetStyles(event) {
    var which = event.currentTarget.dataset.target;
    var defaultStyles = {
      fallback: {
        name: 'Georgia',
        size: 34,
        fontWeight: 700,
        fontStyle: 'italic',
        lineHeight: 1,
        letterSpacing: 0,
        wordSpacing: 0
      },
      webfont: {
        name: 'NYTCheltenham',
        size: 34,
        fontWeight: 700,
        fontStyle: 'italic',
        lineHeight: 1,
        letterSpacing: 0,
        wordSpacing: 0
      }
    };

    var inputs = which === 'fallback' ? ([
      { type: 'name', el: fallbackName },
      { type: 'size', el: fallbackSize },
      { type: 'fontWeight', el: fallbackWeight },
      { type: 'fontStyle', el: fallbackFontStyle },
      { type: 'lineHeight', el: fallbackLineHeight },
      { type: 'letterSpacing', el: fallbackSpacing },
      { type: 'wordSpacing', el: fallbackWordSpacing }
    ]) : ([
      { type: 'name', el: webfontName },
      { type: 'size', el: webfontSize },
      { type: 'fontWeight', el: webfontWeight },
      { type: 'fontStyle', el: webfontFontStyle },
      { type: 'lineHeight', el: webfontLineHeight },
      { type: 'letterSpacing', el: webfontSpacing },
      { type: 'wordSpacing', el: webfontWordSpacing }
    ]);

    inputs.forEach(input => {
      var type = input.type;
      var el = input.el;
      el.value = defaultStyles[which][type];
      el.dispatchEvent(new Event('input', {
        view: window,
        bubbles: true,
        cancelable: true
      }));
    });
  }

  function updateClipboardButtons() {
    var fallbackCss = fallbackOutput.style.cssText.split('; ').join(';\n');
    var webfontCss = webfontOutput.style.cssText.split('; ').join(';\n');
    document
        .getElementById('fallbackClipboardButton')
        .setAttribute('data-clipboard-text', fallbackCss);
    document
        .getElementById('webfontClipboardButton')
        .setAttribute('data-clipboard-text', webfontCss);
  }

  function fout(event) {
    if (!event.target.checked) {
      clearTimeout(window.__timeout1);
      clearTimeout(window.__timeout2);
      clearTimeout(window.__timeout3);
      fallbackOutput.style.visibility = 'visible';
      webfontOutput.style.visibility = 'visible';
    } else {
      startFout();
    }
  }

  function startFout() {
    fallbackOutput.style.visibility = 'hidden';
    webfontOutput.style.visibility = 'hidden';

    window.__timeout1 = setTimeout(function() {
      fallbackOutput.style.visibility = 'visible';

      window.__timeout2 = setTimeout(function() {
        fallbackOutput.style.visibility = 'hidden';
        webfontOutput.style.visibility = 'visible';
        window.__timeout3 = setTimeout(startFout, 1000);
      }, 500);
    }, 100)
  }

  function download() {
    var shouldDownload = downloadFont.checked;

    if (!shouldDownload)
      return;

    var name = webfontName.value.trim();
    var id = 'font-css-' + name;
    if (document.getElementById(id))
      return;

    var url = './styles/' + name + '.css';
    var link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }

  function colour() {
    var shouldColour = useColours.checked;
    fallbackOutput.style.color = shouldColour ? 'red' : 'black';
  }

  function getAllNYTFonts() {
    var request = new XMLHttpRequest();
    var url = './data/fonts.json';
    request.open('GET', url, true);
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        var fonts = JSON.parse(request.responseText);
        var options = '';
        for (var i = 0; i < fonts.length; i++) {
          options += '<option value="'+ fonts[i].family +'"/>'; ;
        }
        document.getElementById('families').innerHTML = options;
      }
    };
    request.send();
  }
})();
