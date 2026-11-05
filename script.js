/* ───────── CONFIG ─────────
   ใส่ลิงก์หน้าเว็บสินค้าจริงของแต่ละตัวตรงนี้ (ถ้าเว้นว่าง QR จะพาไปที่ลิงก์ของเว็บนี้ + #รหัสสินค้า
   ซึ่งจะเปิดหน้าสินค้านั้นขึ้นมาอัตโนมัติ)  เช่น  'MARS-001':'https://orbital.com/mars'  */
const LINKS={
'MARS-001':'mars.html',
'JUPITER-002':'jupiter.html',
'NEPTUNE-003':'neptune.html',
'PLUTO-004':'pluto-004.html',
'PLUTO-005':'pluto-005.html',
'URANUS-006':'uranus.html',
'EARTH-007':'earth.html'
};
const IMG={"download": ["images/mars.webp"], "download__1_": ["images/jupiter.webp"], "download__2_": ["images/neptune.webp"], "download__3_": ["images/pluto-004.webp"], "download__4_": ["images/pluto-005.webp"], "download__5_": ["images/uranus.webp"], "download__6_": ["images/earth.webp"]};
const P=[
{f:'download',n:'Mars',c:'MARS-001',k:'#e0764a',t:'Beyond the Ordinary',d:'Beyond what we know lies a universe of possibilities. ORBITAL transforms the familiar experience of water into a journey inspired by unexplored worlds.'},
{f:'download__1_',n:'Jupiter',c:'JUPITER-002',k:'#c9a26a',t:'Some Worlds Remain Unknown',d:'Every world holds a story waiting to be discovered. Follow the orbit, explore the unknown, and see water from a different perspective.'},
{f:'download__2_',n:'Neptune',c:'NEPTUNE-003',k:'#6fb7bd',t:'A Universe in Every Drop',d:'One element. Infinite worlds. A new perspective on water. A cosmic infusion designed to naturally restore your strength and inner focus.'},
{f:'download__3_',n:'Pluto',c:'PLUTO-004',k:'#a85fd6',t:'The Balance of Space',d:'Find your balance in every drop, where science meets nature’s perfection. Unlock the power of tranquility from the heart of a violet galaxy.'},
{f:'download__4_',n:'Pluto',c:'PLUTO-005',k:'#8d9399',t:'The Power of Minerals',d:'Essential minerals for a stronger body, sharper mind, and a balanced life. A cosmic infusion designed to naturally restore your strength and inner focus.'},
{f:'download__5_',n:'Uranus',c:'URANUS-006',k:'#4d63d6',t:'The Journey Continues',d:'Different worlds, same pure intention. Hydration for a better tomorrow. Across boundaries, unlocking the infinite purity of the cosmos.'},
{f:'download__6_',n:'Earth',c:'EARTH-007',k:'#7ea05f',t:'The Purity of Nature',d:'Pure, clean, and alive with nature’s minerals. A healthier you, for a brighter tomorrow. Discover the balance of life from the cosmic flora.'}];
P.forEach((p,i)=>p.b='images/back-'+String(i+1).padStart(3,'0')+'.webp'); // รูปด้านหลังเรียงตามหมายเลข 001–007
const $=s=>document.getElementById(s),R=document.documentElement;let cur=0;
const src=i=>IMG[P[i].f][0];
const base=()=>location.href.split('#')[0];
const link=p=>new URL(LINKS[p.c],location.href).href; // URL ที่ฝังใน QR
P.forEach(p=>{const im=new Image();im.src=p.b}); // preload ด้านหลัง

/* ───────── sound + haptic ───────── */
let AC;function rip(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();const n=AC.sampleRate*.4,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);
for(let i=0;i<n;i++){const t=i/n;d[i]=(Math.random()*2-1)*(1-t)*(.5+.5*Math.sin(i/70*(1+t*5)))*(Math.random()>.3?1:.25)}
const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();s.buffer=b;f.type='bandpass';f.frequency.value=2400;f.Q.value=.7;g.gain.value=.3;s.connect(f);f.connect(g);g.connect(AC.destination);s.start()}catch(e){}
navigator.vibrate&&navigator.vibrate([18,30,40])}

