{
  const {String: t, Boolean: e, Number: n} = window
    , i = t => t
    , s = (t, e) => {
      const n = UniCore.util.hyphenate(t);
      t = UniCore.util.camelize(n),
      UniCore.util.$$("[uc-" + n + "],[data-uc-" + n + "]").forEach((e => {
          const n = UniCore.getComponents(e);
          n[t] && n[t].$destroy()
      }
      )),
      UniCore.component(t, e),
      UniCore.util.$$("[uc-" + n + "],[data-uc-" + n + "]").forEach((e => {
          UniCore.getComponents(e)[t] || UniCore[t](e)
      }
      ))
  }
    , o = UniCore.component("height-viewport").options;
  s("height-viewport", ( () => {
      const {boxModelAdjust: t, css: s, dimensions: h, endsWith: r, height: a, isNumeric: c, isString: l, isVisible: u, offset: d, query: p, toFloat: m} = UniCore.util;
      return i({
          mixins: [o.mixins[0]],
          props: {
              expand: e,
              offsetTop: e,
              offsetBottom: e,
              minHeight: n
          },
          data: {
              expand: !1,
              offsetTop: !1,
              offsetBottom: !1,
              minHeight: 0
          },
          update: {
              read({minHeight: e}) {
                  if (this.inactive = !this.matchMedia || !u(this.$el),
                  this.inactive)
                      return {
                          minHeight: "auto",
                          prev: e
                      };
                  let n = "";
                  const i = t(this.$el, "height", "content-box");
                  if (this.expand)
                      n = a(window) - (h(document.documentElement).height - h(this.$el).height) - i || "";
                  else {
                      if (n = "calc(100vh",
                      this.offsetTop) {
                          const {top: t} = d(this.$el);
                          n += t > 0 && t < a(window) / 2 ? ` - ${t}px` : ""
                      }
                      !0 === this.offsetBottom ? n += ` - ${h(this.$el.nextElementSibling).height}px` : c(this.offsetBottom) ? n += ` - ${this.offsetBottom}vh` : this.offsetBottom && r(this.offsetBottom, "px") ? n += ` - ${m(this.offsetBottom)}px` : l(this.offsetBottom) && (n += ` - ${h(p(this.offsetBottom, this.$el)).height}px`),
                      n += (i ? ` - ${i}px` : "") + ")"
                  }
                  return {
                      minHeight: n,
                      prev: e
                  }
              },
              write({minHeight: t, prev: e}) {
                  s(this.$el, {
                      minHeight: t
                  }),
                  t !== e && this.$update(this.$el, "resize"),
                  this.minHeight && m(s(this.$el, "minHeight")) < this.minHeight && s(this.$el, "minHeight", this.minHeight)
              },
              events: ["resize"]
          }
      })
  }
  )());
  const h = UniCore.component("sticky").options;
  s("sticky", {
      ...h,
      mixins: [h.mixins[0]]
  });
  const r = ( () => {
      const {fragment: t, remove: e, before: n, after: i, on: s} = UniCore.util;
      return {
          connected() {
              const e = this.$el
                , o = "<span class='unicon-add'></span>"
                , h = "<span class='unicon-subtract'></span>"
                , r = this.buttonDown = t(`<button class="input-number-down input-number-btn btn">${h}</button>`)
                , a = this.buttonUp = t(`<button class="input-number-up input-number-btn btn">${o}</button>`);
              n(e, r),
              i(e, a);
              const c = (t, e) => {
                  if ("+" === e && t.stepUp)
                      return t.stepUp();
                  if ("-" === e && t.stepDown)
                      return t.stepDown();
                  const n = +(t.step || "1") * ("-" === e ? -1 : 1)
                    , i = +(t.value || "0") + n;
                  "-" === e && t.min && i < +t.min || "+" === e && t.max && i > +t.max || (t.value = i)
              }
              ;
              s(r, "click", (t => {
                  t.preventDefault(),
                  c(e, "-")
              }
              )),
              s(a, "click", (t => {
                  t.preventDefault(),
                  c(e, "+")
              }
              )),
              window.feather && window.feather.replace()
          },
          disconnected() {
              e(this.buttonDown),
              e(this.buttonUp),
              this.buttonDown = this.buttonUp = null
          }
      }
  }
  )();
  UniCore.component("input-number", r);
  const a = UniCore.component("countdown").options;
  s("countdown", ( () => {
      const n = a.mixins[0]
        , {$: i, $$: s, empty: o, html: h, isInView: r} = UniCore.util
        , c = {
          days: "day",
          hours: "hour",
          minutes: "minute",
          seconds: "second"
      };
      return {
          mixins: [n],
          props: {
              date: t,
              clsWrapper: t,
              clsLabel: t,
              clsHideEnd: t,
              clsShowEnd: t,
              padZero: e,
              oneUnit: e
          },
          data: {
              date: "",
              clsWrapper: ".uc-countdown-%unit%",
              clsLabel: ".uc-countdown-label",
              clsHideEnd: ".uc-countdown-hide-end",
              clsShowEnd: ".uc-countdown-show-end",
              padZero: !0,
              oneUnit: !1
          },
          computed: {
              date: ({date: t}) => Date.parse(t),
              days: ({clsWrapper: t}, e) => i(t.replace("%unit%", "days"), e),
              hours: ({clsWrapper: t}, e) => i(t.replace("%unit%", "hours"), e),
              minutes: ({clsWrapper: t}, e) => i(t.replace("%unit%", "minutes"), e),
              seconds: ({clsWrapper: t}, e) => i(t.replace("%unit%", "seconds"), e),
              unitValueElement: ({clsWrapper: t}, e) => i(t.replace("%unit%", "unit-value"), e),
              labelElement: ({clsLabel: t}, e) => i(t, e),
              units() {
                  const t = ["days", "hours", "minutes", "seconds"];
                  return this.oneUnit ? t : t.filter((t => this[t]))
              },
              hideEnd: ({clsHideEnd: t}, e) => s(t, e),
              showEnd: ({clsShowEnd: t}, e) => s(t, e)
          },
          connected() {
              this.start()
          },
          disconnected() {
              this.stop(),
              this.oneUnit ? (o(this.unitValueElement),
              o(this.labelElement)) : this.units.forEach((t => this[t] && o(this[t]))),
              this.showEnd.forEach((t => t.classList.remove("uc-hidden"))),
              this.hideEnd.forEach((t => t.classList.remove("uc-hidden")))
          },
          events: [{
              name: "visibilitychange",
              el: () => document,
              handler() {
                  document.hidden ? this.stop() : this.start()
              }
          }],
          update: {
              write() {
                  const t = function(t) {
                      const e = t - Date.now();
                      return {
                          total: e,
                          seconds: e / 1e3 % 60,
                          minutes: e / 1e3 / 60 % 60,
                          hours: e / 1e3 / 60 / 60 % 24,
                          days: e / 1e3 / 60 / 60 / 24
                      }
                  }(this.date);
                  if (t.total <= 0 && (this.stop(),
                  t.days = t.hours = t.minutes = t.seconds = 0,
                  this.showEnd.forEach((t => t.classList.remove("uc-hidden"))),
                  this.hideEnd.forEach((t => t.classList.add("uc-hidden")))),
                  this.oneUnit) {
                      const e = this.units.find(( (e, n, i) => Math.floor(t[e]) > 0 || n === i.length - 1));
                      return this.labelElement.textContent = 1 === Math.floor(t[e]) ? c[e] : e,
                      void this.setUnit(e, this.unitValueElement, t)
                  }
                  this.units.forEach((e => {
                      this.setUnit(e, this[e], t)
                  }
                  ))
              }
          },
          methods: {
              setUnit(e, n, i) {
                  let s = t(Math.floor(i[e]));
                  s = this.padZero && s.length < 2 ? `0${s}` : s,
                  n.textContent !== s && (s = s.split(""),
                  s.length !== n.children.length && h(n, s.map(( () => "<span></span>")).join("")),
                  s.forEach(( (t, e) => n.children[e].textContent = t)))
              },
              start() {
                  this.stop(),
                  this.date && this.units.length && (this.showEnd.forEach((t => t.classList.add("uc-hidden"))),
                  this.$update(),
                  this.timer = setInterval(( () => {
                      r(this.$el) && this.$update()
                  }
                  ), 1e3))
              },
              stop() {
                  this.timer && (clearInterval(this.timer),
                  this.timer = null)
              }
          }
      }
  }
  )());
  const c = UniCore.component("drop").options;
  ( () => {
      const [t,e,n] = c.mixins
        , {addClass: i, append: s, apply: o, css: h, hasClass: r, includes: a, isTouch: l, MouseTracker: u, offset: d, on: p, once: m, parent: f, pointerCancel: w, pointerDown: b, pointerEnter: g, pointerLeave: E, pointerUp: $, query: U, removeClass: C, toggleClass: v, within: x} = UniCore.util;
      let y
  }
  )();
  s("navbar-bound", ( () => {
      const {$$: t, isVisible: e, removeClass: n, addClass: s} = UniCore.util;
      return i({
          mixins: [],
          props: {},
          data: {},
          computed: {
              ulList: ({}, e) => t("ul", e)
          },
          update: {
              read() {
                  const t = this.$el;
                  let n = e(t);
                  if (n) {
                      const {x: e, width: i} = t.getBoundingClientRect()
                        , s = [e, i].join(",");
                      s === this.lastSeenElPos && (n = !1),
                      this.lastSeenElPos = s
                  }
                  return {
                      needUpdate: n
                  }
              },
              write({needUpdate: t}) {
                  if (!t)
                      return;
                  const e = document.documentElement.clientWidth;
                  this.ulList.forEach((t => {
                      n(t, "reverse-submenu-open"),
                      t.getBoundingClientRect().right > e && s(t, "reverse-submenu-open")
                  }
                  ))
              },
              events: ["resize"]
          }
      })
  }
  )())
}
