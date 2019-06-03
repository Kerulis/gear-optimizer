!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/gear-optimizer/",n(n.s=0)}([function(t,e,n){"use strict";function r(t){return(r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return(o="function"===typeof Symbol&&"symbol"===r(Symbol.iterator)?function(t){return r(t)}:function(t){return t&&"function"===typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":r(t)})(t)}function i(t,e){return!e||"object"!==o(e)&&"function"!==typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function a(t){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function u(t,e){return(u=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function s(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.r(e);var f=function t(e,n,r,o,i){c(this,t),this.name=e,this.slot=n,this.zone=r,this.level=o,this.statnames=[],this.base={},this.disable=!1;for(var a=0;a<i.length;a++)this.statnames.push(i[a][0]),this[i[a][0]]=i[a][1],this.base[i[a][0]]=i[a][1]/2};var l=function(t){function e(t){var n;return c(this,e),(n=i(this,void 0===t?a(e).call(this,"Empty Slot",t,void 0,0,[]):a(e).call(this,"Empty "+t[0]+" Slot",t,void 0,0,[]))).empty=!0,i(n)}return s(e,f),e}(),p=function(t){function e(){var t;return c(this,e),(t=i(this,a(e).call(this,"total",void 0,void 0,100,[]))).items=[],t.counts={},Object.getOwnPropertyNames(h).map(function(e){t.counts[h[e][0]]=0}),Object.getOwnPropertyNames(g).map(function(e){t[g[e]]=100,t.statnames.push(g[e])}),t[g.POWER]=0,t[g.TOUGHNESS]=0,t[g.RESPAWN]=0,t}return s(e,f),e}(),E=function t(e){c(this,t),this.names=[];for(var n=0;n<e.length;n++)this.names.push(e[n][0]),this[e[n][0]]=e[n][1]},m=function(t){for(var e=Object.getOwnPropertyNames(h).map(function(t){return[h[t][0]+0,new l(h[t])]}).filter(function(t){return t[0]!==h.ACCESSORY[0]+0}),n=h.ACCESSORY,r=0;r<t;r++)e.push([n[0]+r,new l(n)]);return e},h={WEAPON:["Weapon",0],HEAD:["Head",1],CHEST:["Armor",2],PANTS:["Pants",3],BOOTS:["Boots",4],ACCESSORY:["Accessory",5]},g={ADVANCE_TRAINING:"Advance Training",AP:"AP",AUGMENT_SPEED:"Augment Speed",BEARD_SPEED:"Beard Speed",COOKING:"Cooking",DAYCARE_SPEED:"Daycare Speed",DROP_CHANCE:"Drop Chance",ENERGY_BARS:"Energy Bars",ENERGY_CAP:"Energy Cap",ENERGY_POWER:"Energy Power",ENERGY_SPEED:"Energy Speed",EXPERIENCE:"Experience",GOLD_DROP:"Gold Drops",HACK_SPEED:"Hack Speed",MAGIC_BARS:"Magic Bars",MAGIC_CAP:"Magic Cap",MAGIC_POWER:"Magic Power",MAGIC_SPEED:"Magic Speed",MOVE_COOLDOWN:"Move Cooldown",NGU_SPEED:"NGU Speed",POWER:"Power",QUEST_DROP:"Quest Drops",RES3_BARS:"Res3 Bars",RES3_CAP:"Res3 Cap",RES3_POWER:"Res3 Power",RESPAWN:"Respawn",SEED_DROP:"Seed Gain",TOUGHNESS:"Toughness",WANDOOS_SPEED:"Wandoos Speed",WISH_SPEED:"Wish Speed",YGGDRASIL_YIELD:"Yggdrasil Yield"},v={NONE:["None",[]],RESPAWN:["Respawn",[g.RESPAWN]],DAYCARE_SPEED:["Daycare",[g.DAYCARE_SPEED]],ENGU:["Energy NGU",[g.ENERGY_CAP,g.ENERGY_POWER,g.NGU_SPEED]],MNGU:["Magic NGU",[g.MAGIC_CAP,g.MAGIC_POWER,g.NGU_SPEED]],HACK:["Hacks",[g.RES3_CAP,g.RES3_POWER,g.HACK_SPEED]],NGUS:["NGUs",[g.ENERGY_CAP,g.ENERGY_POWER,g.NGU_SPEED,g.MAGIC_CAP,g.MAGIC_POWER,g.NGU_SPEED]],NGUSHACK:["NGUs and Hacks",[g.ENERGY_CAP,g.ENERGY_POWER,g.NGU_SPEED,g.MAGIC_CAP,g.MAGIC_POWER,g.NGU_SPEED,g.RES3_CAP,g.RES3_POWER,g.HACK_SPEED]],GOLD_DROP:["Gold Drops",[g.GOLD_DROP]],DROP_CHANCE:["Drop chance",[g.DROP_CHANCE]],WANDOOS:["Wandoos",[g.ENERGY_CAP,g.WANDOOS_SPEED,g.MAGIC_CAP,g.WANDOOS_SPEED]]};function y(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function S(t){var e=t[0].score;return t.map(function(t){e=t.score>e?t.score:e}),t.filter(function(t){return t.score===e})}function P(t,e,n,r,o,i,a){if(0===n.length)return i;var u=D(i);u.map(function(t){t.score=R(t,n),t.item_count=t.items.length}),u=S(u);for(var s={},c=function(c){var f=i[c],E=r-f.counts.Accessory;E=o<E?o:E;var m=Object.getOwnPropertyNames(h).filter(function(t){return"Accessory"!==h[t][0]&&!(f.counts[h[t][0]]>0)}).map(function(n){return b(t,e,h[n],f,a)}),g=[m.map(function(t){return t.length}).reduce(function(t,e){return t*e},1)],v=m.map(function(t){return w(t,n)});g.push(v.map(function(t){return t.length}).reduce(function(t,e){return t*e},1));var y=d(v,f);if(y=w(y,n),g.push(y.length),void 0===s[E]){var P=b(t,e,h.ACCESSORY,f,a);if(g.push(P.length),P=w(P,n,E),g.push(P.length),1===P.length&&P[0].name===new l(P[0].slot).name)return"continue";for(var _=new p,N=0;N<P.length;N++)A(_,P[N]);P.sort(function(t,e){var r=R(O(D(_),t),n);return R(O(D(_),e),n)-r}),console.log("Processing "+g[4]+" out of "+g[3]+" accessories with "+E+" slots."),s[E]=function(t,e,n,r,o){var i=t.length;n.score=R(n,o);for(var a=new Array(i+1),u=0;u<i+1;u++)a[u]=new Array(e+1);for(var s=0;s<=i;s++){for(var c=Date.now(),f=0;f<=e;f++)if(0!==s&&0!==f){var l=D(a[s-1][f]),p=D(a[s-1][f-1]);a[s][f]=C(l,p,t[s-1],r,o)}else a[s][f]=[n];0!==s&&(a[s-1]=void 0,console.log(s+"/"+i+" "+Math.floor((Date.now()-c)/10)/100+" "+a[s].reduce(function(t,e){return t+e.length},0)+" "+t[s-1].name))}return a[i][e]}(P,E,f,A,n)}for(var G in console.log("Processing "+g[2]+" out of "+g[1]+" out of "+g[0]+" gear layouts."),y)for(var M in console.log(g[4]),s[E]){for(var W=D(y[G]),j=s[E][M],Y=f.items.length;Y<j.items.length;Y++)A(W,j.items[Y]);W.score=R(W,n),W.item_count=y[G].items.length,u.push(W),u=S(u)}},f=0;f<i.length;f++)c(f);for(var E in u=function(t){if(1===t.length)return t;for(var e=[t[0]],n=1;n<t.length;n++){var r=!1,o=t[n].items.length,i=function(i){if(e[i].items.length!==o)return"continue";var a={};return t[n].items.map(function(t){a[t.name]=!0}),e[i].items.map(function(t){a[t.name]=!0}),Object.getOwnPropertyNames(a).length!==o?"continue":(r=!0,"break")};t:for(var a=0;a<e.length;a++)switch(i(a)){case"continue":continue;case"break":break t}r||e.push(t[n])}return console.log("Keeping "+e.length+" out of "+t.length+" candidates."),e}(u)){for(var m=u[E].items.length,g=[],v=u[E].item_count;v<m;v++){var y=u[E].items[v],P=R(O(D(u[E]),y),n);g.push([P,y])}for(var _=u[E].item_count;_<m;_++)u[E].items.pop();for(var N in g=g.sort(function(t,e){return t[0]-e[0]}))u[E].items.push(g[N][1])}return u}function A(t,e){if(e.empty)return t;for(var n=0;n<e.statnames.length;n++){var r=e.statnames[n];t[r]+=e[r]}return t.items.push(e),t.counts[e.slot[0]]+=1,t}function O(t,e){if(e.empty)return t;if(void 0===(e=t.items.filter(function(t){return t.name===e.name})[0]))return t;for(var n=0;n<e.statnames.length;n++){var r=e.statnames[n];t[r]-=e[r]}return t.items.filter(function(t){return t.name!==e.name}),t.counts[e.slot[0]]-=1,t}var _=function(t,e){var n;return(n=[]).concat.apply(n,y(t.map(function(t){return e.map(function(e){return[].concat(t,e)})})))},d=function(t,e){return 0===t.length?(e.item_count=e.items.length,[e]):function t(e,n){for(var r=arguments.length,o=new Array(r>2?r-2:0),i=2;i<r;i++)o[i-2]=arguments[i];return n?t.apply(void 0,[_(e,n)].concat(o)):e}.apply(void 0,y(t)).map(function(t){for(var n=D(e),r=0;r<t.length;r++)A(n,t[r]);return n.item_count=n.items.length,n})};function R(t,e){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=1;for(var o in e){var i=e[o];void 0!==t[i]&&(r*=(n?1:0)+t[i]/100)}return r}function b(t,e,n,r,o){var i=r.items.filter(function(t){return t.slot[0]===n[0]}).map(function(t){return t.name});return t.filter(function(t){return!e[t].empty&&(!(e[t].zone[1]>o)&&e[t].slot[0]===n[0])}).map(function(t){return e[t]}).filter(function(t){return!t.disable&&!i.includes(t.name)})}function D(t){var e;if(null==t||"object"!=typeof t)return t;if(t instanceof Date)return(e=new Date).setTime(t.getTime()),e;if(t instanceof Array){e=[];for(var n=0,r=t.length;n<r;n++)e[n]=D(t[n]);return e}if(t instanceof Object){for(var o in e={},t)t.hasOwnProperty(o)&&(e[o]=D(t[o]));return e}throw new Error("Unable to copy obj! Its type isn't supported.")}function C(t,e,n,r,o){for(var i in e){var a=r(D(e[i]),n);a.score=R(a,o),e[i]=a}t=G(e=w(e=e.sort(function(t,e){return e.score-t.score}),o),t,o),e=G(t,e,o);var u=t.concat(e);return u=u.sort(function(t,e){return e.score-t.score})}function N(t,e,n){for(var r=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],o=new Array(n.length).fill(0),i=new Array(n.length).fill(0),a=0;a<n.length;a++){var u=n[a],s=t.statnames.indexOf(u);if(s>=0&&(o[a]=t[u]),(s=e.statnames.indexOf(u))>=0&&(i[a]=e[u]),i[a]>o[a])return!1;i[a]<o[a]&&(r=!1)}return!r}function w(t,e){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=new Array(t.length).fill(!1),o=void 0===t[0].slot?new p:new l(t[0].slot),i=t.length-1;i>-1;i--)if(N(o,t[i],e,!o.empty)&&(r[i]=n),r[i]!==n)for(var a=t.length-1;a>-1;a--)r[a]!==n&&(r[a]+=N(t[i],t[a],e));var u=r.map(function(e,r){return e<n&&t[r]}).filter(function(t){return!1!==t});return 0===u.length&&(u=[o]),u}function G(t,e,n){for(var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1,o=new Array(e.length).fill(!1),i=void 0===t[0].slot?new p:new l(t[0].slot),a=t.length-1;a>-1;a--)for(var u=e.length-1;u>-1;u--)o[u]!==r&&(o[u]+=N(t[a],e[u],n));var s=o.map(function(t,n){return t<r&&e[n]}).filter(function(t){return!1!==t});return 0===s.length&&(s=[i]),s}self.addEventListener("message",function(t){let e=Date.now(),n=t.data.state,r=[new p];for(let a=0;a<n.factors.length;a++){let t=n.factors[a],e=v[t][1],o=n.maxslots[a];r=P(n.items.names,n.items,e,n.accslots,o,r,n.zone)}r=r[Math.floor(Math.random()*r.length)];let o=new E(m(n.accslots)),i=Object.getOwnPropertyNames(h).map(t=>0);for(let a=0;a<r.items.length;a++){const t=r.items[a];o[t.slot[0]+i[t.slot[1]]]=t,i[t.slot[1]]++}this.postMessage({equip:o}),this.close(),console.log(Math.floor((Date.now()-e)/10)/100+" seconds")})}]);
//# sourceMappingURL=b29b12d354b8a5014092.worker.js.map