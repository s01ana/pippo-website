const {UCCursor: UCCursor, UCMagnetic: UCMagnetic} = ( () => {
  const t = "undefined" != typeof jQuery ? jQuery : void 0;
  class e {
      constructor(e) {
          this.options = t.extend(!0, {
              container: "body:not(.disable-cursor), enable-cursor",
              speed: .7,
              ease: "expo.out",
              visibleTimeout: 300,
              stickForce: 0,
              stickMagneticForce: .3
          }, e),
          this.body = t(this.options.container),
          this.el = t('<div class="uc-cursor"></div>'),
          this.text = t('<div class="uc-cursor-text"></div>'),
          this.stickForce = this.options.stickForce,
          this.pos = {
              x: 0,
              y: 0
          },
          this.stick = !1,
          this.visible = !1,
          this.init()
      }
      init() {
          this.el.append(this.text),
          this.body.append(this.el),
          this.bind(),
          this.move(-window.innerWidth, -window.innerHeight, 0)
      }
      bind() {
          const e = this;
          function s() {
              e.setStick(t(this))
          }
          function i() {
              e.removeStick()
          }
          this.body.on("mouseleave", (function() {
              e.hide()
          }
          )).on("mouseenter", (function() {
              e.show()
          }
          )).on("mousemove", (function(t) {
              e.pos = {
                  x: e.stick ? e.stick.x - (e.stick.x - t.clientX) * e.stickForce : t.clientX,
                  y: e.stick ? e.stick.y - (e.stick.y - t.clientY) * e.stickForce : t.clientY
              },
              e.update()
          }
          )).on("mousedown", (function() {
              e.setState("active")
          }
          )).on("mouseup", (function() {
              e.removeState("active")
          }
          )).on("mouseenter", "a,input,textarea,button", (function() {
              e.setState("pointer")
          }
          )).on("mouseleave", "a,input,textarea,button", (function() {
              e.removeState("pointer")
          }
          )).on("mouseenter", "iframe", (function() {
              e.hide()
          }
          )).on("mouseleave", "iframe", (function() {
              e.show()
          }
          )).on("mouseenter", "[data-uc-cursor]", (function() {
              this.getAttribute("data-uc-cursor") ? e.setState(this.dataset.ucCursor) : e.setState("default")
          }
          )).on("mouseleave", "[data-uc-cursor]", (function() {
              this.getAttribute("data-uc-cursor") ? e.removeState(this.dataset.ucCursor) : e.removeState("default")
          }
          )).on("mouseenter", "[data-uc-cursor-text]", (function() {
              e.setText(this.dataset.ucCursorText)
          }
          )).on("mouseleave", "[data-uc-cursor-text]", (function() {
              e.removeText()
          }
          )).on("mouseenter", "[data-uc-cursor-icon]", (function() {
              e.setText(`<i class="${this.dataset.ucCursorIcon}"></i>`)
          }
          )).on("mouseleave", "[data-uc-cursor-icon]", (function() {
              e.removeText()
          }
          )).on("mouseenter", "[data-uc-cursor-stick]", (function() {
              e.setStick(t(this).find(this.dataset.ucCursorStick)),
              t(this).on("mouseenter", this.dataset.ucCursorStick, s).on("mouseleave", this.dataset.ucCursorStick, i)
          }
          )).on("mouseleave", "[data-uc-cursor-stick]", (function() {
              e.removeStick(),
              t(this).off("mouseenter", this.dataset.ucCursorStick, s).off("mouseleave", this.dataset.ucCursorStick, i)
          }
          ))
      }
      setState(t) {
          this.el.addClass(t)
      }
      removeState(t) {
          this.el.removeClass(t)
      }
      toggleState(t) {
          this.el.toggleClass(t)
      }
      setText(t) {
          this.text.html(t),
          this.el.addClass("text")
      }
      removeText() {
          this.el.removeClass("text")
      }
      setStick(e) {
          const s = this
            , i = t(e);
          let o = 1 / 0
            , n = null;
          for (const e of i) {
              const i = e.getBoundingClientRect()
                , c = t(e).width() || 0
                , r = t(e).height() || 0
                , a = {
                  y: i.top + r / 2,
                  x: i.left + c / 2
              }
                , u = (s.pos.x - a.x) ** 2 + (s.pos.y - a.y) ** 2;
              u > o || (n = a,
              o = u)
          }
          n && (this.stick = n,
          this.move(this.stick.x, this.stick.y, 5))
      }
      removeStick() {
          this.stick = !1
      }
      update() {
          this.move(),
          this.show()
      }
      move(t, e, s) {
          gsap.to(this.el, {
              x: t || this.pos.x,
              y: e || this.pos.y,
              force3D: !0,
              overwrite: !0,
              ease: this.options.ease,
              duration: this.visible ? s || this.options.speed : 0
          })
      }
      show() {
          const t = this;
          this.visible || (clearInterval(this.visibleInt),
          this.el.addClass("visible"),
          this.visibleInt = setTimeout((function() {
              return t.visible = !0
          }
          )))
      }
      hide() {
          const t = this;
          clearInterval(this.visibleInt),
          this.el.removeClass("visible"),
          this.visibleInt = setTimeout((function() {
              return t.visible = !1
          }
          ), this.options.visibleTimeout)
      }
  }
  class s {
      constructor(e, s) {
          const i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          this.cursor = s,
          this.el = t(e),
          this.options = t.extend(!0, {
              y: .4,
              x: .4,
              s: .3,
              rs: .5
          }, this.el.data("magnetic") || i),
          this.y = 0,
          this.x = 0,
          this.width = 0,
          this.height = 0,
          this.el.data("magnetic-init") || (this.el.data("magnetic-init", !0),
          this.bind())
      }
      bind() {
          const t = this;
          this.el.on("mouseenter", (function(e) {
              const s = t.el.offset() || {
                  top: 0,
                  left: 0
              };
              t.y = s.top - window.pageYOffset,
              t.x = s.left - window.pageXOffset,
              t.width = t.el.outerWidth() || 0,
              t.height = t.el.outerHeight() || 0,
              t.cursor.stickForce = t.cursor.options.stickMagneticForce;
              const i = (e.clientY - t.y - t.height / 2) * t.options.y
                , o = (e.clientX - t.x - t.width / 2) * t.options.x;
              t.move(o, i, t.options.s)
          }
          )),
          this.el.on("mousemove", (function(e) {
              const s = (e.clientY - t.y - t.height / 2) * t.options.y
                , i = (e.clientX - t.x - t.width / 2) * t.options.x;
              t.move(i, s, t.options.s)
          }
          )),
          this.el.on("mouseleave", (function(e) {
              t.move(0, 0, t.options.rs),
              t.cursor.stickForce = t.cursor.options.stickForce
          }
          ))
      }
      move(t, e, s) {
          gsap.to(this.el, {
              y: e,
              x: t,
              force3D: !0,
              overwrite: !0,
              duration: s
          })
      }
  }
  if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || t(window).width() <= 1024) || (t("body").addClass("disable-cursor"),
  0) || !t("body").hasClass("disable-cursor")) {
      const i = new e({
          container: "body:not(.disable-cursor), .enable-cursor",
          visibleTimeout: 0
      });
      t("[data-uc-magnetic]").each((function() {
          (this.dataset.ucMagnetic ? t(this).find(this.dataset.ucMagnetic) : t(this)).each((function() {
              new s(this,i)
          }
          ))
      }
      ))
  }
  return {
      UCCursor: e,
      UCMagnetic: s
  }
}
)();
