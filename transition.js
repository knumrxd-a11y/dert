/* ORBITAL · warp-jump page transition */
(function(){
const M={index:['ALL MISSIONS','#c8643c'],mars:['MARS-001','#e0764a'],jupiter:['JUPITER-002','#c9a26a'],neptune:['NEPTUNE-003','#6fb7bd'],'pluto-004':['PLUTO-004','#a85fd6'],'pluto-005':['PLUTO-005','#8d9399'],uranus:['URANUS-006','#4d63d6'],earth:['EARTH-007','#7ea05f']};
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches,R=document.documentElement;
const ov=document.createElement('div');ov.id='pt';ov.innerHTML='<canvas></canvas><div class="lb"><small></small><strong></strong></div>';document.body.appendChild(ov);
const cv=ov.querySelector('canvas'),sm=ov.querySelector('small'),st=ov.querySelector('strong');let stop=null,busy=0;
const key=u=>(new URL(u,location.href).pathname.split('/').pop()||'index').replace(/\.html$/,'');
function warp(col){if(calm)return null;const x=cv.getContext('2d'),d=Math.min(devicePixelRatio||1,2),w=cv.width=innerWidth*d,h=cv.height=innerHeight*d,m=Math.hypot(w,h)/2;
const S=Array.from({length:150},()=>({a:Math.random()*6.283,r:Math.random()*.2,v:.003+Math.random()*.008}));const t0=performance.now();let run=1;
(function f(t){if(!run)return;const k=Math.min(1,(t-t0)/900);x.clearRect(0,0,w,h);x.lineCap='round';
S.forEach(s=>{s.r+=s.v*(1+k*16);const tail=(.01+k*.2)*s.r,c=Math.cos(s.a),n=Math.sin(s.a);
x.strokeStyle=s.v>.008?'#fff':col;x.globalAlpha=Math.min(1,.25+s.r);x.lineWidth=(.8+s.r*2.4)*d;
x.beginPath();x.moveTo(w/2+c*Math.max(0,s.r-tail)*m,h/2+n*Math.max(0,s.r-tail)*m);x.lineTo(w/2+c*s.r*m,h/2+n*s.r*m);x.stroke();
if(s.r>1.05){s.r=Math.random()*.05;s.a=Math.random()*6.283}});requestAnimationFrame(f)})(t0);return()=>{run=0}}
function label(m){sm.textContent=m[0]=='ALL MISSIONS'?'RETURN TO BASE':'NOW BOARDING';st.textContent=m[0];ov.style.setProperty('--pc',m[1])}
function go(url,e){if(busy)return;busy=1;const m=M[key(url)]||M.index;label(m);
ov.style.setProperty('--ox',(e&&e.clientX!=null?e.clientX:innerWidth/2)+'px');ov.style.setProperty('--oy',(e&&e.clientY!=null?e.clientY:innerHeight/2)+'px');
ov.classList.add('in');stop&&stop();stop=warp('#f3dfa2');navigator.vibrate&&navigator.vibrate([10,20,30]);
try{sessionStorage.setItem('pt',JSON.stringify(m))}catch(_){}
setTimeout(()=>{location.href=url},calm?200:900)}
window.goTo=go;
document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');
if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||a.target||a.hasAttribute('download'))return;
const u=new URL(a.href,location.href);if(u.origin!==location.origin||(u.pathname===location.pathname&&(u.hash||u.href===location.href)))return;
e.preventDefault();go(u.href,e)});
/* arrival: เปิดม่านวงกลมหดลง */
let raw=null;try{raw=sessionStorage.getItem('pt');sessionStorage.removeItem('pt')}catch(_){}
if(raw){try{const m=JSON.parse(raw);label(m);ov.style.setProperty('--ox','50%');ov.style.setProperty('--oy','50%');ov.classList.add('in','na');stop=warp('#f3dfa2');R.classList.remove('arr');ov.offsetWidth;
requestAnimationFrame(()=>{ov.classList.remove('na','in');setTimeout(()=>{stop&&stop();stop=null},900)})}catch(_){R.classList.remove('arr')}}else R.classList.remove('arr');
addEventListener('pageshow',e=>{if(e.persisted){busy=0;ov.classList.remove('in');stop&&stop();stop=null}});
})();