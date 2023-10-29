(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(i){if(i.ep)return;i.ep=!0;const l=s(i);fetch(i.href,l)}})();const de={context:void 0,registry:void 0},he=(e,t)=>e===t,ge=Symbol("solid-track"),j={equals:he};let ie=ce;const C=1,D=2,le={owned:null,cleanups:null,context:null,owner:null};var d=null;let K=null,a=null,g=null,v=null,V=0;function T(e,t){const s=a,n=d,i=e.length===0,l=t===void 0?n:t,o=i?le:{owned:null,cleanups:null,context:l?l.context:null,owner:l},r=i?e:()=>e(()=>x(()=>q(o)));d=o,a=null;try{return N(r,!0)}finally{a=s,d=n}}function I(e,t){t=t?Object.assign({},j,t):j;const s={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},n=i=>(typeof i=="function"&&(i=i(s.value)),oe(s,i));return[re.bind(s),n]}function O(e,t,s){const n=Z(e,t,!1,C);M(n)}function _e(e,t,s){ie=be;const n=Z(e,t,!1,C);(!s||!s.render)&&(n.user=!0),v?v.push(n):M(n)}function L(e,t,s){s=s?Object.assign({},j,s):j;const n=Z(e,t,!0,0);return n.observers=null,n.observerSlots=null,n.comparator=s.equals||void 0,M(n),re.bind(n)}function x(e){if(a===null)return e();const t=a;a=null;try{return e()}finally{a=t}}function X(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function pe(){return d}function $e(e,t){const s=d,n=a;d=e,a=null;try{return N(t,!0)}catch(i){z(i)}finally{d=s,a=n}}function ye(e){const t=L(e),s=L(()=>J(t()));return s.toArray=()=>{const n=s();return Array.isArray(n)?n:n!=null?[n]:[]},s}function re(){if(this.sources&&this.state)if(this.state===C)M(this);else{const e=g;g=null,N(()=>W(this),!1),g=e}if(a){const e=this.observers?this.observers.length:0;a.sources?(a.sources.push(this),a.sourceSlots.push(e)):(a.sources=[this],a.sourceSlots=[e]),this.observers?(this.observers.push(a),this.observerSlots.push(a.sources.length-1)):(this.observers=[a],this.observerSlots=[a.sources.length-1])}return this.value}function oe(e,t,s){let n=e.value;return(!e.comparator||!e.comparator(n,t))&&(e.value=t,e.observers&&e.observers.length&&N(()=>{for(let i=0;i<e.observers.length;i+=1){const l=e.observers[i],o=K&&K.running;o&&K.disposed.has(l),(o?!l.tState:!l.state)&&(l.pure?g.push(l):v.push(l),l.observers&&fe(l)),o||(l.state=C)}if(g.length>1e6)throw g=[],new Error},!1)),t}function M(e){if(!e.fn)return;q(e);const t=d,s=a,n=V;a=d=e,me(e,e.value,n),a=s,d=t}function me(e,t,s){let n;try{n=e.fn(t)}catch(i){return e.pure&&(e.state=C,e.owned&&e.owned.forEach(q),e.owned=null),e.updatedAt=s+1,z(i)}(!e.updatedAt||e.updatedAt<=s)&&(e.updatedAt!=null&&"observers"in e?oe(e,n):e.value=n,e.updatedAt=s)}function Z(e,t,s,n=C,i){const l={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:d?d.context:null,pure:s};return d===null||d!==le&&(d.owned?d.owned.push(l):d.owned=[l]),l}function F(e){if(e.state===0)return;if(e.state===D)return W(e);if(e.suspense&&x(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<V);)e.state&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===C)M(e);else if(e.state===D){const n=g;g=null,N(()=>W(e,t[0]),!1),g=n}}function N(e,t){if(g)return e();let s=!1;t||(g=[]),v?s=!0:v=[],V++;try{const n=e();return we(s),n}catch(n){s||(v=null),g=null,z(n)}}function we(e){if(g&&(ce(g),g=null),e)return;const t=v;v=null,t.length&&N(()=>ie(t),!1)}function ce(e){for(let t=0;t<e.length;t++)F(e[t])}function be(e){let t,s=0;for(t=0;t<e.length;t++){const n=e[t];n.user?e[s++]=n:F(n)}for(t=0;t<s;t++)F(e[t])}function W(e,t){e.state=0;for(let s=0;s<e.sources.length;s+=1){const n=e.sources[s];if(n.sources){const i=n.state;i===C?n!==t&&(!n.updatedAt||n.updatedAt<V)&&F(n):i===D&&W(n,t)}}}function fe(e){for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];s.state||(s.state=D,s.pure?g.push(s):v.push(s),s.observers&&fe(s))}}function q(e){let t;if(e.sources)for(;e.sources.length;){const s=e.sources.pop(),n=e.sourceSlots.pop(),i=s.observers;if(i&&i.length){const l=i.pop(),o=s.observerSlots.pop();n<i.length&&(l.sourceSlots[o]=n,i[n]=l,s.observerSlots[n]=o)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)q(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function ve(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function z(e,t=d){throw ve(e)}function J(e){if(typeof e=="function"&&!e.length)return J(e());if(Array.isArray(e)){const t=[];for(let s=0;s<e.length;s++){const n=J(e[s]);Array.isArray(n)?t.push.apply(t,n):t.push(n)}return t}return e}const Ae=Symbol("fallback");function ee(e){for(let t=0;t<e.length;t++)e[t]()}function Ce(e,t,s={}){let n=[],i=[],l=[],o=0,r=t.length>1?[]:null;return X(()=>ee(l)),()=>{let f=e()||[],u,c;return f[ge],x(()=>{let h=f.length,$,w,P,U,H,y,m,b,E;if(h===0)o!==0&&(ee(l),l=[],n=[],i=[],o=0,r&&(r=[])),s.fallback&&(n=[Ae],i[0]=T(ae=>(l[0]=ae,s.fallback())),o=1);else if(o===0){for(i=new Array(h),c=0;c<h;c++)n[c]=f[c],i[c]=T(p);o=h}else{for(P=new Array(h),U=new Array(h),r&&(H=new Array(h)),y=0,m=Math.min(o,h);y<m&&n[y]===f[y];y++);for(m=o-1,b=h-1;m>=y&&b>=y&&n[m]===f[b];m--,b--)P[b]=i[m],U[b]=l[m],r&&(H[b]=r[m]);for($=new Map,w=new Array(b+1),c=b;c>=y;c--)E=f[c],u=$.get(E),w[c]=u===void 0?-1:u,$.set(E,c);for(u=y;u<=m;u++)E=n[u],c=$.get(E),c!==void 0&&c!==-1?(P[c]=i[u],U[c]=l[u],r&&(H[c]=r[u]),c=w[c],$.set(E,c)):l[u]();for(c=y;c<h;c++)c in P?(i[c]=P[c],l[c]=U[c],r&&(r[c]=H[c],r[c](c))):i[c]=T(p);i=i.slice(0,o=h),n=f.slice(0)}return i});function p(h){if(l[c]=h,r){const[$,w]=I(c);return r[c]=w,t(f[c],$)}return t(f[c])}}}function _(e,t){return x(()=>e(t||{}))}const Se=e=>`Stale read from <${e}>.`;function xe(e){const t="fallback"in e&&{fallback:()=>e.fallback};return L(Ce(()=>e.each,e.children,t||void 0))}function Ee(e){let t=!1;const s=(l,o)=>l[0]===o[0]&&(t?l[1]===o[1]:!l[1]==!o[1])&&l[2]===o[2],n=ye(()=>e.children),i=L(()=>{let l=n();Array.isArray(l)||(l=[l]);for(let o=0;o<l.length;o++){const r=l[o].when;if(r)return t=!!l[o].keyed,[o,r,l[o]]}return[-1]},void 0,{equals:s});return L(()=>{const[l,o,r]=i();if(l<0)return e.fallback;const f=r.children;return typeof f=="function"&&f.length>0?x(()=>f(t?o:()=>{if(x(i)[0]!==l)throw Se("Match");return r.when})):f},void 0,void 0)}function Q(e){return e}function ke(e,t,s){let n=s.length,i=t.length,l=n,o=0,r=0,f=t[i-1].nextSibling,u=null;for(;o<i||r<l;){if(t[o]===s[r]){o++,r++;continue}for(;t[i-1]===s[l-1];)i--,l--;if(i===o){const c=l<n?r?s[r-1].nextSibling:s[l-r]:f;for(;r<l;)e.insertBefore(s[r++],c)}else if(l===r)for(;o<i;)(!u||!u.has(t[o]))&&t[o].remove(),o++;else if(t[o]===s[l-1]&&s[r]===t[i-1]){const c=t[--i].nextSibling;e.insertBefore(s[r++],t[o++].nextSibling),e.insertBefore(s[--l],c),t[i]=s[l]}else{if(!u){u=new Map;let p=r;for(;p<l;)u.set(s[p],p++)}const c=u.get(t[o]);if(c!=null)if(r<c&&c<l){let p=o,h=1,$;for(;++p<i&&p<l&&!(($=u.get(t[p]))==null||$!==c+h);)h++;if(h>c-r){const w=t[o];for(;r<c;)e.insertBefore(s[r++],w)}else e.replaceChild(s[r++],t[o++])}else o++;else t[o++].remove()}}}const te="_$DX_DELEGATE";function Le(e,t,s,n={}){let i;return T(l=>{i=l,t===document?e():A(t,e(),t.firstChild?null:void 0,s)},n.owner),()=>{i(),t.textContent=""}}function S(e,t,s){let n;const i=()=>{const o=document.createElement("template");return o.innerHTML=e,s?o.content.firstChild.firstChild:o.content.firstChild},l=t?()=>x(()=>document.importNode(n||(n=i()),!0)):()=>(n||(n=i())).cloneNode(!0);return l.cloneNode=l,l}function B(e,t=window.document){const s=t[te]||(t[te]=new Set);for(let n=0,i=e.length;n<i;n++){const l=e[n];s.has(l)||(s.add(l),t.addEventListener(l,Pe))}}function R(e,t,s){s==null?e.removeAttribute(t):e.setAttribute(t,s)}function ue(e,t){t==null?e.removeAttribute("class"):e.className=t}function Ne(e,t,s,n){if(n)Array.isArray(s)?(e[`$$${t}`]=s[0],e[`$$${t}Data`]=s[1]):e[`$$${t}`]=s;else if(Array.isArray(s)){const i=s[0];e.addEventListener(t,s[0]=l=>i.call(e,s[1],l))}else e.addEventListener(t,s)}function A(e,t,s,n){if(s!==void 0&&!n&&(n=[]),typeof t!="function")return G(e,t,n,s);O(i=>G(e,t(),i,s),n)}function Pe(e){const t=`$$${e.type}`;let s=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==s&&Object.defineProperty(e,"target",{configurable:!0,value:s}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return s||document}});s;){const n=s[t];if(n&&!s.disabled){const i=s[`${t}Data`];if(i!==void 0?n.call(s,i,e):n.call(s,e),e.cancelBubble)return}s=s._$host||s.parentNode||s.host}}function G(e,t,s,n,i){for(;typeof s=="function";)s=s();if(t===s)return s;const l=typeof t,o=n!==void 0;if(e=o&&s[0]&&s[0].parentNode||e,l==="string"||l==="number")if(l==="number"&&(t=t.toString()),o){let r=s[0];r&&r.nodeType===3?r.data=t:r=document.createTextNode(t),s=k(e,s,n,r)}else s!==""&&typeof s=="string"?s=e.firstChild.data=t:s=e.textContent=t;else if(t==null||l==="boolean")s=k(e,s,n);else{if(l==="function")return O(()=>{let r=t();for(;typeof r=="function";)r=r();s=G(e,r,s,n)}),()=>s;if(Array.isArray(t)){const r=[],f=s&&Array.isArray(s);if(Y(r,t,s,i))return O(()=>s=G(e,r,s,n,!0)),()=>s;if(r.length===0){if(s=k(e,s,n),o)return s}else f?s.length===0?se(e,r,n):ke(e,s,r):(s&&k(e),se(e,r));s=r}else if(t.nodeType){if(Array.isArray(s)){if(o)return s=k(e,s,n,t);k(e,s,null,t)}else s==null||s===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);s=t}}return s}function Y(e,t,s,n){let i=!1;for(let l=0,o=t.length;l<o;l++){let r=t[l],f=s&&s[l],u;if(!(r==null||r===!0||r===!1))if((u=typeof r)=="object"&&r.nodeType)e.push(r);else if(Array.isArray(r))i=Y(e,r,f)||i;else if(u==="function")if(n){for(;typeof r=="function";)r=r();i=Y(e,Array.isArray(r)?r:[r],Array.isArray(f)?f:[f])||i}else e.push(r),i=!0;else{const c=String(r);f&&f.nodeType===3&&f.data===c?e.push(f):e.push(document.createTextNode(c))}}return i}function se(e,t,s=null){for(let n=0,i=t.length;n<i;n++)e.insertBefore(t[n],s)}function k(e,t,s,n){if(s===void 0)return e.textContent="";const i=n||document.createTextNode("");if(t.length){let l=!1;for(let o=t.length-1;o>=0;o--){const r=t[o];if(i!==r){const f=r.parentNode===e;!l&&!o?f?e.replaceChild(i,r):e.insertBefore(i,s):f&&r.remove()}else l=!0}}else e.insertBefore(i,s);return[i]}const Te="http://www.w3.org/2000/svg";function Oe(e,t=!1){return t?document.createElementNS(Te,e):document.createElement(e)}function Ie(e){const{useShadow:t}=e,s=document.createTextNode(""),n=()=>e.mount||document.body,i=pe();let l,o=!!de.context;return _e(()=>{l||(l=$e(i,()=>L(()=>e.children)));const r=n();if(r instanceof HTMLHeadElement){const[f,u]=I(!1),c=()=>u(!0);T(p=>A(r,()=>f()?p():l(),null)),X(c)}else{const f=Oe(e.isSVG?"g":"div",e.isSVG),u=t&&f.attachShadow?f.attachShadow({mode:"open"}):f;Object.defineProperty(f,"_$host",{get(){return s.parentNode},configurable:!0}),A(u,l),r.appendChild(f),e.ref&&e.ref(f),X(()=>r.removeChild(f))}},void 0,{render:!o}),s}const Me="/assets/logo-94ae3f6c.svg",Be=S("<header class=header><div class=logo><a class=logo__link href=/><img>");function Re(){return(()=>{const e=Be(),t=e.firstChild,s=t.firstChild,n=s.firstChild;return R(n,"src",Me),e})()}const Ue="/assets/noc-86e31d13.svg",He=S("<div class=info><div class=info__circle><div class=info__circle-inner><img></div></div><div class=info__status><p class=info__status-text>Status: <span class=info__status_blue>No Connected</span></p><div class=info__screen>wait connection....");function je(){return(()=>{const e=He(),t=e.firstChild,s=t.firstChild,n=s.firstChild;return R(n,"src",Ue),e})()}const De="/assets/settings-8a33ac4c.svg";const Fe="/assets/fastc-4fbf26e5.svg",We=S("<div><div class=modal__overlay><div class=modal__content><div class=modal__block><img><h1 class=modal__title>Fast Connection</h1><p class=modal__description>This method use our list with proxy");function Ge({isOpen:e,closeModal:t,changePage:s}){return _(Ie,{get mount(){return document.getElementById("modal")},get children(){const n=We(),i=n.firstChild,l=i.firstChild,o=l.firstChild,r=o.firstChild;return i.$$click=()=>t(),Ne(o,"click",s,!0),R(r,"src",Fe),O(()=>ue(n,e()?"modal":"modal modal_close")),n}})}B(["click"]);const Ve=S("<div class=manage><button class=manage__button>Connect</button><button class=manage__settings><img>");function qe({changePage:e}){const[t,s]=I(!1),n=()=>{s(!t())};return[(()=>{const i=Ve(),l=i.firstChild,o=l.nextSibling,r=o.firstChild;return l.$$click=n,o.$$click=()=>e("/settings"),R(r,"src",De),i})(),_(Ge,{isOpen:t,closeModal:()=>s(!1),changePage:()=>e("/list")})]}B(["click"]);const Ke="/assets/return-babf096c.svg";const Qe=S("<div class=switch><div>");function ne(){const[e,t]=I(!1),s=()=>{t(!e())};return(()=>{const n=Qe(),i=n.firstChild;return n.$$click=s,O(()=>ue(i,e()?"switch__point switch__point_active":"switch__point")),n})()}B(["click"]);const Xe=S('<div class=settings><header class=settings__header><button class=settings__btn-to-previous><img alt=return-icon><p>Settings</p></button></header><div class=settings__content><div class=settings__block><div class=settings__text-block><h2 class=settings__title>Bypass list</h2><h3 class=settings__subtitle>Write sites with запятая</h3></div><textarea class=settings__input placeholder="Write somthing..."></textarea></div><div class="settings__block settings__block_horizontal"><div class=settings__text-block><h2 class=settings__title>Warrnings</h2><h3 class=settings__subtitle>Останавливать загрузку сайта при отключённом состоянии</h3></div><div class=settings__switch></div></div><div class="settings__block settings__block_horizontal"><div class=settings__text-block><h2 class=settings__title>Incognito</h2><h3 class=settings__subtitle>Work in incognito</h3></div><div class=settings__switch></div></div></div><div class=settings__manage><button class=settings__manage-btn>Save');function Je({changePage:e}){return(()=>{const t=Xe(),s=t.firstChild,n=s.firstChild,i=n.firstChild,l=s.nextSibling,o=l.firstChild,r=o.firstChild,f=r.nextSibling,u=o.nextSibling,c=u.firstChild,p=c.nextSibling,h=u.nextSibling,$=h.firstChild,w=$.nextSibling;return n.$$click=()=>e("/"),R(i,"src",Ke),f.style.setProperty("width","100%"),f.style.setProperty("height","100px"),f.style.setProperty("resize","none"),A(p,_(ne,{})),A(w,_(ne,{})),t})()}B(["click"]);const Ye=[{ip:"124.536.36.35",port:2400,country:"RU",schema:"https"},{ip:"124.536.36.35",port:2400,country:"RU",schema:"https"}],Ze=S("<div class=list>"),ze=S("<button class=list__button><div class=list__flag></div><div class=list__info><h2 class=list__title></h2><p class=list__text>");function et({changePage:e}){function t(s){e("/")}return(()=>{const s=Ze();return A(s,_(xe,{each:Ye,children:n=>(()=>{const i=ze(),l=i.firstChild,o=l.nextSibling,r=o.firstChild,f=r.nextSibling;return i.$$click=()=>t(),A(r,()=>n.country),A(f,()=>n.schema+" | "+n.ip+" | "+n.port),i})()})),s})()}B(["click"]);function tt(){const[e,t]=I("/");return[_(Re,{}),_(Ee,{get children(){return[_(Q,{get when(){return e()==="/"},get children(){return[_(je,{}),_(qe,{changePage:t})]}}),_(Q,{get when(){return e()==="/settings"},get children(){return _(Je,{changePage:t})}}),_(Q,{get when(){return e()==="/list"},get children(){return _(et,{changePage:t})}})]}})]}const st=document.getElementById("root");Le(()=>_(tt,{}),st);
