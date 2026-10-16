import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/#amarres');await page.emulateMedia({reducedMotion:'reduce'});
 for(const route of ['amarres','alejamientos','proteccion','nosotros','preguntas','contacto']){
  await page.goto('http://127.0.0.1:5173/#'+route);await page.locator('.page-'+route).waitFor();
  if(await page.locator('.content-section').count()!==1||await page.locator('.hero').count())throw Error('Stacked content '+route);
  if(await page.locator('h1').count()!==1)throw Error('Heading '+route);
  if(!await page.locator('.mystic-ending').isVisible())throw Error('Ornament');
 }
 await page.locator('#main-navigation').getByRole('link',{name:'Amarres',exact:true}).click();await page.locator('.page-amarres').waitFor();
 await page.locator('#main-navigation').getByRole('link',{name:'Alejamientos',exact:true}).click();await page.locator('.page-alejamientos').waitFor();
 await page.goBack();await page.locator('.page-amarres').waitFor();await page.goForward();await page.locator('.page-alejamientos').waitFor();
 await page.screenshot({path:'page-alejamientos.png'});
 for(const width of [320,390,768,1440,2560,3840]){await page.setViewportSize({width,height:900});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width)}
 await page.setViewportSize({width:390,height:844});await page.screenshot({path:'page-mobile.png',fullPage:true});
 await page.goto('http://127.0.0.1:5173/#inicio');await page.locator('.hero').waitFor();if(await page.locator('.content-section').count())throw Error('Home stacked');
 if(page.context().pages().length!==1)throw Error('Extra browser tab');if(errors.length)throw Error(errors.join(';'));
 console.log('OK: six direct routes, one view and h1, back/forward, home, ornament, responsive widths, single tab, runtime.');
}finally{await browser.close()}
