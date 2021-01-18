parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"PC6C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MENU=exports.API=void 0;var o={getRecipeInformation:function(o,e){return"https://api.spoonacular.com/recipes/".concat(o,"/information?apiKey=").concat(e)},searchFor:function(o,e){return"https://api.spoonacular.com/recipes/complexSearch?query=".concat(o,"&number=9&apiKey=").concat(e)}};exports.API=o;var e={mainPage:{name:"Main Page",link:"/CodersCamp2020.CookBook/index.html"},randomRecipe:{name:"Random Recipe",link:"/CodersCamp2020.CookBook/random.html"},nutritionGame:{name:"Nutrition Game",link:"/CodersCamp2020.CookBook/nutritionGame.html"},calculator:{name:"Calculator",link:"/CodersCamp2020.CookBook/calculator.html"},shoppingList:{name:"Shopping List",link:"/CodersCamp2020.CookBook/list.html"}};exports.MENU=e;
},{}],"ecPM":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.MainMenu=exports.sendRequest=exports.createResultBox=exports.createElementWithInnerText=exports.createElementWithClasses=exports.createNavigationList=exports.appendChildrenToElement=void 0;var e=require("../GlobalData.js"),t="a69c65ede3bb4ac3b262c5b425b4f835",n=function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];for(var o in n)e.appendChild(n[o]);return e};exports.appendChildrenToElement=n;var r=function(t){var n=o("ul","navigationList");for(var r in e.MENU)if(console.log(e.MENU[r]),e.MENU[r]!==t){var a=document.createElement("li");a.innerHTML="<a href=".concat(e.MENU[r].link,">").concat(e.MENU[r].name,"</a>"),n.appendChild(a)}return n};exports.createNavigationList=r;var o=function(e){for(var t,n=document.createElement(e),r=arguments.length,o=new Array(r>1?r-1:0),a=1;a<r;a++)o[a-1]=arguments[a];return(t=n.classList).add.apply(t,o),n};exports.createElementWithClasses=o;var a=function(e,t){for(var n,r=document.createElement(e),o=arguments.length,a=new Array(o>2?o-2:0),i=2;i<o;i++)a[i-2]=arguments[i];return(n=r.classList).add.apply(n,a),r.innerText=t,r};exports.createElementWithInnerText=a;var i=function(e,t){e.forEach(function(e){var r=document.createElement("article");r.id=e.id;var o=document.createElement("img");o.src=e.image;var a=document.createElement("p");a.innerText=e.title,n(r,o,a),n(t,r)})};exports.createResultBox=i;var c=function(n,r){var o=n.value.trim().replace("","%20");fetch(e.API.searchFor(o,t)).then(function(e){if(!e.ok)throw new Error("Ups...  Something went wrong!");return e.json()}).then(function(e){if(0===e.results.length){var t=document.createElement("p");t.innerText="Sorry, there isn't any result for Your search",r.appendChild(t)}else i(e.results,r)}).catch(function(e){resultsSection.innerHTML="<p>".concat(e,"</p>"),console.log(e)})};exports.sendRequest=c;var l=function(t){var i=o("nav","menu","container"),l=o("div","logo");l.innerHTML="<a href=".concat(e.MENU.mainPage.link,">CookBook</a>");var s=a("button","Click","navigationBtn"),d=o("div","navigationBox","navigationBoxHidden"),u=r(t),v=o("form","search"),m=o("input"),p=a("button","Search"),f=a("span","Please, insert text!","tooltip");n(v,m,p,f),n(d,u,v),n(i,l,s,d);var h=o("div","backdrop"),E=o("div","modal","container"),x=a("button","x"),g=document.createElement("section");n(E,x,g),n(h,E);var y=document.getElementById("swquiz-app");document.body.insertBefore(i,y),document.body.insertBefore(h,y);var L=document.querySelector("form input"),C=document.querySelector("form button"),k=document.querySelector(".tooltip"),b=document.querySelector(".backdrop"),B=b.firstElementChild.firstElementChild,M=b.firstElementChild.lastElementChild,T=document.querySelector(".logo"),q=function(){k.classList.remove("active")};L.addEventListener("click",function(e){return q()}),C.addEventListener("click",function(e){if(e.preventDefault(),""!==L.value){q(),b.style.opacity=1,b.style.zIndex=100;var t="Results for search: ".concat(L.value),n=document.createElement("h2");n.innerText=t,M.appendChild(n),c(L,M),N(),L.value=""}else k.classList.add("active")}),B.addEventListener("click",function(e){e.preventDefault(),b.style.opacity=0,b.style.zIndex=-100,M.innerText=""}),b.addEventListener("click",function(e){b.style.opacity=0,b.style.zIndex=-100,M.innerText=""}),b.firstElementChild.addEventListener("click",function(e){e.stopPropagation()}),M.addEventListener("click",function(e){"1"==Boolean(e.target.id)&&window.location.replace("/CodersCamp2020.CookBook/recipe.html?id=".concat(e.target.id))});var S=document.querySelector(".navigationBtn"),w=document.querySelector(".navigationBox"),N=function(){w.classList.toggle("navigationBoxHidden")};S.addEventListener("click",function(e){N(),q()}),T.addEventListener("mouseenter",function(e){console.log("hej"),T.animate([{transform:"rotateY(0deg)"},{transform:"rotateY(360deg)"}],{duration:500,iteration:1})})};exports.MainMenu=l;
},{"../GlobalData.js":"PC6C"}],"OcLC":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.toggleMenuOpened=m,exports.replace=p,exports.doAnimation=f,exports.Random=I;var e=require("./MainMenu.js"),n=require("../GlobalData.js");(0,e.MainMenu)(n.MENU.randomRecipe);var t,r,o=document.querySelector("#recipiesRandom"),a=document.querySelector(".navigationBtn"),i="fa79327224724e9da0b733fdcc9720d4",c=document.querySelector("form button"),d=document.querySelector("form input"),l=document.querySelector(".backdrop");function m(){document.querySelector("#contentRandom").classList.toggle("menuOpened")}function u(){o.replaceChildren(),fetch("https://api.spoonacular.com/recipes/random?apiKey=".concat(i)).then(function(e){if(!e.ok)throw new Error("Ups...  Something went wrong!");return e.json()}).then(function(e){console.log("Data from API:",e);var n=document.createElement("img");n.setAttribute("src",e.recipes[0].image),o.appendChild(n);var t=document.createElement("div");t.innerHTML=" <h4>Ingerdients:</h4> ".concat(function(){for(var n=[],t=0;t<e.recipes[0].extendedIngredients.length;t++)n.push(e.recipes[0].extendedIngredients[t].name);return n}()),o.appendChild(t);var r=document.createElement("div");r.innerHTML=" <h3>Instruction:</h3> ".concat(e.recipes[0].instructions),o.appendChild(r)}).catch(function(e){o.innerHTML="<p>".concat(e,"</p>"),console.log(e)})}function s(){"Stop show random in interval"===document.getElementById("randomIntervalBtn").textContent.trim()&&(p(),clearInterval(t),clearInterval(r),document.getElementById("myAnimation").style.left=0);u()}function p(){var e=document.getElementById("randomIntervalBtn"),n="Start show random in interval",t="Stop show random in interval",r=e.innerHTML.replace(n,t),o=e.innerHTML.replace(t,n);"Start show random in interval"===e.textContent.trim()?e.innerHTML=r:e.innerHTML=o}function v(){"Start show random in interval"===document.getElementById("randomIntervalBtn").textContent.trim()?(p(),u(),f(),t=setInterval(function(){u(),f()},1e4)):(p(),clearInterval(t),clearInterval(r),document.getElementById("myAnimation").style.left=0)}function f(){var e=document.getElementById("myAnimation"),n=0;r=setInterval(function(){98==n?clearInterval(r):(n+=.5,e.style.left=n+"%")},50)}function I(){document.getElementById("recipiesRandom").style.background="#ededed",a.addEventListener("click",m),l.firstElementChild.firstElementChild.addEventListener("click",function(e){e.preventDefault(),m()}),l.addEventListener("click",function(){m()}),document.getElementById("randomBtn").addEventListener("click",s),document.getElementById("randomIntervalBtn").addEventListener("click",v),window.addEventListener("beforeunload",function(e){e.preventDefault(),e.clearInterval(t),e.clearInterval(r)})}
},{"./MainMenu.js":"ecPM","../GlobalData.js":"PC6C"}],"mKnx":[function(require,module,exports) {
"use strict";var a=require("./app/Random.js");(0,a.Random)();
},{"./app/Random.js":"OcLC"}]},{},["mKnx"], null)
//# sourceMappingURL=random.960242fe.js.map