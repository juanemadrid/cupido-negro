# Cupido Negro — Fase 1

Propuesta local de Hero en React y Vite. Ejecutar `npm install` y `npm run dev`. Compilar con `npm run build`.

Incluye navegación responsive, composición principal, botones y avisos de secciones pendientes. No se publicó ni se conectaron servicios externos. El teléfono de WhatsApp, formulario, secciones internas y animaciones cinematográficas se implementarán en las fases siguientes, tras aprobar esta fase, según el encargo.

## Imagen

`public/assets/referencia-original.png` es una copia intacta de la imagen suministrada. El fondo y el símbolo de marca se encuadran mediante CSS; no se modificó el archivo original. El recurso conserva humo y velas estáticos para esta revisión. Se necesita una imagen fuente sin textos y capas independientes para el acabado animado definitivo.

Se intentó extraer el fondo con la herramienta integrada de imágenes; no produjo ningún archivo porque rechazó el resultado. Prompt utilizado: «Create a clean wide website hero BACKGROUND asset from the artwork displayed inside the laptop screen in the input. Remove the entire laptop, desk, room, all typography, buttons, header and logos. Preserve the same black sculptural adult male winged Cupid with curly hair, black feather wings, gold bow and glowing red heart arrow on the right, red circle, smoke and candles. Left 45 percent dark empty space. No text or UI; preserve likeness and composition.»

## Verificación

Compilación de producción correcta. Comprobación con Playwright en Edge, escritorio 1440 × 900 y móvil 390 × 844: menú móvil, apertura de avisos, cierre con Escape y sin desbordamiento horizontal. Las fuentes de Google requieren conexión; existen fuentes de respaldo locales.

## Fase 2

Se añadieron dos capas CSS de niebla, 16 brasas (8 en móvil), tres velas con llamas y brillo, halo sobre la flecha y profundidad con cursor en equipos con ratón. El personaje sigue siendo el de la referencia original, sin deformación. La niebla es una aproximación mediante gradientes; no una simulación volumétrica ni capas extraídas del recurso original.

Incluye pausa manual, detención de animaciones con pestaña oculta y respeto de `prefers-reduced-motion`. No utiliza Canvas, WebGL ni dependencias nuevas para los efectos. Comprobado con Playwright en Edge: movimiento real de niebla, pausa/reanudación, presupuesto móvil de partículas, ausencia de desbordamiento horizontal, movimiento reducido y ausencia de errores de ejecución. Compilación de producción verificada. No se midieron FPS en dispositivos físicos.

## Revisión de profundidad

Se sustituyeron las tres velas superpuestas por doce luces pequeñas en planos de distancia con desenfoque, cuerpos de cera sombreados y oclusión atmosférica. La niebla ahora se compone en Canvas 2D con tres campos de densidad fractal generados una vez, siete volúmenes con deriva independiente y máscara de lectura. No es una escena de geometría 3D: la profundidad es una composición de planos. Canvas usa resolución reducida, límite de 30 fps (20 en móvil) y se detiene al salir de pantalla, ocultar la pestaña, pausar o solicitar movimiento reducido. Verificados movimiento de píxeles, pausa, movimiento reducido, ausencia de errores y adaptación móvil con Playwright/Edge. Se conservó la imagen y la identidad originales.

## Escena ritual lateral

Se reubicaron las doce velas en un círculo con estrella de cinco puntas en perspectiva, en el lateral inferior izquierdo, fuera de la pierna de Cupido en escritorio. Se aumentaron contraste, densidad y desplazamiento de las nubes, con once volúmenes oscuros y rojizos, y se redujeron las brasas a cinco. Se amplió el espacio vertical para separar la escena del texto y los botones. Se verificaron animación de Canvas, pausa, doce velas, adaptación móvil y ausencia de errores de ejecución mediante Edge/Playwright. La profundidad continúa siendo una composición en perspectiva, no geometría 3D.

## Brisa sincronizada

Niebla y llamas comparten un campo de brisa: el desplazamiento horizontal de las nubes combina una corriente lenta y ráfagas; su velocidad determina la inclinación de las llamas (hasta 24 grados), con pequeñas diferencias según profundidad y parpadeo local. Los halos acompañan el flujo y la cera permanece fija. Comprobado en Edge/Playwright: ángulo variable, pausa conjunta, neutralización con movimiento reducido y ausencia de desbordamiento móvil y errores de ejecución. Compilación correcta.

## Adaptación fluida de pantallas

