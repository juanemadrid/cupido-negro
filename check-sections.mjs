import {chromium} from '@playwright/test';
const browser=await chromium.launch({channel:'msedge',headless:true});
try{
 const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173');await page.emulateMedia({reducedMotion:'reduce'});
 const nav=name=>page.locator('#main-navigation').getByRole('link',{name,exact:true});
 await nav('Alejamientos').click();if(!page.url().endsWith('#alejamientos'))throw Error('Navigation');
 await nav('Preguntas frecuentes').click();await page.locator('summary').nth(1).click();
 if(!await page.locator('details').nth(1).evaluate(e=>e.open))throw Error('FAQ');
 await page.screenshot({path:'sections-faq.png'});
 await nav('Contacto').click();await page.getByRole('button',{name:'Preparar mi consulta'}).click();
 if(await page.locator('.field-error').count()!==3)throw Error('Required validation');
 await page.locator('#name').fill('Prueba');await page.locator('#email').fill('mal');await page.locator('#message').fill('Quiero orientación para cerrar un ciclo sentimental.');await page.locator('#consent').check();
 await page.getByRole('button',{name:'Preparar mi consulta'}).click();if(!await page.locator('#email-error').isVisible())throw Error('Email validation');
 await page.locator('#email').fill('');await page.getByRole('button',{name:'Preparar mi consulta'}).click();
 if(!await page.locator('.draft').isVisible())throw Error('Draft');
 if(!(await page.getByRole('status').innerText()).includes('no se ha enviado'))throw Error('Misleading status');
 await page.screenshot({path:'sections-contact.png'});
 for(const width of [320,390,768,1024,2560,3840]){
  await page.setViewportSize({width,height:width<768?844:1080});
  if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow '+width);
 }
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Abrir menú'}).click();await nav('Amarres').click();
 if(await page.getByRole('button',{name:'Abrir menú'}).getAttribute('aria-expanded')!=='false')throw Error('Menu close');
 await page.screenshot({path:'sections-mobile.png'});
 if(errors.length)throw Error(errors.join(';'));
 console.log('OK: navigation, FAQ, required/email validation, unsent draft, six viewport widths, mobile menu, runtime.');
}finally{await browser.close()}
