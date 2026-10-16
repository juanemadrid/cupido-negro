import React, {useEffect,useRef} from 'react';

// Low-resolution density fields are prepared once; only compositing runs per frame.
function cloud(seed){
 const size=256, canvas=document.createElement('canvas');canvas.width=size;canvas.height=size;
 const ctx=canvas.getContext('2d'), data=ctx.createImageData(size,size);
 const hash=(x,y)=>{const n=Math.sin(x*127.1+y*311.7+seed*74.7)*43758.5453;return n-Math.floor(n)};
 function noise(x,y){const ix=Math.floor(x),iy=Math.floor(y);let u=x-ix,v=y-iy;u=u*u*(3-2*u);v=v*v*(3-2*v);return (hash(ix,iy)*(1-u)+hash(ix+1,iy)*u)*(1-v)+(hash(ix,iy+1)*(1-u)+hash(ix+1,iy+1)*u)*v}
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  let n=0,amp=.56,f=5;
  for(let o=0;o<5;o++){n+=noise(x/size*f,y/size*f)*amp;f*=2; amp*=.5}
  const edge=Math.pow(Math.max(0,Math.sin(x/size*Math.PI)*Math.sin(y/size*Math.PI)),1.2);
  const density=Math.max(0,Math.min(1,(n-.34)*4.2));
  const i=(y*size+x)*4;data.data[i]=seed===1?91:43;data.data[i+1]=seed===1?45:34;data.data[i+2]=seed===1?50:41;
  data.data[i+3]=density*edge*245;
 }
 ctx.putImageData(data,0,0);return canvas;
}
export default function FogCanvas({paused}){
 const ref=useRef(null);
 const cache=useRef(null), elapsed=useRef(0);
 useEffect(()=>{
  const canvas=ref.current,ctx=canvas.getContext('2d',{alpha:true});
  const atmosphere=canvas.closest('.atmosphere');
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  if(!cache.current)cache.current=[cloud(1),cloud(2),cloud(3)];
  const textures=cache.current;let frame=0,last=0,time=elapsed.current,visible=true;
  const mobile=()=>canvas.clientWidth<760;
  function resize(){const scale=Math.min(mobile()?.55:.65,1280/canvas.clientWidth,900/canvas.clientHeight);canvas.width=Math.round(canvas.clientWidth*scale);canvas.height=Math.round(canvas.clientHeight*scale);draw()}
  function draw(){
   const w=canvas.width,h=canvas.height,t=time*.001;ctx.clearRect(0,0,w,h);
   // The derivative of this shared drift drives the flames in the same direction.
   const drift=Math.sin(t*.14)*.18+Math.sin(t*.9)*.014;
   const wind=motion.matches?0:(Math.cos(t*.14)*.0252+Math.cos(t*.9)*.0126)/.0378;
   atmosphere.style.setProperty('--wind-angle',`${wind*24}deg`);
   atmosphere.style.setProperty('--wind-skew',`${wind*10}deg`);
   atmosphere.style.setProperty('--wind-push',`${wind*9}px`);
   atmosphere.style.setProperty('--wind-stretch',`${1+Math.abs(wind)*.15}`);
   ctx.globalCompositeOperation='source-over';
   for(let i=0;i<11;i++){
    const phase=t*(.14+i%3*.025)+i*.73;
    const x=(.02+i*.105+drift+Math.sin(phase)*.035)*w;
    const y=(i%3===0?.85:i%3===1?.72:.52)*h+Math.cos(phase*.8+i)*h*.07;
    const cw=w*(i%2===0?.72:.55),ch=h*(i%2===0?.48:.39);
    ctx.globalAlpha=i%3===2?.55:.88;
    ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(phase*.5)*.20);ctx.drawImage(textures[i%3],-cw/2,-ch/2,cw,ch);ctx.restore();
   }
   ctx.globalAlpha=1;ctx.globalCompositeOperation='destination-in';
   const mask=ctx.createLinearGradient(0,0,0,h);mask.addColorStop(0,'rgba(0,0,0,0)');mask.addColorStop(.30,'rgba(0,0,0,.15)');mask.addColorStop(.65,'rgba(0,0,0,.85)');mask.addColorStop(1,'rgba(0,0,0,1)');ctx.fillStyle=mask;ctx.fillRect(0,0,w,h);
   ctx.globalCompositeOperation='source-over';
  }
  function tick(now){frame=0;if(!last)last=now;if(now-last>=(mobile()?50:33)){time+=Math.min(now-last,80);elapsed.current=time;last=now;draw()}if(!paused&&!motion.matches&&!document.hidden&&visible)frame=requestAnimationFrame(tick)}
  function sync(){cancelAnimationFrame(frame);frame=0;last=0;draw();if(!paused&&!motion.matches&&!document.hidden&&visible)frame=requestAnimationFrame(tick)}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(canvas);
  const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()});observer.observe(canvas);
  motion.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);resize();sync();
  return()=>{cancelAnimationFrame(frame);resizeObserver.disconnect();observer.disconnect();motion.removeEventListener('change',sync);document.removeEventListener('visibilitychange',sync)};
 },[paused]);
 return <canvas ref={ref} className="volumetric-fog"/>;
}

