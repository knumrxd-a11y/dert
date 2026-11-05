(function(){const h=document.getElementById('h3'),sp=document.getElementById('hs'),sh=document.querySelector('.hshadow');
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;let ang=-14,vel=0,dn=false,lx=0,mv=0;
(function f(){if(!dn){if(Math.abs(vel)>.05){ang+=vel;vel*=.95}else if(!calm)ang+=.35}
sp.style.transform=`rotateY(${ang}deg)`;sh.style.transform=`translateX(-50%) scaleX(${.55+.45*Math.abs(Math.cos(ang*Math.PI/180))})`;requestAnimationFrame(f)})();
h.onpointerdown=e=>{dn=true;lx=e.clientX;mv=0;vel=0;h.setPointerCapture(e.pointerId)};
h.onpointermove=e=>{if(!dn)return;const dx=e.clientX-lx;lx=e.clientX;ang+=dx*.45;vel=dx*.45;mv+=Math.abs(dx)};
h.onpointerup=h.onpointercancel=()=>{if(!dn)return;dn=false;if(mv<5){vel=16;navigator.vibrate&&navigator.vibrate(12)}}})();

(function(){const r=document.querySelector('.rail');if(!r)return;
const on=r.querySelector('.on');if(on)r.scrollLeft=on.offsetLeft-(r.clientWidth-on.offsetWidth)/2;
let d=0,x=0,s=0,mv=0;
r.addEventListener('dragstart',e=>e.preventDefault());
r.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse')return;d=1;x=e.clientX;s=r.scrollLeft;mv=0});
addEventListener('pointermove',e=>{if(!d)return;const dx=e.clientX-x;mv=Math.max(mv,Math.abs(dx));if(mv>5)r.classList.add('dg');r.scrollLeft=s-dx});
addEventListener('pointerup',()=>{d=0;r.classList.remove('dg')});
r.addEventListener('click',e=>{if(mv>5){e.preventDefault();e.stopPropagation();mv=0}},true);
const b=document.createElement('div');b.className='rb';b.innerHTML='<button aria-label="Previous">←</button><button aria-label="Next">→</button>';r.parentNode.appendChild(b);
b.onclick=e=>{const t=e.target.closest('button');if(t)r.scrollBy({left:(t===b.firstChild?-1:1)*r.clientWidth*.6,behavior:'smooth'})};})();