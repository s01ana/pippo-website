{
  const t = window.Typed
    , e = {
      string: ["stringsElement", "fadeOutClass", "cursorChar", "attr", "contentType"],
      number: ["typeSpeed", "startDelay", "backSpeed", "backDelay", "loopCount"],
      boolean: ["smartBackspace", "shuffle", "fadeOut", "fadeOutDelay", "loop", "showCursor", "autoInsertCss", "bindInputFocusEvents"]
  }
    , a = a => {
      const n = a.cloneNode(!0);
      if (!(n instanceof Element))
          return;
      a.innerHTML = "";
      const s = dataAttrHelpers.parseDataAttr(a.getAttribute("data-uc-typed") || "", e);
      new t(a,{
          stringsElement: n,
          ...s
      })
  }
  ;
  dataAttrHelpers.watchDataAttr("data-uc-typed", a)
}
