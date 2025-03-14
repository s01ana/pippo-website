{
  const e = "undefined" != typeof jQuery ? jQuery : null
    , t = window.Swiper
    , n = {
      boolean: {
          test: e => "true" === e || "false" === e,
          convert: e => "false" !== e,
          items: ["centeredSlides", "pagination-clickable", "observer", "observeParents", "freeMode", "watchSlidesVisibility", "watchSlidesProgress", "loop", "centeredSlidesBounds", "autoplay-disableOnInteraction", "autoHeight", "fraction-zeros", "cssMode", "fadeEffect-crossFade", "mousewheel", "allowTouchMove", "grabCursor", "freeModeMomentum", "parallax", "pauseOnMouseEnter", "reverseDirection", "watchOverflow"]
      },
      number: {
          test: e => !isNaN(parseFloat(e)),
          convert: e => parseFloat(e),
          items: ["spaceBetween", "autoplay-delay", "initialSlide", "slidesPerView", "speed", "touchRatio"]
      },
      string: {
          test: () => !0,
          convert: e => e,
          items: []
      },
      function: {
          test: e => {
              try {
                  return new Function(`(${e})(...arguments)`),
                  !0
              } catch (e) {
                  return !1
              }
          }
          ,
          convert: e => new Function(`(${e})(...arguments)`),
          items: ["on-activeIndexChange", "on-afterInit", "on-beforeDestroy", "on-beforeInit", "on-beforeLoopFix", "on-beforeResize", "on-beforeSlideChangeStart", "on-beforeTransitionStart", "on-breakpoint", "on-changeDirection", "on-click", "on-destroy", "on-doubleClick", "on-doubleTap", "on-fromEdge", "on-init", "on-lock", "on-loopFix", "on-momentumBounce", "on-observerUpdate", "on-orientationchange", "on-progress", "on-reachBeginning", "on-reachEnd", "on-realIndexChange", "on-resize", "on-setTransition", "on-setTranslate", "on-slideChange", "on-slideChangeTransitionEnd", "on-slideChangeTransitionStart", "on-slideNextTransitionEnd", "on-slideNextTransitionStart", "on-slidePrevTransitionEnd", "on-slidePrevTransitionStart", "on-slideResetTransitionEnd", "on-slideResetTransitionStart", "on-sliderFirstMove", "on-sliderMove", "on-slidesGridLengthChange", "on-slidesLengthChange", "on-snapGridLengthChange", "on-snapIndexChange", "on-tap", "on-toEdge", "on-touchEnd", "on-touchMove", "on-touchMoveOpposite", "on-touchStart", "on-transitionEnd", "on-transitionStart", "on-unlock", "on-update"]
      }
  }
    , o = {
      items: "slidesPerView",
      sets: "slidesPerGroup",
      center: "centeredSlides",
      "center-bounds": "centeredSlidesBounds",
      gap: "spaceBetween",
      next: "navigation-nextEl",
      prev: "navigation-prevEl",
      "disable-class": "navigation-disabledClass",
      active: "initialSlide",
      connect: "thumbs-connect",
      offset: "slidesOffsetAfter",
      dots: "pagination-el",
      "dots-type": "pagination-type",
      "dots-click": "pagination-clickable",
      "auto-height": "autoHeight",
      autoplay: "autoplay-delay",
      "autoplay-int": "autoplay-disableOnInteraction",
      "pause-mouse": "pauseOnMouseEnter",
      fade: "fadeEffect-crossFade",
      free: "freeMode",
      reverse: "reverseDirection",
      "free-momentum": "freeModeMomentum",
      "grab-cursor": "grabCursor",
      "parallax-enabled": "parallax"
  }
    , a = "\n        gap: 48;\n        next: .swiper-next;\n        prev: .swiper-prev;\n        disable-class: uk-opacity-40;\n        dots: .swiper-dotnav;\n        dots-click: true;\n        fraction-zeros: true;\n        observer: true;\n        observeParents: true;\n        watchSlidesVisibility: true;\n        watchSlidesProgress: true;\n    "
    , i = (t, i, s=!1) => {
      const r = {};
      ((s ? a + ";" : "") + t).split(/(?<!\\);/).filter((e => e.trim())).map((e => e.split(":").map((e => e.trim())))).forEach(( ([e,t]) => {
          t = t.replace(/\\;/g, ";"),
          o[e] && (e = o[e]);
          e: for (const o in n)
              if (n[o].items.includes(e) && (!n[o].test || n[o].test(t))) {
                  t = n[o].convert(t);
                  break e
              }
          const a = e.split("-");
          let i = r;
          a.forEach(( (e, n) => {
              n < a.length - 1 ? (i[e] = i[e] || {},
              i = i[e]) : i[e] = t
          }
          ))
      }
      ));
      {
          let e = i.closest(r.parent || ".swiper-parent");
          e || (e = i),
          r.navigation && "object" == typeof r.navigation && (r.navigation.nextEl && "string" == typeof r.navigation.nextEl && (r.navigation.nextEl = [...e.querySelectorAll(r.navigation.nextEl)]),
          r.navigation.prevEl && "string" == typeof r.navigation.prevEl && (r.navigation.prevEl = [...e.querySelectorAll(r.navigation.prevEl)])),
          r.pagination && "object" == typeof r.pagination && r.pagination.el && "string" == typeof r.pagination.el && (r.pagination.el = [...e.querySelectorAll(r.pagination.el)]),
          r.thumbs && r.thumbs.connect && "string" == typeof r.thumbs.connect && (r.thumbs.connect = [...e.querySelectorAll(r.thumbs.connect)]),
          r.progress && r.progress.bar && "string" == typeof r.progress.bar && (r.progress.bar = [...e.querySelectorAll(r.progress.bar)]),
          delete r.parent
      }
      if (r.progress && r.progress.bar) {
          const t = e(r.progress.bar);
          delete r.progress,
          r.on = {
              init() {
                  t.removeClass("animate"),
                  t.removeClass("active"),
                  t.eq(0).addClass("animate"),
                  t.eq(0).addClass("active")
              },
              slideChangeTransitionStart() {
                  t.removeClass("animate"),
                  t.removeClass("active"),
                  t.eq(0).addClass("active")
              },
              slideChangeTransitionEnd() {
                  t.eq(0).addClass("animate")
              }
          }
      }
      if (r.fraction && r.fraction.zeros && r.pagination) {
          const e = 2
            , t = "0";
          delete r.fraction,
          Object.assign(r.pagination, {
              formatFractionCurrent: n => String(n).padStart(e, t),
              formatFractionTotal: n => String(n).padStart(e, t)
          })
      }
      return r
  }
    , s = {
      xs: 480,
      s: 640,
      m: 960,
      l: 1200,
      xl: 1600
  }
    , r = (n, o="data-uc-swiper") => {
      let a = {};
      try {
          a = i(n.getAttribute(o), n, !0);
          for (const e in s) {
              const t = n.getAttribute("data-uc-swiper-" + e);
              if (t) {
                  a.breakpoints = a.breakpoints || {};
                  const o = s[e];
                  a.breakpoints[o] = i(t, n)
              }
          }
      } catch (e) {
          console.warn(e)
      }
      a.on || (a.on = {}),
      a.on.init = function(t) {
          e(t.el).addClass("swiper-initialized")
      }
      ;
      const r = () => {
          const e = new t(n,a);
          e.update(),
          document.addEventListener("DOMContentLoaded", ( () => e.update()), {
              once: !0
          }),
          window.addEventListener("load", ( () => e.update()), {
              once: !0
          })
      }
      ;
      if (a.thumbs && a.thumbs.connect) {
          const e = a.thumbs.connect;
          delete a.thumbs.connect,
          setTimeout(( () => {
              const t = e[0];
              t && a.thumbs ? (a.thumbs.swiper = t.swiper,
              a.thumbs.swiper ? r() : console.warn(`thumbs connect with selector "${e}" not setup!`)) : console.warn(`thumbs connect with selector "${e}" not exist!`)
          }
          ))
      } else
          r()
  }
    , l = e => {
      r(e, "data-uc-swiper")
  }
  ;
  document.addEventListener("DOMContentLoaded", ( () => {
      dataAttrHelpers.watchDataAttr("data-uc-swiper", l)
  }
  )),
  Object.assign(window, {
      initSwiper: r
  })
}
