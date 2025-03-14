{
  const e = {
      string: [],
      number: ["clone", "speed", "gap"],
      boolean: ["clone", "reverse", "hover"]
  }
    , t = t => {
      if (!(t instanceof HTMLElement))
          return;
      const r = dataAttrHelpers.parseDataAttr(t.getAttribute("data-uc-marquee") || "", e);
      if (r.speed && t.style.setProperty("--speed", r.speed + "s"),
      r.gap && t.style.setProperty("--gap", r.gap + "px"),
      t.classList.toggle("reverse", !!r.reverse),
      t.classList.toggle("pause-on-hover", !!r.hover),
      r.clone && t.firstElementChild) {
          const e = +r.clone
            , s = t.firstElementChild
            , a = [...s.childNodes];
          for (let t = 0; t < e; t++)
              for (let e = 0; e < a.length; e++)
                  s.append(a[e].cloneNode(!0))
      }
  }
  ;
  dataAttrHelpers.watchDataAttr("data-uc-marquee", t)
}
