{
  const e = window.VanillaTilt
    , t = {
      string: ["axis", "easing", "mouse-event-element"],
      number: ["max", "startX", "startY", "perspective", "scale", "speed", "max-glare", "gyroscopeMinAngleX", "gyroscopeMaxAngleX", "gyroscopeMinAngleY", "gyroscopeMaxAngleY", "gyroscopeSamples"],
      boolean: ["reverse", "transition", "reset", "reset-to-start", "glare", "glare-prerender", "gyroscope", "full-page-listening"]
  }
    , a = a => {
      if (!(a instanceof HTMLElement))
          return;
      const r = dataAttrHelpers.parseDataAttr(a.getAttribute("data-uc-tilt") || "", t);
      new e(a,{
          ...r
      })
  }
  ;
  dataAttrHelpers.watchDataAttr("data-uc-tilt", a)
}
