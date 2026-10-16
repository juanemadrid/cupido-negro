import React, {useEffect, useRef} from 'react';
import FogCanvas from './FogCanvas.jsx';

export default function Atmosphere(){
  const root=useRef(null);
  const paused=false;
  useEffect(()=>{
    const hero=root.current.closest('.hero');
    const media=matchMedia('(prefers-reduced-motion: reduce)');
    const fine=matchMedia('(hover: hover) and (pointer: fine)');
    let frame=0;
    function reset(){hero.style.setProperty('--depth-x','0px');hero.style.setProperty('--depth-y','0px')}
    function move(event){
      if(media.matches||!fine.matches||paused)return;
      cancelAnimationFrame(frame);
      frame=requestAnimationFrame(()=>{
        const box=hero.getBoundingClientRect();
        hero.style.setProperty('--depth-x',`${((event.clientX-box.left)/box.width-.5)*7}px`);
        hero.style.setProperty('--depth-y',`${((event.clientY-box.top)/box.height-.5)*5}px`);
      });
    }
    function leave(){cancelAnimationFrame(frame);reset()}
    function visibility(){hero.classList.toggle('motion-hidden',document.hidden)}
    hero.addEventListener('pointermove',move,{passive:true});
    hero.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',visibility);
    media.addEventListener('change',leave);
    visibility();reset();
    return()=>{cancelAnimationFrame(frame);reset();hero.removeEventListener('pointermove',move);hero.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',leave)};
  },[paused]);
  return <>
    <div ref={root} className={`atmosphere${paused?' is-paused':''}`} aria-hidden="true">
      <div className="distant-glow"/>
      <div className="ritual-scene">
        <div className="ritual-floor"><svg viewBox="0 0 300 300"><defs><radialGradient id="ritualLight"><stop stopColor="#a32922" stopOpacity=".22"/><stop offset="1" stopColor="#170709" stopOpacity="0"/></radialGradient></defs><circle cx="150" cy="150" r="148" fill="url(#ritualLight)" stroke="none"/><g fill="none" stroke="currentColor"><circle cx="150" cy="150" r="118"/><circle cx="150" cy="150" r="110" strokeWidth=".6"/><path d="M150 40 215 239 45 116 255 116 85 239Z" strokeWidth="1.8"/></g></svg></div>
        {Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2;return <div className={`distant-candle depth-${i%3}`} key={i} style={{'--cx':`${50+43*Math.cos(a)}%`,'--cy':`${42-24*Math.sin(a)}%`,'--height':`${24+i%4*7}px`,'--flicker':`${1.7+i*.13}s`,'--offset':`${-i*.53}s`}}><span className="wax"><b/><i className="wick"/></span><i className="distant-flame"/><i className="candle-halo"/></div>})}
      </div>
      <FogCanvas paused={paused}/>
      <div className="ground-haze"/>
      <div className="arrow-aura"/>
      <div className="embers">{Array.from({length:5},(_,i)=><i key={i} style={{'--x':`${(i*37+11)%97}%`,'--drift':`${(i%2?1:-1)*(18+i*3)}px`,'--duration':`${9+i%5*2}s`,'--delay':`${-i*1.7}s`,'--size':`${i%3===0?3:2}px`}}/>)}</div>
    </div>
  </>;
}



