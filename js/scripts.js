const w=(e,t)=>{let l="M 0 50";for(let o=0;o<=100;o+=.5){let r=50+e*Math.sin(o/100*Math.PI*t);l+=` L ${o} ${r}`}return l},i=()=>{let e=[...document.querySelectorAll(".w path")];e.forEach((e,t)=>{let l=20-5*t,o=4+2*t;e.setAttribute("d",w(l,o))})},m=()=>{let e=document.createElement("canvas"),t=e.getContext("2d");document.querySelector(".m").appendChild(e);let l=()=>{e.width=innerWidth,e.height=innerHeight};l(),addEventListener("resize",l);let o=e.width/14,r=Array(Math.floor(o)).fill(1);setInterval(()=>{t.fillStyle="rgba(0,0,0,.02)",t.fillRect(0,0,e.width,e.height),t.fillStyle="var(--m)",t.font="14px monospace";for(let l=0;l<r.length;l++)t.fillText("01"[2*Math.random()|0],14*l,14*r[l]),14*r[l]>e.height&&Math.random()>.975&&(r[l]=0),r[l]++},35)},s=e=>{let t=document.getElementById(e);t&&(t.scrollIntoView({behavior:"smooth"}),document.querySelectorAll(".o").forEach(t=>{t.classList.remove("active"),t.dataset.s===e&&t.classList.add("active")}))},p=()=>{let e=document.querySelectorAll(".k");addEventListener("scroll",()=>{e.forEach(e=>{let t=e.getBoundingClientRect();if(t.top<innerHeight&&t.bottom>0){let l=(innerHeight-t.top)*.1;e.style.transform=`translateY(${l}px)`}})})},q=()=>{document.querySelectorAll(".r").forEach(e=>{e.onmouseover=()=>{e.style.borderColor="var(--o)",e.style.transform="scale(1.02)",e.style.boxShadow="0 10px 30px var(--s)"},e.onmouseout=()=>{e.style.borderColor="var(--s)",e.style.transform="scale(1)",e.style.boxShadow="none"}})},a=()=>{document.querySelectorAll(".k").forEach(e=>{e.onmousemove=t=>{let{left:l,top:o,width:r,height:c}=e.getBoundingClientRect(),n=(t.clientX-l)/r,$=(t.clientY-o)/c;e.style.transform=`perspective(1000px) rotateY(${(n-.5)*10}deg) rotateX(${-(($-.5)*10)}deg) translateY(-8px)`,e.style.backgroundImage=`radial-gradient(circle at ${100*n}% ${100*$}%, var(--s) 0%, transparent 50%)`},e.onmouseleave=()=>{e.style.transform="translateY(0)",e.style.backgroundImage="none"}})};addEventListener("DOMContentLoaded",()=>{m(),i(),p(),q(),a(),document.querySelectorAll(".o").forEach(e=>e.onclick=()=>s(e.dataset.s)),document.querySelector(".l").onclick=e=>{e.preventDefault(),scrollTo({top:0,behavior:"smooth"})};let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(document.querySelectorAll(".o").forEach(t=>{t.classList.remove("active"),t.dataset.s===e.target.id&&t.classList.add("active")}),e.target.classList.add("visible"))})},{threshold:.5});document.querySelectorAll("section").forEach(t=>e.observe(t))}),addEventListener("popstate",()=>{let e=location.hash.slice(1);e&&s(e)}),addEventListener("load",()=>{let e=location.hash.slice(1);e&&setTimeout(()=>s(e),100)});