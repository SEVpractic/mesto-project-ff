(()=>{"use strict";function e(e,n,r,o,c){var u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),a=u.querySelector(".card__image"),i=u.querySelector(".card__title"),l=u.querySelector(".card__delete-button"),s=u.querySelector(".card__like-button");return a.src=n.link||"",i.textContent=n.name||"",t(u,n,e),n.owner._id===e?l.addEventListener("click",(function(){return r(u,n._id)})):l.remove(),s.addEventListener("click",(function(){return o(u,n).then((function(e){return n=e})).catch((function(e){console.log(e)}))})),c(a,i),u}function t(e,t,n){var r=e.querySelector(".card__like-button");e.querySelector(".card__like-count").textContent=t.likes.length,r.classList.toggle("card__like-button_is-active",t.likes.some((function(e){return e._id===n})))}function n(e){e.addEventListener("click",o),document.addEventListener("keydown",c),e.classList.remove("popup_is-animated"),e.classList.add("popup_is-opened")}function r(e){e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),e.removeEventListener("click",o),document.removeEventListener("keydown",c)}function o(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&r(e.currentTarget)}function c(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function u(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function a(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function i(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){u(e,n,t)})),a(n,r,t)}var l="https://nomoreparties.co/v1/wff-cohort-36",s={authorization:"61d5fff1-2f3d-4042-8577-25fe07acbd29","Content-Type":"application/json"};function p(e){return f("".concat(l,"/cards/likes/").concat(e),"PUT",s)}function d(e){return f("".concat(l,"/cards/likes/").concat(e),"DELETE",s)}function f(e,t,n,r){return fetch(e,{method:t,headers:n,body:JSON.stringify(r)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}function _(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,y=document.querySelector(".places__list"),v=document.querySelector(".profile__image"),S=document.querySelector(".profile__title"),b=document.querySelector(".profile__description"),q=document.querySelector(".popup_type_edit"),g=document.querySelector('.popup__form[name="edit-profile"]'),h=g.querySelector(".popup__input_type_name"),E=g.querySelector(".popup__input_type_description"),C=document.querySelector(".profile__edit-button"),L=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_new-card"),x=document.querySelector('.popup__form[name="new-place"]'),A=x.querySelector(".popup__input_type_card-name"),T=x.querySelector(".popup__input_type_url"),w=document.querySelector(".popup_type_image"),j=w.querySelector(".popup__image"),B=w.querySelector(".popup__caption"),D=document.querySelector(".popup_type_image-edit"),I=document.querySelector('.popup__form[name="image-edit"]'),P=I.querySelector(".popup__input_type_url"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_error",errorClass:"popup__input-error_visible"};function O(e,t){e.addEventListener("click",(function(r){r.preventDefault(),j.src=e.src,B.textContent=t.textContent,n(w)}))}function G(e,t){(function(e){return f("".concat(l,"/cards/").concat(e),"DELETE",s)})(t).then((function(t){var n;(n=e)&&n.remove()})).catch((function(e){console.log(e)}))}function H(e,n){return(n.likes.some((function(e){return e._id===m}))?d:p)(n._id).then((function(n){return t(e,n,m),n})).catch((function(e){console.log(e)}))}function N(e,t){var n=e.querySelector('button[type="submit"]');n&&(n.textContent=t?"Сохранение...":"Сохранить")}Promise.all([f("".concat(l,"/users/me"),"GET",s),f("".concat(l,"/cards"),"GET",s)]).then((function(t){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=t)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(n,r)||function(e,t){if(e){if("string"==typeof e)return _(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],u=o[1];m=c._id,S.textContent=c.name,b.textContent=c.about,v.style.backgroundImage="url('".concat(c.avatar,"')"),u.forEach((function(t){y.append(e(m,t,G,H,O))}))})).catch((function(e){console.log(e)})),C.addEventListener("click",(function(){g.reset(),h.value=S.textContent,E.value=b.textContent,i(g,M),n(q)})),g.addEventListener("submit",(function(e){var t,n;e.preventDefault(),N(g,!0),(t=h.value,n=E.value,f("".concat(l,"/users/me"),"PATCH",s,{name:t,about:n})).then((function(e){S.textContent=e.name,b.textContent=e.about})).catch((function(e){console.log(e)})).finally((function(){return N(g,!1)})),r(q)})),L.addEventListener("click",(function(e){x.reset(),i(x,M),n(k)})),x.addEventListener("submit",(function(t){var n,o;t.preventDefault(),N(g,!0),(n=A.value,o=T.value,f("".concat(l,"/cards"),"POST",s,{name:n,link:o})).then((function(t){y.prepend(e(m,t,G,H,O))})).finally((function(){return N(g,!1)})),r(k)})),v.addEventListener("click",(function(e){I.reset();var t=getComputedStyle(v).backgroundImage;P.value=t.replace(/url\(["']?(.*?)["']?\)/,"$1"),i(I,M),n(D)})),I.addEventListener("submit",(function(e){var t;e.preventDefault(),N(g,!0),(t=P.value,f("".concat(l,"/users/me/avatar"),"PATCH",s,{avatar:t})).then((function(e){v.style.backgroundImage="url('".concat(e.avatar,"')")})).catch((function(e){console.log(e)})).finally((function(){return N(g,!1)})),r(D)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch&&t.dataset.patternErrorMessage?t.setCustomValidity(t.dataset.patternErrorMessage):t.setCustomValidity(""),t.validity.valid?u(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),a(n,r,t)}))}))}(t,e)}))}(M)})();