/* ───────── hero + grid ───────── */
$('g').innerHTML=P.map((p,i)=>`<button class="card" style="--k:${p.k};--src:url(${src(i)});transition-delay:${(i%3)*90}ms" data-i="${i}"><div class="in"><img src="${src(i)}" alt="${p.c}" loading="lazy"><u class="sh"></u></div><b>${p.c}</b><small>${p.t}</small></button>`).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.card').forEach(c=>{io.observe(c);const o=c.firstChild;
c.onpointermove=e=>{const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;o.style.transform=`rotateY(${x*18}deg) rotateX(${-y*18}deg) scale(1.04)`;c.style.setProperty('--mx',(x+.5)*100+'%');c.style.setProperty('--my',(y+.5)*100+'%');R.style.setProperty('--c',c.style.getPropertyValue('--k'))};
c.onpointerleave=()=>o.style.transform='';c.onclick=()=>openM(+c.dataset.i)});
addEventListener('pointermove',e=>{R.style.setProperty('--px',e.clientX+'px');R.style.setProperty('--py',e.clientY+'px')},{passive:true});

/* ───────── modal ───────── */
$('dt').innerHTML=P.map((_,i)=>`<span data-i="${i}"></span>`).join('');
$('dt').onclick=e=>e.target.dataset.i&&show(+e.target.dataset.i);
function qrInto(el,url){try{const q=qrcode(0,'M');q.addData(url);q.make();const n=q.getModuleCount();let d='';
for(let r=0;r<n;r++)for(let c=0;c<n;c++)if(q.isDark(r,c))d+=`M${c} ${r}h1v1h-1z`;
el.innerHTML=`<svg viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges"><path d="${d}" fill="#14110d"/></svg>`}catch(e){el.innerHTML=''}}
function drawQR(p){qrInto($('qr'),link(p))}
function show(i){cur=(i+P.length)%P.length;const p=P[cur],tk=$('tk');tk.classList.remove('torn','drag');$('mo').classList.remove('rv');$('flip').classList.remove('f');R.style.setProperty('--c',p.k);
const u=`url(${src(cur)})`;tk.style.setProperty('--src',u);$('sp').src=src(cur);
$('back').style.setProperty('--src',`url(${p.b})`);$('bk').src=p.b;drawQR(p);
$('cd').textContent='FLIGHT / MISSION · '+p.c;$('nm').textContent=p.t;$('ds').textContent=p.d;
const g=$('go');g.hidden=!LINKS[p.c];g.href=LINKS[p.c]||'#';
[...$('dt').children].forEach((d,j)=>d.classList.toggle('on',j==cur));
if($('mo').classList.contains('on'))history.replaceState(null,'','#'+p.c);
}
function flip(){$('flip').classList.toggle('f')}
function tear(){const tk=$('tk');if(tk.classList.contains('torn'))return;tk.classList.add('torn');$('mo').classList.add('rv');rip();
for(let i=0;i<9;i++){const b=document.createElement('div');b.className='pop';const s=8+Math.random()*16;
b.style.cssText+=`width:${s}px;height:${s}px;left:${68+Math.random()*30}%;top:${30+Math.random()*50}%;animation-delay:${Math.random()*.4}s`;tk.appendChild(b);setTimeout(()=>b.remove(),2000)}}
function openM(i){$('mo').classList.add('on');document.body.style.overflow='hidden';show(i)}
function closeM(){$('mo').classList.remove('on');document.body.style.overflow='';history.replaceState(null,'',location.pathname+location.search)}
function scan(){const q=$('qr');q.classList.add('ok');navigator.vibrate&&navigator.vibrate(25);
setTimeout(()=>{q.classList.remove('ok');const p=P[cur];if(LINKS[p.c]){tear();setTimeout(()=>window.goTo?goTo(LINKS[p.c]):location.href=LINKS[p.c],700)}else tear()},420)}
let drag=null;const st=$('stub');
st.onpointerdown=e=>{if($('tk').classList.contains('torn'))return;drag={x:e.clientX,y:e.clientY};st.setPointerCapture(e.pointerId);$('tk').classList.add('drag');st.style.transition='none'};
st.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;st.style.transform=`translate(${dx}px,${dy}px) rotate(${dx/12}deg)`;st.style.opacity=Math.max(.3,1-Math.hypot(dx,dy)/400)};
st.onpointerup=st.onpointercancel=e=>{if(!drag)return;const d=Math.hypot(e.clientX-drag.x,e.clientY-drag.y);drag=null;$('tk').classList.remove('drag');st.style.transition='';st.style.transform='';st.style.opacity='';
if(d<6){const r=$('qr').getBoundingClientRect();(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom)?scan():tear()}else if(d>60)tear()};
$('mo').addEventListener('pointermove',e=>{if(drag)return;const s=$('scene'),r=$('flip').getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;s.style.setProperty('--mx',x*100+'%');s.style.setProperty('--my',y*100+'%');s.style.transform=`perspective(1000px) rotateY(${(x-.5)*14}deg) rotateX(${(.5-y)*10}deg)${$('tk').classList.contains('torn')?' scale(1.04)':''}`});
$('back').onclick=flip;$('fp').onclick=flip;
$('cl').onclick=closeM;$('pv').onclick=()=>show(cur-1);$('nx').onclick=()=>show(cur+1);
addEventListener('keydown',e=>{if(!$('mo').classList.contains('on'))return;if(e.key=='Escape')closeM();if(e.key=='ArrowRight')show(cur+1);if(e.key=='ArrowLeft')show(cur-1);if(e.key=='f'||e.key=='F'||e.key==' '){e.preventDefault();flip()}});

