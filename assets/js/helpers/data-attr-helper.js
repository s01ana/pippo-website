const dataAttrHelpers = ( () => {
  const t = {
      string: t => !0,
      number: t => /^-?\d+(\.\d+)?$/.test(t),
      boolean: t => "false" === t || "true" === t
  }
    , e = {
      string: t => t,
      number: t => parseFloat(t),
      boolean: t => "false" !== t
  };
  return {
      typesTesters: t,
      typesParsers: e,
      watchDataAttr: (t, e) => {
          const r = r => {
              if (!r.hasAttribute(t))
                  return;
              const s = "--data-attr-" + t + "--";
              r[s] || (r[s] = !0,
              e(r))
          }
          ;
          document.querySelectorAll("[" + t + "]").forEach(r);
          new MutationObserver((e => {
              for (const s of e)
                  s.target instanceof Element && (r(s.target),
                  s.target.querySelectorAll("[" + t + "]").forEach(r))
          }
          )).observe(document.body, {
              attributes: !0,
              childList: !0,
              subtree: !0,
              attributeFilter: [t]
          })
      }
      ,
      parseDataAttr: (r, s={}) => {
          const a = {};
          for (const o of r.split(";")) {
              const r = o.trim().match(/^(.*?):([\s\S]*)$/);
              if (!r)
                  continue;
              let[n,c] = [r[1], r[2]].map((t => t.trim()));
              for (const r in s)
                  if (s[r].includes(n) && t[r](c)) {
                      c = e[r](c);
                      break
                  }
              a[n] = c
          }
          return a
      }
  }
}
)();
