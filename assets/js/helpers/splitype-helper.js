{
  const t = window.SplitType
    , {parseDataAttr: a} = dataAttrHelpers
    , e = {
      string: ["tagName", "lineClass", "wordClass", "charClass", "splitClass", "types", "split"],
      number: [],
      boolean: ["absolute"]
  }
    , s = s => {
      if (!(s.cloneNode(!0)instanceof Element))
          return;
      const l = a(s.getAttribute("data-uc-splitext") || "", e);
      new t(s,{
          ...l
      })
  }
  ;
  dataAttrHelpers.watchDataAttr("data-uc-splitext", s)
}
