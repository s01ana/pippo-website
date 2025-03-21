{
  const e = "undefined" != typeof jQuery ? jQuery : null
    , {typesTesters: t, typesParsers: n} = dataAttrHelpers
    , r = (e, r) => {
      const o = {};
      for (const a of e.split(";")) {
          const e = a.trim().match(/^(.*?):([\s\S]*)$/);
          if (!e)
              continue;
          let[s,l] = [e[1], e[2]].map((e => e.trim()));
          i[s] && (s = i[s]);
          for (const e in r)
              if (r[e].includes(s) && t[e](l)) {
                  l = n[e](l);
                  break
              }
          "string" == typeof l && /^(\[|\{|anime\.|"|')/.test(l) && (l = new Function(`return (${l})`)());
          const c = s.split("-");
          let g = o;
          c.forEach(( (e, t) => {
              t < c.length - 1 ? (g[e] = g[e] || {},
              g = g[e]) : g[e] = l
          }
          ))
      }
      return o
  }
    , o = {
      string: ["targets", "onscroll", "onscroll-target"],
      number: ["onview"],
      boolean: ["loop", "onclick", "onview", "autoplay", "onscroll", "onscroll-target", "onscroll-pen"]
  }
    , i = {
      onscroll: "onscroll-target",
      "onscroll-trigger": "onscroll-triggerHook"
  }
    , a = (e, t, n="restart") => {
      if ("alternate" === n)
          e.animeToggleOpen ? t.reversed || t.reverse() : t.reversed && t.reverse(),
          e.animeToggleOpen = !e.animeToggleOpen,
          t.play();
      else if ("restart" === n)
          t.restart();
      else {
          if ("reset" !== n)
              throw "invalid direction";
          t.reset()
      }
  }
    , s = new Promise((e => {
      document.addEventListener("DOMContentLoaded", (t => {
          setTimeout(( () => {
              e(!0)
          }
          ), 1300)
      }
      ))
  }
  ))
    , l = async (t, n, r) => {
      const o = (e="restart") => {
          a(t, r, e)
      }
      ;
      let i = !1 !== n.autoplay;
      if (n.onclick) {
          const e = "alternate" === n.onclick;
          t.addEventListener("click", (t => {
              t.preventDefault(),
              o(e ? "alternate" : "restart")
          }
          )),
          i = !1
      }
      if (n.onscroll) {
          const e = "boolean" == typeof n.onscroll ? {
              triggerElement: t
          } : n.onscroll;
          e.target && (e.triggerElement = e.target,
          delete e.target);
          const o = new ScrollMagic.Controller({
              ...e.controller || {}
          })
            , a = e.pen;
          delete e.controller,
          delete e.pen;
          const s = e || {}
            , l = s.triggerElement ? "string" == typeof s.triggerElement ? document.querySelector(s.triggerElement) : s.triggerElement : t;
          delete s.triggerElement;
          const c = new ScrollMagic.Scene({
              triggerElement: l,
              duration: "100%",
              triggerHook: 1,
              ...s
          });
          if (a) {
              const e = !0 === a ? l : document.querySelector(a);
              c.setPin(e)
          }
          c.on("progress", (e => {
              r.seek(e.progress * r.duration)
          }
          )).addTo(o),
          delete n.onscroll,
          i = !1
      }
      if (n.onhover && (e(t).on("mouseenter mouseleave", ( () => {
          o("alternate")
      }
      )),
      i = !1),
      await s,
      void 0 !== n.onview && !1 !== n.onview) {
          const e = "number" == typeof n.onview ? n.onview : 0
            , r = () => {
              window.innerHeight > t.getBoundingClientRect().top - e && (window.removeEventListener("scroll", r),
              window.removeEventListener("resize", r),
              o())
          }
          ;
          window.addEventListener("scroll", r),
          window.addEventListener("resize", r),
          r(),
          i = !1
      }
      if (n.media) {
          const e = "string" == typeof n.media ? [n.media] : n.media
            , t = [];
          for (let n = 0; n < e.length; n++) {
              const r = e[n];
              (n % 2 == 0 ? t[n / 2] = [] : t[(n - 1) / 2]).push({
                  bp: r,
                  type: n % 2 == 0 ? "min" : "max"
              })
          }
          const r = t.map((e => "(" + e.map(( ({bp: e, type: t}) => {
              const n = breakpoints[e] || 0;
              return `(${t}-width: ${"max" === t ? n - 1 : n}px)`
          }
          )).join(" and ") + ")")).join(" or ")
            , a = matchMedia(r)
            , s = () => {
              o(a.matches ? "restart" : "reset")
          }
          ;
          a.onchange = s,
          s(),
          i = !1
      }
      i && o()
  }
    , c = async t => {
      const n = r(t.getAttribute("data-anime") || "", o)
        , i = n.targets ? [...e(n.targets, t)] : t;
      let a;
      if (Object.assign(n, {
          targets: i
      }),
      n.timeline) {
          const e = n.timeline;
          delete n.timeline,
          g[e] || (d[e] || (d[e] = new Promise((t => {
              m[e] = t
          }
          ))),
          await d[e]),
          a = g[e](t, n)
      } else
          a = anime(n);
      a.pause(),
      t.animeInstance = a,
      l(t, n, a)
  }
    , g = {}
    , d = {}
    , m = {}
    , p = (e, t) => {
      g[e] = t,
      m[e] && m[e](t)
  }
  ;
  Object.assign(window, {
      defineAnimeTimelineHelper: p
  });
  const u = async t => {
      const n = t.getAttribute("data-anime-toggle") || "";
      t.addEventListener("click", (t => {
          t.preventDefault();
          [...e(n)].forEach((e => {
              const t = e.animeTimelineInstance || e.animeInstance;
              t && a(e, t, "alternate")
          }
          ))
      }
      ))
  }
  ;
  dataAttrHelpers.watchDataAttr("data-anime", c),
  dataAttrHelpers.watchDataAttr("data-anime-toggle", u)
}
