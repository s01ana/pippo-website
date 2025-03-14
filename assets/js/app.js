{
  const e = () => {
      document.documentElement.style.setProperty("--body-scroll-width", window.innerWidth - document.documentElement.clientWidth + "px")
  }
  ;
  window.addEventListener("resize", e),
  e()
}
{
  const e = () => {
      setDarkMode(!isDarkMode());
      const e = isDarkMode();
      localStorage.setItem("darkMode", e ? "1" : "0")
  }
    , t = e => {
      e.checked = isDarkMode()
  }
  ;
  document.querySelectorAll("[data-darkmode-toggle] input, [data-darkmode-switch] input").forEach((o => {
      o.addEventListener("change", e),
      t(o)
  }
  ))
}
document.querySelectorAll(".uc-horizontal-scroll").forEach((e => {
  e.addEventListener("wheel", (t => {
      t.preventDefault(),
      e.scrollBy({
          left: t.deltaY,
          behavior: "smooth"
      })
  }
  ))
}
)),
document.addEventListener("DOMContentLoaded", ( () => {
  const e = document.querySelector("[data-uc-backtotop]");
  if (!e)
      return;
  e.addEventListener("click", (e => {
      e.preventDefault(),
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      })
  }
  ));
  let t = 0;
  window.addEventListener("scroll", ( () => {
      const o = document.body.getBoundingClientRect().top;
      e.parentNode.classList.toggle("uc-active", o <= t),
      t = o
  }
  ))
}
)),
window.prettyPrint && prettyPrint();
