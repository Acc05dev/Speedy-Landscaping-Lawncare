/**
 * Runs inline, before first paint.
 *
 * Adds `anim` to <html> so elements can start in their pre-animation positions without a
 * flash (see "Motion" in globals.css). Visitors who prefer reduced motion never get the
 * class, so for them the page is plain static HTML.
 *
 * Two safety nets, in case the animation code is slow or never arrives:
 *   1.8 s  `anim-late` shows the top of the page (headline, buttons) without waiting.
 *   6 s    `anim` is removed altogether and everything is visible, unanimated.
 */
export const motionBootScript = `(function(){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;var c=document.documentElement.classList;c.add('anim');setTimeout(function(){if(!window.__motionReady)c.add('anim-late')},1800);setTimeout(function(){if(!window.__motionReady)c.remove('anim','anim-late')},6000)}catch(e){}})()`;
