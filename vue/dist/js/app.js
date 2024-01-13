!function(){"use strict";var t,e={3065:function(t,e,n){var i=n(6829),s=n(4289);i(e,"__esModule",{value:!0}),e.default=void 0;var r=s(n(7802)),a=new NoSleep,o={name:"app",data:function(){return{title:"8bit-like TIMER",timer:null,totalTime:3600,setTime:3600,status:!1}},methods:{startTimer:function(){var t=this;this.timer=(0,r.default)((function(){return t.countdown()}),1e3),this.status=!0,a.enable()},stopTimer:function(){clearInterval(this.timer),this.timer=null,this.status=!0,a.disable()},changeTimer:function(t){this.setTime=t,this.totalTime=t,this.resetTimer()},resetTimer:function(){clearInterval(this.timer),this.totalTime=this.setTime,this.timer=null,this.status=!1,a.disable()},countdown:function(){if(this.totalTime>=1)this.totalTime-=1,300===this.totalTime&&navigator.vibrate([500,250,500]);else{var t=document.getElementById("dialog-rounded");clearInterval(this.timer),this.totalTime=0,this.resetTimer(),dialogPolyfill.registerDialog(t),t.showModal(),navigator.vibrate([500,250,500,250,500]),a.disable()}},pad:function(t){return(t<10?"0":"")+t},toggleFullScreen:function(){var t=window.document,e=t.documentElement,n=e.requestFullscreen||e.mozRequestFullScreen||e.webkitRequestFullScreen||e.msRequestFullscreen,i=t.exitFullscreen||t.mozCancelFullScreen||t.webkitExitFullscreen||t.msExitFullscreen;t.fullscreenElement||t.mozFullScreenElement||t.webkitFullscreenElement||t.msFullscreenElement?i.call(t):n.call(e)}},computed:{hours:function(){var t=Math.floor(this.totalTime/60/60);return this.pad(t)},minutes:function(){var t=Math.floor(this.totalTime/60-60*this.hours);return this.pad(t)},seconds:function(){var t=this.totalTime-(60*this.hours*60+60*this.minutes);return this.pad(t)}}};e.default=o},2525:function(t,e,n){n(6829)(e,"__esModule",{value:!0}),e.staticRenderFns=e.render=void 0;var i=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"nes-container with-title is-centered"},[e("h1",{staticClass:"title"},[t._v(t._s(t.title))]),t._v(" "),e("video",{attrs:{src:"https://media.giphy.com/media/f9w0K7c8vqYwuSPRHU/giphy.mp4",muted:"",loop:"",autoplay:""},domProps:{muted:!0}}),t._v(" "),e("div",{staticClass:"num"},[e("span",[t._v(t._s(t.hours))]),t._v(" "),e("span",[t._v(":")]),t._v(" "),e("span",[t._v(t._s(t.minutes))]),t._v(" "),e("span",[t._v(":")]),t._v(" "),e("span",[t._v(t._s(t.seconds))])]),t._v(" "),e("div",{staticClass:"btns"},[e("button",{staticClass:"nes-btn",class:{"is-error":!t.status,"is-disabled":t.status},attrs:{disabled:t.status},on:{click:function(e){t.totalTime>0?t.totalTime-=600:t.totalTime=0}}},[t._v("-")]),t._v(" "),e("button",{staticClass:"nes-btn",class:{"is-primary":!t.status,"is-disabled":t.status},attrs:{disabled:t.status},on:{click:function(e){t.totalTime<=85800?t.totalTime+=600:t.totalTime=t.totalTime}}},[t._v("+")])]),t._v(" "),e("div",{staticClass:"btns"},[e("button",{staticClass:"nes-btn",class:{"is-disabled":t.status},attrs:{disabled:t.status},on:{click:function(e){return t.changeTimer(1800)}}},[t._v("30M")]),t._v(" "),e("button",{staticClass:"nes-btn",class:{"is-disabled":t.status},attrs:{disabled:t.status},on:{click:function(e){return t.changeTimer(3600)}}},[t._v("1H")]),t._v(" "),e("button",{staticClass:"nes-btn",class:{"is-disabled":t.status},attrs:{disabled:t.status},on:{click:function(e){return t.changeTimer(10800)}}},[t._v("3H")])]),t._v(" "),e("div",{staticClass:"btns control"},[t.timer?e("button",{staticClass:"nes-btn is-error",on:{click:t.stopTimer}},[t._v("PAUSE")]):e("button",{staticClass:"nes-btn is-warning",on:{click:t.startTimer}},[t._v("START")]),t._v(" "),t.status?e("button",{staticClass:"nes-btn",on:{click:t.resetTimer}},[t._v("RESET")]):t._e()])]),t._v(" "),t._m(0)])};e.render=i;e.staticRenderFns=[function(){var t=this,e=t._self._c;return e("dialog",{staticClass:"nes-dialog is-rounded",attrs:{id:"dialog-rounded"}},[e("form",{attrs:{method:"dialog"}},[e("p",[t._v("Time is over.")]),t._v(" "),e("menu",{staticClass:"dialog-menu"},[e("button",{staticClass:"nes-btn is-primary"},[t._v("CONFIRM")])])])])}],i._withStripped=!0},3245:function(t,e,n){var i=n(4289),s=i(n(7740)),r=i(n(3141));s.default.config.productionTip=!1,new s.default({render:function(t){return t(r.default)}}).$mount("#app")},3141:function(t,e,n){n.r(e);var i=n(4215),s=n(5782),r={};for(var a in s)"default"!==a&&(r[a]=function(t){return s[t]}.bind(0,a));n.d(e,r);var o=(0,n(810).Z)(s.default,i.render,i.staticRenderFns,!1,null,null,null);e.default=o.exports},5782:function(t,e,n){n.r(e);var i=n(3065),s=n.n(i),r={};for(var a in i)"default"!==a&&(r[a]=function(t){return i[t]}.bind(0,a));n.d(e,r),e.default=s()},4215:function(t,e,n){var i=n(2525);n.o(i,"render")&&n.d(e,{render:function(){return i.render}}),n.o(i,"staticRenderFns")&&n.d(e,{staticRenderFns:function(){return i.staticRenderFns}})}},n={};function i(t){var s=n[t];if(void 0!==s)return s.exports;var r=n[t]={exports:{}};return e[t](r,r.exports,i),r.exports}i.m=e,t=[],i.O=function(e,n,s,r){if(!n){var a=1/0;for(c=0;c<t.length;c++){n=t[c][0],s=t[c][1],r=t[c][2];for(var o=!0,l=0;l<n.length;l++)(!1&r||a>=r)&&Object.keys(i.O).every((function(t){return i.O[t](n[l])}))?n.splice(l--,1):(o=!1,r<a&&(a=r));if(o){t.splice(c--,1);var u=s();void 0!==u&&(e=u)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[n,s,r]},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,{a:e}),e},i.d=function(t,e){for(var n in e)i.o(e,n)&&!i.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},i.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,n){var s,r,a=n[0],o=n[1],l=n[2],u=0;if(a.some((function(e){return 0!==t[e]}))){for(s in o)i.o(o,s)&&(i.m[s]=o[s]);if(l)var c=l(i)}for(e&&e(n);u<a.length;u++)r=a[u],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(c)},n=self.webpackChunk=self.webpackChunk||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var s=i.O(void 0,[736],(function(){return i(3245)}));s=i.O(s)}();