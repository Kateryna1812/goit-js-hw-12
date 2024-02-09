import{S as L,a as u,i as F}from"./assets/vendor-5401a4b0.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const v="/goit-js-hw-12/assets/dang-75a3a476.svg",p="/goit-js-hw-12/assets/err-d9947029.svg",w="/goit-js-hw-12/assets/x-a193917d.svg",x=new L(".gallery a",{captionDelay:250,captionsData:"alt"}),g=document.querySelector(".form"),c=document.querySelector(".gallery"),f=document.querySelector(".loader-and-btn");g.addEventListener("submit",S);let h,i,l;function S(e){e.preventDefault(),y();const o=e.target.keyword.value.trim();o&&(i=1,l=15,h=o,c.innerHTML="",m(),g.reset())}function y(){const e=document.querySelector(".btn-load-more");e!==null&&(e.removeEventListener("click",m),e.remove())}async function m(){f.insertAdjacentHTML("afterbegin",'<span class="loader"></span>');try{const e=await $();i+=1,I(e.data)}catch(e){d({message:e.message,backgroundColor:"#EF4040",iconUrl:p})}}async function $(){return u.defaults.baseURL="https://pixabay.com",u.get("api/",{params:{key:"25786434-348adb767e319176b4ad356ea",q:h,image_type:"photo",orientation:"horizontal",safesearch:!0,page:i,per_page:l}})}function I({totalHits:e,hits:o}){if(b(),parseInt(e)>0){const n=Math.ceil(e/l);c.innerHTML===""&&e>l&&(f.insertAdjacentHTML("beforeend",'<button class="btn-load-more">Load more</button>'),document.querySelector(".btn-load-more").addEventListener("click",m)),i>n&&(y(),d({message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#FFA000",iconUrl:v}));const s=o.map(q).join("");c.insertAdjacentHTML("beforeend",s),i>2&&M(),x.refresh()}else d({message:error.message,backgroundColor:"#EF4040",iconUrl:p})}function M(){const o=document.querySelector(".card").getBoundingClientRect();window.scrollBy({top:o.height*2,left:o.left,behavior:"smooth"})}function b(){const e=document.querySelector(".loader");e!==null&&e.remove()}function q({webformatURL:e,largeImageURL:o,tags:n,likes:s,views:t,comments:r,downloads:a}){return`
<ul class="card">
  <a class="gallery-link" href="${o}">
    <img class="gallery-image" src="${e}" alt="${n}">
  </a>
  <ul class="item-img">
    <li class="elem-img">
      <p class="elem-name">Likes</p>
      <p>${s}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Views</p>
      <p>${t}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Comments</p>
      <p>${r}</p>
    </li>
    <li class="elem-img">
      <p class="elem-name">Downloads</p>
      <p>${a}</p>
    </li>
  </ul>
</ul>
`}function d({message:e,backgroundColor:o,iconUrl:n}){b(),F.show({titleColor:"#FFFFFF",message:`${e}`,messageColor:"#FFFFFF",messageSize:"16px",backgroundColor:`${o}`,iconUrl:`${n}`,position:"topRight",close:!1,buttons:[[`<button type="button" style="
          background-color: ${o}; 
          width: 20px; 
          height: 20px; 
          padding: 5px">
            <img style="
              width: 10px; 
              height: 10px" 
                src=${w}>
        </button>`,function(s,t){s.hide({transitionOut:"fadeOut"},t)}]]})}
//# sourceMappingURL=commonHelpers.js.map