Se eliminaron los límites de 1440 px que reducían el texto a una columna en el centro de monitores grandes. Navegación, texto, botones y ritual ahora comparten una escala fluida según ancho y alto de ventana; Cupido conserva la relación de aspecto del encuadre. Se añaden composiciones para tabletas y móviles desde 320 px, con altura suficiente para evitar solapamientos y desplazamiento vertical cuando hace falta. Canvas se limita a 1280 × 900 para evitar un coste excesivo en 4K. Verificados once tamaños de ventana entre 320 × 568 y 3840 × 2160 (incluido 3440 × 1440): sin desbordamiento horizontal ni solapamiento entre texto y ritual. Pruebas en Edge mediante Playwright, no en televisores físicos.

## Encuadre y cabecera refinados

Se retiró el control visible de pausa y su estado de interfaz a petición del usuario. Las animaciones siguen automáticamente; se conserva la preferencia de movimiento reducido del sistema. Cabecera de 76 unidades en escritorio y 68 px en móvil, logo más compacto y fondo negro integrado con mezcla de pantalla. Cupido se alejó mediante un encuadre proporcional más pequeño, con fundido de bordes para mostrar más círculo y alas. Revisados siete tamaños entre 320 px y 4K: sin desbordamiento horizontal ni errores de ejecución y sin botón de pausa. Compilación verificada.

## Pasada de acabado visual

Se pulieron tipografía, contraste de texto, matices del dorado, iluminación de botones, línea de cabecera, integración de bordes del arte y composición móvil. Se separó el plano de la figura del ritual inferior en móvil. Los diálogos bloquean el desplazamiento del fondo y restauran el foco al botón que los abrió; el menú declara la relación con la navegación. Verificados once tamaños (320 px–4K), límites de Canvas, separación entre texto y ritual, ausencia de desbordamientos, retorno de foco, movimiento reducido y ausencia de errores de JavaScript. Compilación de producción correcta. Esta pasada completa el acabado del Hero; siguen pendientes las secciones internas y la configuración real del contacto.

## Secciones internas y navegación

Se añadieron Amarres, Alejamientos, Protección espiritual, Sobre nosotros, preguntas frecuentes desplegables y Contacto. El menú utiliza enlaces reales con indicación de sección activa y cabecera accesible durante el desplazamiento. En móvil se cierra al elegir un destino.

El formulario valida nombre, correo opcional, mensaje y consentimiento, y prepara una vista previa sin enviar ni guardar datos. `src/config.js` permite configurar el número real de WhatsApp en formato internacional sin signos. Cuando exista un número válido, los botones abrirán WhatsApp y la consulta preparada podrá compartirse tras revisarla. Actualmente el envío está desactivado: no hay servidor de formularios ni servicio externo conectado.

Validación reproducible con `node check-sections.mjs` (requiere servidor local y Edge): navegación, acordeones, errores obligatorios y de correo, borrador sin envío, cierre del menú móvil, seis anchos entre 320 px y 4K y ausencia de errores de ejecución. Compilación de producción verificada. No se ha desplegado el sitio.

## Navegación por vistas independientes

Se sustituyó la página con secciones apiladas por una sola vista activa según la ruta hash: Inicio, Amarres, Alejamientos, Protección, Nosotros, Preguntas y Contacto. El cambio ocurre dentro de la misma pestaña; admite enlaces directos, recarga y botones Atrás/Adelante. Al cambiar se actualizan título, foco y posición de desplazamiento. Cada vista interna tiene un único h1, ruta de regreso a Inicio y cierre ornamental con líneas doradas y sello central. Los servicios incluyen navegación secundaria.

Verificados `node check-pages.mjs` y `node check-sections.mjs`: rutas directas, una única vista montada, historial, navegación móvil, acordeones, validación y borrador sin envío, ausencia de nuevas pestañas y de errores de JavaScript, adaptación entre 320 px y 4K. Compilación correcta.

## Atmósfera de vistas internas

Se retiraron la ruta de migas y la navegación secundaria duplicada. Los servicios ahora presentan un sello dorado ampliado con órbita de giro lento, luz roja y movimiento sutil del núcleo; la niebla Canvas acompaña el fondo de las vistas internas con menor intensidad y preserva la lectura. FAQ y Contacto usan una atmósfera más discreta. Se mantuvieron símbolos vectoriales propios para coherencia y rendimiento. Verificados compilación, pruebas de páginas y formulario, ausencia de navegación duplicada, movimiento real de niebla y órbita, y movimiento reducido. El inicio no se modificó en esta revisión.