/* ───────── deep link: สแกน QR ด้วยมือถือ → เปิดหน้าสินค้านั้นทันที ───────── */
(function(){const k=P.findIndex(p=>p.c===decodeURIComponent(location.hash.slice(1)));if(k>=0){openM(k);setTimeout(tear,900)}})();

/* ───────── hero: ตั๋วหมุนรอบแกนตั้ง (ลากเพื่อหมุน / แตะเพื่อสะบัดพลิก) ───────── */
(function(){const h=$('h3'),sp=$('hs'),sh=document.querySelector('.hshadow');
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let ang=-18,vel=0,dn=false,lx=0,mv=0;
function frame(){if(!dn){if(Math.abs(vel)>.05){ang+=vel;vel*=.95}else if(!calm)ang+=.45}
sp.style.transform=`rotateY(${ang}deg)`;sh.style.transform=`translateX(-50%) scaleX(${.55+.45*Math.abs(Math.cos(ang*Math.PI/180))})`;requestAnimationFrame(frame)}
frame();
h.onpointerdown=e=>{dn=true;lx=e.clientX;mv=0;vel=0;h.setPointerCapture(e.pointerId)};
h.onpointermove=e=>{if(!dn)return;const dx=e.clientX-lx;lx=e.clientX;ang+=dx*.45;vel=dx*.45;mv+=Math.abs(dx)};
h.onpointerup=h.onpointercancel=()=>{if(!dn)return;dn=false;if(mv<5)vel=16}})();

/* v2: ปัดซ้าย/ขวาเปลี่ยนภารกิจ */
(function(){let x0=null,y0=0;const s=$('scene');
s.addEventListener('touchstart',e=>{if(e.target.closest('#stub')){x0=null;return}x0=e.touches[0].clientX;y0=e.touches[0].clientY},{passive:true});
s.addEventListener('touchend',e=>{if(x0==null)return;const t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;x0=null;
if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5){navigator.vibrate&&navigator.vibrate(12);show(cur+(dx<0?1:-1))}},{passive:true})})();