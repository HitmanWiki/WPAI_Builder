var activeLanguage = 'en';

$(document).ready(function() {
    if (window.location.search.split("?lang=").length === 2 && window.location.search.split("?lang=")[1].length > 0) {
        activeLanguage = window.location.search.split("?lang=")[1];
        window.localStorage.setItem('lang', activeLanguage);
    } else if (window.localStorage.getItem('lang') && window.localStorage.getItem('lang').length > 0) {
        activeLanguage = window.localStorage.getItem('lang');
    }
    
    if (window.location.pathname.includes("/edit") && activeLanguage !== 'en') {
        //localizeStatic();
    }
});

var localize = function(string) {
    return string;
    if (activeLanguage === 'en' || string === ".") {
        return string;
    } else {
        for (var i = 0; i < translations.length; i++) {
            if (translations[i].en === string) {
                return translations[i][activeLanguage];
            }
        }
    }
    
    return string;
}

var blacklist = [];
var localizeStatic = function() {
    var elems = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "label", "strong", "a", "span", "button", "input", "option"];
    for (var i = 0; i < elems.length; i++) {
        var tags = document.getElementsByTagName(elems[i]);
        for (var j = 0; j < tags.length; j++) {
            var prop;
            if (tags[j] === "input") {
                prop = tags[j].getAttribute('placeholder');
                if (prop === '' || !prop) {
                    continue;
                }
            } else {
                prop = tags[j].innerText.trim();
            }
            
            if (blacklist.includes(prop.toLowerCase()) || tags[j].getAttribute('tabindex') === "0") {
                continue;
            }
            
            var foundMatch = false;
            for (var k = 0; k < translations.length; k++) {
                if (translations[k].en === prop) {
                    if (tags[j] === "input") {
                        foundMatch = true;
                        tags[j].setAttribute('placeholder', translations[k][activeLanguage]);
                    } else if ((elems[i] === 'label' && tags[j].parentElement && tags[j].parentElement.parentElement && tags[j].parentElement.parentElement.parentElement && tags[j].parentElement.parentElement.parentElement.className === 'multiselect-container dropdown-menu') || tags[j].id === 'fileLabel') {
                        foundMatch = true;
                        var inputElem = tags[j].getElementsByTagName('input')[0];
                        while (tags[j].firstChild) {
                            tags[j].removeChild(tags[j].firstChild);
                        }

                        tags[j].appendChild(inputElem);
                        tags[j].appendChild(document.createTextNode(translations[k][activeLanguage]));
                    } else if (tags[j].parentElement.className !== 'btn-group buttonSection' && tags[i].className !== 'multiselect-native-select' && tags[i].className !== 'font-weight-bold pl-0 my-4') {
                        foundMatch = true;
                        tags[j].innerText = translations[k][activeLanguage];
                    } else {
                        foundMatch = true;
                        tags[j].innerHTML = tags[j].innerHTML.toLowerCase().replace(tags[j].innerText.toLowerCase(), ' ' + translations[k][activeLanguage]);
                    }
                }
            }
            
            if (!foundMatch) {
                for (var k = 0; k < translations.length; k++) {
                    if (translations[k].en.toUpperCase() === prop) {
                        if (tags[j] === "input") {
                            foundMatch = true;
                            tags[j].setAttribute('placeholder', translations[k][activeLanguage]);
                        } else if (elems[i] === 'label' && tags[j].parentElement && tags[j].parentElement.parentElement && tags[j].parentElement.parentElement.parentElement && tags[j].parentElement.parentElement.parentElement.className === 'multiselect-container dropdown-menu') {
                            foundMatch = true;
                            var inputElem = tags[j].getElementsByTagName('input')[0];
                            while (tags[j].firstChild) {
                                tags[j].removeChild(tags[j].firstChild);
                            }

                            tags[j].appendChild(inputElem);
                            tags[j].appendChild(document.createTextNode(translations[k][activeLanguage]));
                        } else if (tags[j].parentElement.className !== 'btn-group buttonSection' && tags[i].className !== 'multiselect-native-select' && tags[i].className !== 'font-weight-bold pl-0 my-4') {
                            foundMatch = true;
                            tags[j].innerText = translations[k][activeLanguage];
                        } else {
                            foundMatch = true;
                            tags[j].innerHTML = tags[j].innerHTML.toLowerCase().replace(tags[j].innerText.toLowerCase(), ' ' + translations[k][activeLanguage]);
                        }
                    }
                }
            }
        }
    }
    
    var divs = document.getElementsByClassName('color-input-group');
    for (var i = 0; i < divs.length; i++) {
        var prop = "or enter HEX value:";
        for (var k = 0; k < translations.length; k++) {
            if (translations[k].en === prop) {
                divs[i].innerHTML = divs[i].innerHTML.replace(prop, ' ' + translations[k][activeLanguage]);
            }
        }
        
        prop = "with transparency:";
        for (var k = 0; k < translations.length; k++) {
            if (translations[k].en === prop) {
                divs[i].innerHTML = divs[i].innerHTML.replace(prop, ' ' + translations[k][activeLanguage]);
            }
        }
    }
    
    divs = document.getElementsByClassName('reveal-color-group');
    for (var i = 0; i < divs.length; i++) {
        var prop = "or enter HEX value:";
        for (var k = 0; k < translations.length; k++) {
            if (translations[k].en === prop) {
                divs[i].innerHTML = divs[i].innerHTML.replace(prop, ' ' + translations[k][activeLanguage]);
            }
        }
        
        prop = "with transparency:";
        for (var k = 0; k < translations.length; k++) {
            if (translations[k].en === prop) {
                divs[i].innerHTML = divs[i].innerHTML.replace(prop, ' ' + translations[k][activeLanguage]);
            }
        }
    }
    
    divs = document.getElementsByClassName('reveal-group');
    for (var i = 0; i < divs.length; i++) {
        var prop = "or enter name";
        for (var k = 0; k < translations.length; k++) {
            if (translations[k].en === prop) {
                divs[i].innerHTML = divs[i].innerHTML.replace(prop, ' ' + translations[k][activeLanguage]);
            }
        }
    }
}

var translations = [
{
    "en": "Looks like your site is taking a little while to load. Want to try refreshing the page?",
    "es": "Parece que tu sitio está tardando en cargar. ¿Te gustaría refrescar la página?"
},
{
    "en": "No, I'll Wait",
    "es": "No, Voy a Esperar"
},
{
    "en": "Yes, Refresh",
    "es": "Si, Refrescar"
},
{
    "en": "Refresh",
    "es": "Refrescar"
},
{
    "en": 'Sorry To Interrupt!',
    "es": "¡Disculpa la Interrupción!"
},
{
    "en": 'We just wanted to let you know that this is not the only place where you can edit your Leia website. After you create an account here, you can sign into the iOS app, Android app, or web app at HeyLeia.com. You can then edit your site from any of these places. You can create an account once you exit the editor, but be sure to save your changes first.',
    "es": "Queríamos hacerte saber que éste no es el único lugar para editar tu sitio web Leia. Después de crear tu cuenta aquí, puedes iniciar sesión en la aplicación iOS, Android, o en HeyLeia.com. Puedes editar tu sitio desde cualquiera de estos lugares. Puedes crear tu cuenta cundo salgas del editor, pero recuerda guardar tus cambios antes."
},
{
    "en": "Share Your Site!",
    "es": "¡Comparte tu Sitio!"
},
{
    "en": "Want to drive more visitors to your site? Try sharing it with your Facebook friends! On average, a Facebook share drive 40% more visitors to your site. You can follow the prompts here to do this directly from the Leia Editor.",
    "es": "¿Quieres tener más tráfico en tu sitio? ¡Intenta compartiendo con tus amigos en Facebook! Compartiendo tu sitio en Facebook sube el tráfico en promedio un 40%. Puedes seguir estos pasos aquí para hacerlo directamente desde el editor Leia."
},
{
    "en": 'No Thanks',
    "es": "No Gracias"
},
{
    "en": "Let's Share!",
    "es": "¡Compartamos!"
},
{
    "en": "Like Your Website?",
    "es": "¿Te Gusta tu Sitio?"
},
{
    "en": "If you like your site and want to keep it, please take a moment to create a free account to store it!",
    "es": "Si te gusta tu sitio y te gustaría guardarlo, ¡por favor toma un momento para crear una cuenta gratuita y guardarla!"
},
{
    "en": "Save My Site!",
    "es": "¡Guarda mi Sitio!"
},
{
    "en": "Save",
    "es": "Guardar"
},
{
    "en": "We've included a section on your page for you to post dynamic content like blogs and events. To edit this section, use these buttons and the instructions above them.",
    "es": "Hemos incluido una sección en tu página para que puedas poner contenido dinámico como blogs y eventos. Para editar esta sección, usa estos botones y las instrucciones de arriba."
},
{
    "en": 'General',
    "es": "General"
},
{
    "en": "Redesign Complete",
    "es": "Rediseño Completo"
},
{
    "en": "Here's your new design! Hopefully you like it. If not, feel free to either do another redesign, or press the \"Previous Version\" button in the toolbox to go back to the last one.",
    "es": "¡Aquí está tu nuevo diseño! Ojalá te guste. Si no, puedes hacer otro rediseño, o presiona el botón de \"Versión Anterior\" en la caja de herramientas para regresar al último."
},
{
    "en": "Previous Version",
    "es": "Versión Anterior"
},
{
    "en": "Got It!",
    "es": "¡Lo Tengo!"
},
{
    "en": "Save Reminder",
    "es": "Guardar Recordatorio"
},
{
    "en": "Sorry to interrupt! Looks like you have a lot of unsaved work. Would you like to save?",
    "es": "¡Disculpa la interrupción! Parece que tienes mucho trabajo sin guardar. ¿Te gustaría guardar?"
},
{
    "en": 'Not Now',
    "es": "Ahora No"
},
{
    "en": 'OR',
    "es": "O"
},
{
    "en": 'or',
    "es": "o"
},
{
    "en": "Yes, Save",
    "es": "Si, Guardar"
},
{
    "en": "Sign In",
    "es": "Iniciar Sesión"
},
{
    "en": "It appears that your session has expired. We need to sign you in!",
    "es": "Parece que tu sesión ha expirado. ¡Necesitamos que vuelvas a iniciar sesión!"
},
{
    "en": 'Update Image',
    "es": "Actualizar Imagen"
},
{
    "en": 'UPDATE IMAGE',
    "es": "ACTUALIZAR IMAGEN"
},
{
    "en": 'Browse',
    "es": "Navegar"
},
{
    "en": "Uh Oh!",
    "es": "¡Oh No!"
},
{
    "en": "Please upload one image at a time.",
    "es": "Por favor sube una imagen a la vez."
},
{
    "en": "Only .png, .jpg, .jpeg, and .gif file extensions are allowed. Please upload a different image.",
    "es": "Sólo puedes usar las extensiones .png, .jpg, .jpeg, y .gif. Por favor sube una imagen diferente."
},
{
    "en": 'Chosen',
    "es": "Escogido"
},
{
    "en": "There was an error. Your browser doesn't seem to support this function.",
    "es": "Hubo un error. Parece que tu navegador no puede soportar esta función."
},
{
    "en": 'Change',
    "es": "Cambiar"
},
{
    "en": "Remove Ads for $0.99",
    "es": "Quita Anuncios por $0.99"
},
{
    "en": "Your website is currently free, and does not have any ads in it. This is so you can finish designing your page without interruption.\n\nOnce your site is complete, Leia may start placing Ads in it, but you can keep your website Ad-free by upgrading to Leia Pro for only $0.99!\n\nThis includes hosting and everything else you need to own a successful website.",
    "es": "Tu sitio web es gratuito por ahora, y no tiene anuncios. Esto es para que puedas diseñar tu página sin interrupciones. \n\nYa que tu sitio este completo, Leia puede que empiece a poner anuncios en él, pero puedes hacer que tu sitio web quede sin anuncios actualizando a Leia Pro por solo $0.99!\n\nEsto incluye alojamiento y todo lo que necesites para tener un sitio web exitoso."
},
{
    "en": "Learn More",
    "es": "Aprender Más"
},
{
    "en": 'The volume of requests is too great at the moment. Please try again in a few moments!',
    "es": "El volumen de las solicitudes es mucha en este momento. ¡Por favor intenta de nuevo en unos momentos!"
},
{
    "en": 'There appears to be a problem with the image search feature at the moment. Please try again later.',
    "es": "Parece que hay un problema con la función de búsqueda de imágenes en este momento. Por favor intenta de nuevo más tarde."
},
{
    "en": "<p>Requires <a onclick='launchUpgradeURL(false)'>Leia Pro</a></p>",
    "es": "<p>Requiere <a onclick='launchUpgradeURL(false)'>Leia Pro</a></p>"
},
{
    "en": "<p>Requires <a onclick='launchUpgradeURL(true)'>Leia Business</a></p>",
    "es": "<p>Requiere <a onclick='launchUpgradeURL(true)'>Leia Business</a></p>"
},
{
    "en": "You can remove this ad by upgrading to Leia Pro for just $0.99 per month! Leia Pro also includes a ton of other awesome features.",
    "es": "¡Puedes quitar este anuncio actualizando a Leia Pro por sólo $0.99 al mes! Leia Pro también incluye muchas otras funciones geniales."
},
{
    "en": 'Your search did not return any results. Please try searching for something else.',
    "es": "Tu búsqueda no dio resultados. Por favor intenta buscar algo diferente."
},
{
    "en": 'USE IMAGE',
    "es": "USAR IMAGEN"
},
{
    "en": 'Photo by ',
    "es": "Foto de "
},
{
    "en": ' on ',
    "es": " en "
},
{
    "en": 'Unsplash',
    "es": "Unsplash"
},
{
    "en": "Where do you want to go to get the new photo?",
    "es": "¿Dónde quieres ir a conseguir la foto nueva?"
},
{
    "en": "Cancel",
    "es": "Cancelar"
},
{
    "en": "My Photos",
    "es": "Mis Fotos"
},
{
    "en": "Search",
    "es": "Buscar"
},
{
    "en": "Photo Location",
    "es": "Ubicación de la Foto"
},
{
    "en": "Step 1/2 Complete",
    "es": "Paso 1/2 Completo"
},
{
    "en": "You have completed step one of the process, and your site is currently live at ",
    "es": "Has completado el primer paso del proceso, y ¡tu sitio está en línea en "
},
{
    "en": " for the world to view! The next and final step is to finalize the layout and fill in some of the content that Leia couldn't. Here's a quick walkthrough on how that can be done.",
    "es": " para que el mundo lo vea! El siguiente y último paso es finalizar el diseño y llenar algo del contenido que Leia no pudo hacer. Ésta es una guía rápida de cómo poder hacerlo."
},
{
    "en": "Next",
    "es": "Siguiente"
},
{
    "en": "Rebuild Tool (1/5)",
    "es": "Herramienta de Reconstrucción (1/5)"
},
{
    "en": "You may decide that you don\'t like the look of this site at all, or that you don't like certain parts of it. No problem! If you tap the \"Edit Structure\" button in the toolbox, Leia can redesign a completely new site for you - keeping what you say you like, and changing what you say you don\'t. You can do this as many times as you\'d like to until Leia gets it right.",
    "es": "Puede que decidas que no te gusta lo que ves en tu sitio, o no te gustan algunas partes. ¡No hay problema! Si presionas el botón \"Editar Estructura\" en la caja de herramientas, Leia puede rediseñar un sitio completamente nuevo para ti - manteniéndolo como te gusta, y cambiando lo que no te gusta. Puedes hacer esto las veces que quieras hasta que Leia le atine."
},
{
    "en": "Mobile Version (2/5)",
    "es": "Versión Móvil (2/5)"
},
{
    "en": "We're showing you the mobile version of your site first because most people will forget to look at it. You might not know this, but more than half of all web traffic today comes from mobile devices, so it\'s extremely important that you like the mobile version of your site. To change devices, use the \"Devices\" dropdown in the toolbox on the right side of the screen.",
    "es": "Te estamos enseñando la versión móvil de tu sitio primero porque a mucha gente se le olvida mirarla. Puede que no sepas esto, pero más de la mitad de todo el tráfico en la red viene de dispositivos móviles, así que es muy importante que te guste la versión móvil de tu sitio. Para cambiar dispositivos, usa el botón \"Dispositivos\" en la caja de herramientas en la parte derecha de tu pantalla."
},
{
    "en": "Devices",
    "es": "Dispositivos"
},
{
    "en": "Editing Content (3/5)",
    "es": "Editando Contenido (3/5)"
},
{
    "en": "Once you\'ve found the right look, you\'ll want to edit some of the content. This is really easy - just click on some text or on an image that you want to change, and you'll be shown instructions on what to do next in the toolbox on the right side of the screen.",
    "es": "Ya que hayas encontrado el look correcto, vas a querer editar algo de tu contenido. Esto es sencillo - sólo presiona en un texto o en una imagen que quieras cambiar, y te enseñaremos las instrucciones sobre qué hacer después en la caja de herramientas en la parte derecha de tu pantalla."
},
{
    "en": "Giving Feedback (4/5)",
    "es": "Dando tu Opinión (4/5)"
},
{
    "en": "Leia is brand new, and we've got lots of exciting features to come! In the meantime, however, we know that there will be some things that you'll want to do with your site that Leia isn't quite capable of helping out with yet. To ensure that we get those features to you in future releases, please submit any and all feedback (positive and negative) through the \"Give Feedback\" button in the toolbox.",
    "es": "Leia es una nueva aplicación, ¡y tenemos varias funciones nuevas por venir! Por el momento, sabemos que habrá algunas cosas que vas a querer hacer en tu sitio web que Leia aún no es capaz de hacer todavía. Para asegurarnos de que tengas esas funciones en versiones futuras, por favor envíanos tus opiniones (positivo o negativo) a través del botón \"Da tu Opinión\" en la caja de herramientas."
},
{
    "en": "Give Feedback",
    "es": "Da tu Opinión"
},
{
    "en": "New Domain Name (5/5)",
    "es": "Nueva Extensión (5/5)"
},
{
    "en": "Finally, once you're done editing your site, press the \"Exit Editor\" button in the toolbox. You'll be taken to your Home page, where you can edit your website's domain name, create an account, set up an online store, and much more. Enjoy!",
    "es": "Finalmente, ya que hayas acabado de editar tu sitio, presiona el botón \"Salir del Editor\" en la caja de herramientas. Te traeremos a tu página de Inicio, donde puedes editar la extensión de tu sitio web, crear una cuenta, configurar una tienda en línea, y mucho más. ¡Disfruta!"
},
{
    "en": "Exit Editor",
    "es": "Salir del Editor"
},
{
    "en": "Finish",
    "es": "Terminar"
},
{
    "en": "here is an extra paragraph",
    "es": "aquí hay un párrafo extra"
},
{
    "en": "a website is a collection of",
    "es": "un sitio web es una colección de"
},
{
    "en": "category 1",
    "es": "categoría 1"
},
{
    "en": "category 2",
    "es": "categoría 2"
},
{
    "en": "category 3",
    "es": "categoría 3"
},
{
    "en": "here you can explaining",
    "es": "aquí puedes explicar"
},
{
    "en": "this is a paragraph",
    "es": "esto es un párrafo"
},
{
    "en": "this is a sweet review",
    "es": "ésta es una buena reseña"
},
{
    "en": "Need Some Help?",
    "es": "¿Necesitas Ayuda?"
},
{
    "en": "We've identified a few places on your site with some placeholder content that we should change or remove. Would you like Leia to help walk you through these places?",
    "es": "Hemos identificado algunos lugares en tu sitio que es contenido que deberíamos cambiar o quitar. ¿Te gustaría que Leia te guie por este proceso?"
},
{
    "en": "Let's Do It",
    "es": "Hagámoslo"
},
{
    "en": "Edit Text",
    "es": "Editar Texto"
},
{
    "en": "What do you want to do with this text?",
    "es": "¿Qué te gustaría hacer con este texto?"
},
{
    "en": "Skip For Now",
    "es": "Salta por Ahora"
},
{
    "en": "Remove It",
    "es": "Quítalo"
},
{
    "en": "Change It",
    "es": "Cámbialo"
},
{
    "en": "Use the textbox below to edit the text for this item.",
    "es": "Usa la caja de texto abajo para editar el texto de este elemento."
},
{
    "en": "Update",
    "es": "Actualizar"
},
{
    "en": "Edit Image",
    "es": "Editar Imagen"
},
{
    "en": "What do you want to do with this image?",
    "es": "¿Qué te gustaría hacer con esta imagen?"
},
{
    "en": "Confirmation",
    "es": "Confirmación"
},
{
    "en": "Are you sure you want to remove this image from your page?",
    "es": "¿Seguro que quieres quitar esta imagen de tu página?"
},
{
    "en": "Yes, Remove It",
    "es": "Si, Quítalo"
},
{
    "en": "There was an unknown problem with the image you choose. How would you like to proceed?",
    "es": "Hubo un problema desconocido con la imagen que escogiste. ¿Como te gustaría proceder? "
},
{
    "en": "Invalid Format",
    "es": "Formato Inválido"
},
{
    "en": "The image you selected has an invalid extension. Leia can only use images with .png, .jpg, .jpeg, and.gif file extensions. How would you like to proceed?",
    "es": "La imagen que escogiste tiene una extensión inválida. Leia solamente puede usar imágenes con extensiones .png, .jpg, .jpeg, and.gif. ¿Cómo te gustaría proceder?"
},
{
    "en": "Nothing Chosen",
    "es": "Nada Escogido"
},
{
    "en": "It doesn't look like you chose a photo to use. How would you like to proceed?",
    "es": "Parece que no has escogido una foto para usar. ¿Cómo te gustaría proceder?"
},
{
    "en": "Remove Placeholder Image",
    "es": "Quitar Marcador de Posición de Imagen"
},
{
    "en": "Try Different Photo",
    "es": "Intentar una Foto Diferente"
},
{
    "en": "Nice Work!",
    "es": "¡Buen Trabajo!"
},
{
    "en": "Lastly, let's complete the site by filling in some of the placeholder text.",
    "es": "Últimamente, completemos el sitio llenándolo con algo de texto."
},
{
    "en": "Rebuild Suggestion",
    "es": "Sugerencia de Reconstrucción"
},
{
    "en": "Based on some of the text you deleted, Leia would like to run a quick rebuild on your page to improve the structure for a section or two. Sound good?",
    "es": "Según el texto que has eliminado, a Leia le gustaría hacer una reconstrucción rápida en tu página para mejorar la estructura de una sección o dos. ¿Suena bien?"
},
{
    "en": 'You Did It!',
    "es": "¡Lo Hiciste!"
},
{
    "en": 'Your website should now be pretty much complete. Feel free to continue to make adjustments to the text and images by tapping on them.',
    "es": "Tu sitio web debería de estar completo en este momento. Siéntete libre de continuar haciendo modificaciones al texto e imágenes presionándolos."
},
{
    "en": "Add iFrame",
    "es": "Añadir iFrame"
},
{
    "en": "Add Section",
    "es": "Añadir Sección"
},
{
    "en": "Edit HTML",
    "es": "Editar HTML"
},
{
    "en": "Do you have an iFrame tag to use, or just a URL?",
    "es": "¿Tienes una etiqueta iFrame que quieras usar, o solo un URL?"
},
{
    "en": "iFrame",
    "es": "iFrame"
},
{
    "en": "Just URL",
    "es": "Solo el URL"
},
{
    "en": "Enter the link for the iFrame.",
    "es": "Escribir el enlace del iFrame."
},
{
    "en": "Enter Link",
    "es": "Escribir Enlace"
},
{
    "en": "Enter the code for the iFrame.",
    "es": "Escribe el código del iFrame."
},
{
    "en": "Enter Tag",
    "es": "Escribe Etiqueta"
},
{
    "en": "Submit",
    "es": "Enviar"
},
{
    "en": "Add Button Link",
    "es": "Añadir Enlace del Botón"
},
{
    "en": 'First, enter the link you would like this button to take you to:',
    "es": "Primero, escribe el enlace que te gustaría que este botón te lleve:"
},
{
    "en": "Button Text",
    "es": "Texto del Botón"
},
{
    "en": 'What text would you like to display on the button? You can change this later.',
    "es": "¿Qué texto quieres que el botón tenga? Puedes cambiar esto más tarde."
},
{
    "en": "Enter Text",
    "es": "Escribe el Texto"
},
{
    "en": "Link Location",
    "es": "Enlaza Ubicación"
},
{
    "en": "Would you like this link to open in a new tab?",
    "es": "¿Te gustaría que este enlace se abra en otra pestaña?"
},
{
    "en": 'No, Same Tab',
    "es": "No, Misma Pestaña"
},
{
    "en": "Yes, New Tab",
    "es": "Si, Nueva Pestaña"
},
{
    "en": "Yes",
    "es": "Si"
},
{
    "en": "YES",
    "es": "SI"
},
{
    "en": "Button Theme",
    "es": "Tema del Botón"
},
{
    "en": "Choose a theme for this button.",
    "es": "Escoge un tema para el botón."
},
{
    "en": "Info",
    "es": "Info"
},
{
    "en": "Primary",
    "es": "Primario"
},
{
    "en": "Warning",
    "es": "Advertencia"
},
{
    "en": "Success",
    "es": "Éxito"
},
{
    "en": "Danger",
    "es": "Peligro"
},
{
    "en": "Default",
    "es": "Default"
},
{
    "en": "first",
    "es": "primero"
},
{
    "en": "second",
    "es": "segundo"
},
{
    "en": "third",
    "es": "tercero"
},
{
    "en": "fourth",
    "es": "cuarto"
},
{
    "en": "fifth",
    "es": "quinto"
},
{
    "en": "sixth",
    "es": "sexto"
},
{
    "en": "<label data-error='wrong' data-success='right'>Choose ",
    "es": "<label data-error='wrong' data-success='right'>Escoge "
},
{
    "en": " column type:</label>",
    "es": " un tipo de columna:</label>"
},
{
    "en": "<option value='text'>Text</option>",
    "es": "<option value='text'>Texto</option>"
},
{
    "en": "<option value='image'>Image</option>",
    "es": "<option value='image'>Imagen</option>"
},
{
    "en": "<option value='button'>Button</option>",
    "es": "<option value='button'>Botón</option>"
},
{
    "en": "<option value='iFrame'>iFrame</option>",
    "es": "<option value='iFrame'>iFrame</option>"
},
{
    "en": "<option value='icon-link'>Icon with Link</option>",
    "es": "<option value='icon-link'>Ícono con Enlace</option>"
},
{
    "en": "<option value='icon-link'>Icon with Text</option>",
    "es": "<option value='icon-link'>Ícono con Texto</option>"
},
{
    "en": "<option value='icon-link'>Standalone Icon</option>",
    "es": "<option value='icon-link'>Ícono Solo</option>"
},
{
    "en": "<input type='text' class='form-control validate buttonText' placeholder='Button Text'/>",
    "es": "<input type='text' class='form-control validate buttonText' placeholder='Texto del Botón'/>"
},
{
    "en": "<input type='text' class='form-control validate buttonText' placeholder='URL to Link to'/>",
    "es": "<input type='text' class='form-control validate buttonText' placeholder='URL para Enlazar a'/>"
},
{
    "en": "<label data-error='wrong' data-success='right'>Button background color:</label>",
    "es": "<label data-error='wrong' data-success='right'>Color de fondo del botón:</label>"
},
{
    "en": "Use Color Wheel",
    "es": "Usa Rueda de Color"
},
{
    "en": "or enter HEX value:",
    "es": "o escribe valor HEX:"
},
{
    "en": "or enter HEX value: <input class='form-control newColorInput' id='add-section-button-background-color-value-",
    "es": "o escribe valor HEX: <input class='form-control newColorInput' id='add-section-button-background-color-value-"
},
{
    "en": "<label data-error='wrong' data-success='right'>Button text color:</label>",
    "es": "<label data-error='wrong' data-success='right'>Color de Texto del Botón:</label>"
},
{
    "en": "or enter HEX value: <input class='form-control newColorInput' id='add-section-button-text-color-value-",
    "es": "o escribe valor HEX: <input class='form-control newColorInput' id='add-section-button-background-color-value-"
},
{
    "en": "<label data-error='wrong' data-success='right'>Either enter the full iFrame tag/code...</label>",
    "es": "<label data-error='wrong' data-success='right'>Puedes escribir la etiqueta/código completo del iFrame...</label>"
},
{
    "en": "<input type='text' class='form-control validate buttonText' placeholder='iFrame Code <iframe></iframe>'/>",
    "es": "<input type='text' class='form-control validate buttonText' placeholder='Código iFrame <iframe></iframe>'/>"
},
{
    "en": "<label data-error='wrong' data-success='right'>Or just the URL for the iFrame.</label>",
    "es": "<label data-error='wrong' data-success='right'>O solamente el URL del iFrame.</label>"
},
{
    "en": "<input type='text' class='form-control validate buttonText' placeholder='iFrame URL'/>",
    "es": "<input type='text' class='form-control validate buttonText' placeholder='iFrame URL'/>"
},
{
    "en": "<label data-error='wrong' data-success='right'>Enter the link you want to take the user to when they click the icon:</label>",
    "es": "<label data-error='wrong' data-success='right'>Escribe el enlace al que quieres llevar al usuario cuando hagan click en el ícono:</label>"
},
{
    "en": "<input type='text' class='form-control validate buttonText' placeholder='URL'/>",
    "es": "<input type='text' class='form-control validate buttonText' placeholder='URL'/>"
},
{
    "en": '<h4>Edit Custom Section</h4>',
    "es": "<h4>Editar Sección Personalizada</h4>"
},
{
    "en": '<span onclick="removeOverlayDiv();">Close</span>',
    "es": "<span onclick=\"removeOverlayDiv();\">Cerrar</span>"
},
{
    "en": '" onclick="addColumnToSection()" class="btn btn-success">Add Column</button><br>',
    "es": '" onclick="addColumnToSection()" class="btn btn-success">Añadir Columna</button><br>'
},
{
    "en": '" onclick="removeColumnFromSection()" class="btn btn-danger">Remove Column</button><br>',
    "es": '" onclick="removeColumnFromSection()" class="btn btn-danger">Remover Columna</button><br>'
},
{
    "en": '<button onclick="changeSectionBgAndText()" class="btn btn-primary">Edit Background and Text Color</button>',
    "es": '<button onclick="changeSectionBgAndText()" class="btn btn-primary">Editar Fondo y Color del Texto</button>'
},
{
    "en": '<h4>Add Column</h4>',
    "es": "<h4>Añadir Columna</h4>"
},
{
    "en": '<span onclick="removeOverlayDiv(); loadCustomSectionSettings(activeSection.children[0])">Back</span>',
    "es": '<span onclick="removeOverlayDiv(); loadCustomSectionSettings(activeSection.children[0])">Atrás</span>'
},
{
    "en": '<button onclick="makeColumnAdd();" class="btn btn-primary waves-effect waves-light">Add Column</button>',
    "es": '<button onclick="makeColumnAdd();" class="btn btn-primary waves-effect waves-light">Añadir Columna</button>'
},
{
    "en": "<div class='innerTableContent'><h3 style='font-size: 28px'>Header Here</h3><p style='font-size: 16px'>Enter your text here. By the way, you can delete the header above this if you don't want it by simply changing the text value to nothing.</p></div>",
    "es": "<div class='innerTableContent'><h3 style='font-size: 28px'>Header Here</h3><p style='font-size: 16px'>Escribe tu texto aquí. Por cierto, puedes eliminar el encabezado arriba si no lo quieres simplemente cambiando el valor del texto a nada.</p></div>"
},
{
    "en": "<div class='innerTableContent'><i class='fa-3x fas fa-exclamation-circle'></i><h5>Big Text</h5><hr><p>Small Text</p></div>",
    "es": "<div class='innerTableContent'><i class='fa-3x fas fa-exclamation-circle'></i><h5>Texto Grande</h5><hr><p>Text Pequeño</p></div>"
},
{
    "en": '<option> Column ',
    "es": "<option> Columna "
},
{
    "en": "Choose which column you want to remove.",
    "es": "Escoge que columna quieres remover."
},
{
    "en": "Remove Column",
    "es": "Remover Columna"
},
{
    "en": "Remove Selected",
    "es": "Remover Seleccionados"
},
{
    "en": 'Choose Location',
    "es": "Escoger Ubicación"
},
{
    "en": 'Next, scroll through the page and choose the location where you would like to insert the new section by tapping one of the "Insert" buttons.',
    "es": 'Siguiente, desplázate por la página y escoge la ubicación donde te gustaría añadir la sección nueva al oprimir uno de los botones de "Añadir".'
},
{
    "en": 'Insert',
    "es": "Añadir"
},
{
    "en": 'Next, scroll through the page and choose the location where you would like to insert the new iFrame by tapping one of the "Insert" buttons.',
    "es": 'Siguiente, desplázate por la página y escoge la ubicación donde te gustaría añadir el iFrame nuevo al oprimir uno de los botones de "Añadir".'
},
{
    "en": 'Next, scroll through the page and choose the location where you would like to insert the link by tapping one of the "Insert" buttons.',
    "es": 'Siguiente, desplázate por la página y escoge la ubicación donde te gustaría añadir el enlace al oprimir uno de los botones de "Añadir".'
},
{
    "en": "Unsaved Changes",
    "es": "Cambios Sin Guardar"
},
{
    "en": "It appears that you have some unsaved changes. Would you save before viewing the plans?",
    "es": "Parece que tienes unos cambios sin guardar. ¿Te gustaría guardar antes de ver los planes?"
},
{
    "en": "Exit Without Saving",
    "es": "Salir Sin Guardar"
},
{
    "en": "Save and Exit",
    "es": "Guardar y Salir"
},
{
    "en": 'iPad',
    "es": "iPad"
},
{
    "en": 'iPhone',
    "es": "iPhone"
},
{
    "en": 'iPod',
    "es": "iPod"
},
{
    "en": 'Firefox does not allow you to view your Leia website on different devices. Please try on Google Chrome, Safari, Microsoft Edge, or Opera.',
    "es": "Firefox no deja que veas su sitio Leia en dispositivos diferentes. Por favor intenta Google Chrome, Safari, Microsoft Edge, u Opera."
},
{
    "en": 'This section is as high as it can go.',
    "es": "Esta sección está en lo más alto que puede."
},
{
    "en": 'This section is as low as it can go.',
    "es": "Esta sección está en lo más bajo que puede"
},
{
    "en": "Are you sure you want to delete this section of your page?",
    "es": "¿Estás seguro de que quieres eliminar esta sección de tu página?"
},
{
    "en": "Item",
    "es": "Elemento"
},
{
    "en": "Apply",
    "es": "Aplicar"
},
{
    "en": 'Section Settings',
    "es": "Configuración de Secciones"
},
{
    "en": 'Use the items in this page to edit the settings for the "',
    "es": "Use los elementos de esta página para editar las configuraciones para la sección "
},
{
    "en": '" section. Once you\'ve checked off everything you want to change, hit "Apply" in the top right corner to submit your changes to Leia. You can also tap the circles on the left to change the settings for different sections.',
    "es": '". Ya que hayas marcado todos los cambios que quieras hacer, oprime "Aplicar" en la esquina de arriba a la derecha para enviar todos los cambios a Leia. También puedes oprimir los círculos en la izquierda para cambiar la configuración de diferentes secciones.'
},
{
    "en": "Are you sure you want to delete the newsletter section?",
    "es": "¿Estás seguro de que quieres eliminar la sección del boletín?"
},
{
    "en": "Nice Job!",
    "es": "¡Buen Trabajo!"
},
{
    "en": "Nice job! You just shifted that section ",
    "es": "¡Buen trabajo! Has desplazado esa sección arriba en "
},
{
    "en": ' the page. Feel free to keep moving it and the other sections around as you see fit.',
    "es": " la página. Puedes seguirlo moviendo y las demás secciones a como veas necesario."
},
{
    "en": "New Link",
    "es": "Nuevo Enlace"
},
{
    "en": 'Enter the link you want to take the user to when they tap this item.',
    "es": "Escribe el enlace al que quieres mandar al usuario cuando opriman este elemento."
},
{
    "en": "Your link...",
    "es": "Tu enlace..."
},
{
    "en": 'Success!',
    "es": "¡Éxito!"
},
{
    "en": 'The link for this item has been updated. Feel free to edit the text displayed to the user as well.',
    "es": "El enlace para este elemento ha sido actualizado. Puedes seguir editando el texto que se muestra al usuario si quieres."
},
{
    "en": "Edit Link",
    "es": "Editar Enlace"
},
{
    "en": "Looks like this item can be used to link the user to another page. Do you want to change where it links to?",
    "es": "Parece que este elemento puede ser usado para enlazar al usuario a otra página. ¿Te gustaría cambiar a donde enlaza?"
},
{
    "en": "No",
    "es": "No"
},
{
    "en": "NO",
    "es": "NO"
},
{
    "en": "Do you want to edit the value of this text or just the font size?",
    "es": "¿Te gustaría editar el texto o solo el tamaño?"
},
{
    "en": "Just Font Size",
    "es": "Solo el Tamaño"
},
{
    "en": "Edit Value",
    "es": "Editar Texto"
},
{
    "en": "Edit Icon",
    "es": "Editar Icono"
},
{
    "en": "Do you want to edit the icon for this menu button?",
    "es": "¿Te gustaría editar el icono para este botón del menú?"
},
{
    "en": "Menu",
    "es": "Menú"
},
{
    "en": "Edit Page Menu",
    "es": "Editar Menú de la Página"
},
{
    "en": "Yes, Edit Icon",
    "es": "Si, Editar Icono"
},
{
    "en": 'Close',
    "es": "Cerrar"
},
{
    "en": 'Font Size: ',
    "es": "Tamaño del Texto: "
},
{
    "en": "Edit Images",
    "es": "Editar Imágenes"
},
{
    "en": '<label for="galleryImageName">IMAGE NAME</label>',
    "es": '<label for="galleryImageName">NOMBRE DE IMAGEN</label>'
},
{
    "en": '" type="text" class="form-control" name="galleryImageName" id="galleryImageName" placeholder="Image Name">',
    "es": '" type="text" class="form-control" name="galleryImageName" id="galleryImageName" placeholder="Nombre de Imagen">'
},
{
    "en": '<label for="galleryImageDescription">IMAGE DESCRIPTION</label>',
    "es": '<label for="galleryImageDescription">DESCRIPCION DE LA IMAGEN</label>'
},
{
    "en": '" class="form-control" name="galleryImageDescription" id="galleryImageDescription" placeholder="Image Description">',
    "es": '" class="form-control" name="galleryImageDescription" id="galleryImageDescription" placeholder="Descripción de la Imagen">'
},
{
    "en": '<label id="imageFileLabel" for="galleryFile">IMAGE FILE</label>',
    "es": '<label id="imageFileLabel" for="galleryFile">ARCHIVO DE IMAGEN</label>'
},
{
    "en": 'Browse <input onchange="galleryImageChange(window.event)" id="galleryFile" type="file" accept="image/*" hidden="">',
    "es": ' Buscar <input onchange="galleryImageChange(window.event)" id="galleryFile" type="file" accept="image/*" hidden="">'
},
{
    "en": ' onclick="editingId = \'galleryImage\'; editUploadedImage()" class="btn btn-success" style="margin-top: 5px; width: 60%">Crop/Rotate</label>',
    "es": ' onclick="editingId = \'galleryImage\'; editUploadedImage()" class="btn btn-success" style="margin-top: 5px; width: 60%">Cortar/Rotar</label>'
},
{
    "en": "Gallery Item",
    "es": "Elemento de la Galería"
},
{
    "en": "Use the items below to update this gallery item.",
    "es": "Usa los elementos de abajo para actualizar el elemento de la galería."
},
{
    "en": "It appears that you don't have any characters in the text you're using. Are you sure you want to make this change? Doing so will virtually eliminate this item from your page.",
    "es": "Parece que no hay caracteres en el texto que estas usando. ¿Estás seguro de que quieres hacer este cambio? Esto virtualmente eliminará este elemento de tu página."
},
{
    "en": "On a desktop, the paragraph that you just deleted sits off to the side of some other content, so without it, the other content looks like it's shifted out of place. Do you want Leia to restructure your site so the content is centered?",
    "es": "En una computadora, el párrafo que acabas de eliminar estaba a un lado de otro contenido, sin él, el otro contenido parece que se movió de lugar. ¿Quieres que Leia reestructure tu sitio para que tu contenido esté centrado?"
},
{
    "en": "Are you sure you want to remove this image? If you don't like what you see, you can press the \"Undo Change\" button.",
    "es": "¿Estás seguro de que quieres remover esta imagen? Si no te gusta lo que ves, puedes oprimir el botón \"Deshacer Cambio\"."
},
{
    "en": 'Undo Change',
    "es": "Deshacer Cambio"
},
{
    "en": "Nothing Selected",
    "es": "Nada Seleccionado"
},
{
    "en": "Click on an image in your site to select which one you want to replace with your new image.",
    "es": "Haz click en una imagen en tu sitio para seleccionar cual quieres reemplazar con tu nueva imagen."
},
{
    "en": "Nothing Uploaded",
    "es": "Nada Cargado"
},
{
    "en": "Use the \"Browse\" button to select the image that you want to replace the selected one.",
    "es": "Usa el botón \"Navegar\" para seleccionar la imagen que quieres que reemplace la que esta seleccionada."
},
{
    "en": "Click on an image in your site to select which one you want to revert back to it's original image.",
    "es": "Haz click en una imagen en tu sitio para seleccionar cual quieres revertir a la imagen original."
},
{
    "en": "Nothing to Revert To",
    "es": "Nada que Revertir"
},
{
    "en": "I don't know what this image used to be for some reason. If you've reloaded this page since saving a change, that means I lost the old image.",
    "es": "No me acuerdo que imagen era esta por alguna razón. Si refrescaste esta página desde que guardaste un cambio, puede ser que perdí la imagen antigua."
},
{
    "en": "Ask Leia",
    "es": "Pregúntale a Leia"
},
{
    "en": "Press and hold down the button while you tell Leia what you want to change.",
    "es": "Deja presionado el botón mientras le dices a Leia el cambio que quieres hacer."
},
{
    "en": "One Moment",
    "es": "Un Momento"
},
{
    "en": "Please wait until the current process finishes.",
    "es": "Por favor espera mientras se completa el proceso."
},
{
    "en": "Are you sure you want to save your changes? This can't be undone.",
    "es": "¿Estás seguro de que quieres guardar los cambios? Esto no se puede revertir."
},
{
    "en": 'Nothing To Save',
    "es": "Nada que Guardar"
},
{
    "en": 'It appears that you have no changes to save.',
    "es": "Parece que no tienes cambios que guardar."
},
{
    "en": "It appears that you are not authorized to save changes for this site. We need to sign you in!",
    "es": "Parece que no estas autorizado para hacer cambios a este sitio. ¡Necesitamos que inicies sesión!"
},
{
    "en": 'Changes Saved',
    "es": "Cambios Guardados"
},
{
    "en": 'Your changes have been saved!',
    "es": "¡Tus cambios han sido guardados!"
},
{
    "en": 'The request timed out. Please ensure that you have a good connection to the internet, then try again. If the issue persists, contact us.',
    "es": "La solicitud ha caducado. Por favor asegúrate de que tengas una buena conexión al internet, e intenta de nuevo. Si el problema persiste, contáctanos."
},
{
    "en": 'There appears to be an issue saving your changes. Please try again in a moment.',
    "es": "Parece que hubo un problema guardando tus cambios. Por favor intenta de nuevo en un momento."
},
{
    "en": "It appears that you have some unsaved changes. Would you save before exiting?",
    "es": "Parece que tienes unos cambios sin guardar. ¿Te gustaría guardar los cambios antes de salir?"
},
{
    "en": "It appears that you have some unsaved changes. Would you like to save before viewing your site?",
    "es": "Parece que tienes unos cambios sin guardar. ¿Te gustaría guardar los cambios antes de ver tu sitio?"
},
{
    "en": 'No, View Site',
    "es": "No, Ver Sitio"
},
{
    "en": 'Your Site Is Loading...',
    "es": "Tu Sitio Está Cargando..."
},
{
    "en": "You can either request a brand new design with the \"Just Redo It\" button, or check of individual things you want Leia to change by pressing the \"Make Adjustments\" button. How would you like to proceed?",
    "es": "Puedes pedir un diseño nuevo con el botón \"Rehacer\", o marcar cosas individuales que quieres que Leia cambie presionando el botón \"Hacer Ajustes\". ¿Cómo quieres proceder?"
},
{
    "en": "Make Adjustments",
    "es": "Hacer Ajustes"
},
{
    "en": "Just Redo It",
    "es": "Rehacer"
},
{
    "en": "Redesign Site",
    "es": "Rediseñar Sitio"
},
{
    "en": 'Use the items in this page to edit the settings for the different sections of your page. Once you\'ve checked off everything you want to change, hit "Apply" in the top right corner to submit your changes to Leia. You can also tap the circles on the left to change the settings for different sections.',
    "es": 'Usa los elementos de esta página para editar la configuración de secciones diferentes de tu página. Cuando hayas marcado todos los cambios que quieras hacer, presiona "Aplicar" en la esquina de arriba a la derecha para enviar tus cambios a Leia. También puedes oprimir los círculos en la izquierda para cambiar la configuración de diferentes secciones.'
},
{
    "en": "Edit Structure (1/3)",
    "es": "Editar Estructura (1/3)"
},
{
    "en": "You can use the items in this section to check off what you like and don't like about your site, so Leia can design you a new, better version. Once you've checked off everything that you want to change, hit the \"Apply\" button in the top right to submit your changes.",
    "es": "Puedes usar los elementos de esta sección para marcar lo que te gusta y lo que no te gusta de tu sitio, así Leia puede diseñar una versión mejorada. Cuando hayas marcado todos los cambios que quieras hacer, oprime el botón \"Aplicar\" en la esquina de arriba a la derecha para enviar tus cambios."
},
{
    "en": "Edit Structure (2/3)",
    "es": "Editar Estructura (2/3)"
},
{
    "en": "At the top of the \"General Structure\" section, you'll see options for choosing a completely new style and structure. These options are perfect if you don't have anything specific about the style that you want to change, but you just want to see a new version.",
    "es": "Arriba de la sección \"Estructura General\", vas a poder ver las opciones para escoger una estructura y estilo nuevos. Estas opciones son perfectas si no tienes nada en específico sobre el estilo que te gustaría cambiar, pero solo quieres ver una versión nueva."
},
{
    "en": "Edit Structure (3/3)",
    "es": "Editar Estructura (3/3)"
},
{
    "en": "Many options have a \"Match to Style\" button. This means that Leia will make the decision based upon the other elements of the page. If you're not sure what a particular option means, simply tap on the question-mark icon next to its header to get some info.",
    "es": "Muchas opciones tienen el botón \"Emparejar Estilo\". Esto quiere decir que Leia puede hacer una decisión basado en otros elementos de la página. Si no estás seguro de que quiere decir una opción en particular, simplemente oprime el icono de pregunta a lado de su encabezado para tener información."
},
{
    "en": "Match to Style",
    "es": "Editar Estructura"
},
{
    "en": "Edit Structure (4/4)",
    "es": "Emparejar Estilo"
},
{
    "en": "General Structure",
    "es": "Estructura General"
},
{
    "en": "Lastly, if you have something in particular that you want to change about your site, but you don't know where to look, you can tap the \"Ask Leia\" button in the top right corner to tell Leia what you want to do. You'll then be directed to the proper part of this form to edit what you want to edit.",
    "es": "Por último, si tienes algo en particular que quieres cambiar en tu sitio, pero no sabes en donde buscar, puedes oprimir el botón \"Pregúntale a Leia\" en la esquina de arriba a la derecha para decirle a Leia que es lo que quieres. Serás guiado a la parte correcta de la forma para editar lo que quieres editar."
},
{
    "en": "At the top of the \"General Structure\" section, you'll see an option for choosing a completely new style. This option is perfect if you don't have anything specific about the style that you want to change, but you just want to see a new version. Note, however, that this button doesn't change the structure of the page. To do that, use the other items in the form.",
    "es": "Arriba de la sección \"Estructura General\", puedes ver la opción para escoger un estilo completamente nuevo. Esta opción es perfecta si no tienes algo específico del estilo que te gustaría cambiar, pero quieres ver una versión nueva. Sin embargo, este botón no cambia la estructura de la página. Para hacer eso, hay otros elementos en la forma."
},
{
    "en": "It appears that you have some unsaved changes. Would you like to exit anyway?",
    "es": "Parece que tienes unos cambios sin guardar. ¿Te gustaría salir de cualquier manera?"
},
{
    "en": "Exit",
    "es": "Salir"
},
{
    "en": "Are you sure you want to submit these changes? You will be able to revert back to your current version if you don't like how the new one looks.",
    "es": "¿Estás seguro de que quieres enviar estos cambios? Puedes revertir a esta versión si no te gusta como se ve el nuevo."
},
{
    "en": "Yes, Submit",
    "es": "Si, Enviar"
},
{
    "en": "Do you want to save your changes to this image?",
    "es": "¿Quieres guardar los cambios a esta imagen?"
},
{
    "en": 'No, Discard Changes',
    "es": "No, Descartar Cambios"
},
{
    "en": "Yes, Save Changes",
    "es": "Si, Guardar Cambios"
},
{
    "en": "Save Changes",
    "es": "Guardar Cambios"
},
{
    "en": 'What\'s This?',
    "es": "¿Qué es Esto?"
},
{
    "en": "Are you sure you want to reset your site back to the way it was before the last time you edited the structure?",
    "es": "¿Estás seguro de que quieres revertir el sitio a como estaba antes de que editaras la estructura?"
},
{
    "en": "Yes, Revert To Previous Version",
    "es": "Si, Revertir a Versión Anterior"
},
{
    "en": "Are you sure you want to change your site back to the next most recent version?",
    "es": "¿Estás seguro de que quieres cambiar tu sitio a la versión más reciente? "
},
{
    "en": "Yes, View Newer Version",
    "es": "Si, Ver la Versión Más Reciente"
},
{
    "en": "Newer Version",
    "es": "Versión Más Reciente"
},
{
    "en": "It appears that you are not authorized to make changes to this site. We need to sign you in!",
    "es": "Parece que no estas autorizado para hacer cambios en este sitio. ¡Necesitamos que inicies sesión!"
},
{
    "en": 'There appears to be an issue with your connection. Please try again in a moment.',
    "es": "Parece que hay un problema con tu conexión. Por favor intenta de nuevo en un momento."
},
{
    "en": 'Value',
    "es": "Valor"
},
{
    "en": 'There appears to be an issue applying your changes. Please try again in a moment.',
    "es": "Parece que hay un problema aplicando estos cambios. Por favor intenta de nuevo en un momento."
},
{
    "en": "FYI",
    "es": "FYI"
},
{
    "en": "Editing HTML on a mobile device can be a bit slow. Our suggestion is that you log into the editor at HeyLeia.com and edit the HTML from there.",
    "es": "Editar HTML en un dispositivo móvil puede ser un poco lento. Sugerimos que inicies sesión en el editor de HeyLeia.com y edites el HTML desde ahí."
},
{
    "en": "Our suggestion is that you copy this code into an editor on your local machine and edit it from there. Once you're done, you can paste it back into this editor and hit Apply to save it.",
    "es": "Sugerimos que copies este código a un editor en tu computadora y edites desde ahí. Ya que lo hagas, puedes volverlo a pegar a este editor y oprimir Aplicar para guardarlo."
},
{
    "en": '<option value="mainNav">Menu Bar</option>',
    "es": '<option value="mainNav">Barra de Menú</option>'
},
{
    "en": '<option value="header">Top Section</option>',
    "es": '<option value="header">Sección Superior</option>'
},
{
    "en": '<option value="about">About Us</option>',
    "es": '<option value="about">Sobre Nosotros</option>'
},
{
    "en": '<option value="features">Features</option>',
    "es": '<option value="features">Funciones</option>'
},
{
    "en": '<option value="gallery">Gallery</option>',
    "es": '<option value="gallery">Galería</option>'
},
{
    "en": 'Gallery',
    "es": 'Galería'
},
{
    "en": 'Features',
    "es": 'Funciones'
},
{
    "en": 'Testimonials',
    "es": 'Testimonios'
},
{
    "en": 'Team',
    "es": 'Equipo'
},
{
    "en": 'Contact Us',
    "es": 'Contáctanos'
},
{
    "en": '<option value="testimonials">Testimonials</option>',
    "es": '<option value="testimonials">Testimonios</option>'
},
{
    "en": '<option value="team">Team</option>',
    "es": '<option value="team">Equipo</option>'
},
{
    "en": '<option value="blog">Blog</option>',
    "es": '<option value="blog">Blog</option>'
},
{
    "en": '<option value="contact">Contact Us</option>',
    "es": '<option value="contact">Contáctanos</option>'
},
{
    "en": '<option value="footer">Footer</option>',
    "es": '<option value="footer">Pie de Página</option>'
},
{
    "en": '<option value="XnewX">Create New Section</option>',
    "es": '<option value="XnewX">Crear Sección Nueva</option>'
},
{
    "en": '">Custom Section ',
    "es": '">Sección Personalizada'
},
{
    "en": "Edit HTML",
    "es": "Editar HTML"
},
{
    "en": "Choose which section you want to edit.",
    "es": "Escoge que sección quieres editar"
},
{
    "en": "Submit Feedback",
    "es": "Enviar Opinión"
},
{
    "en": 'Thank you so much for using Leia! We will always be seeking your feedback to better understand what new features to add. Please send us a message below indicating what you like and/or don\'t like about the platform!',
    "es": "¡Muchas gracias por usar Leia! Siempre buscamos tu opinión para entender que nuevas funciones podemos añadir. ¡Por favor envíanos un mensaje abajo indicando que te gustó o no de la plataforma!"
},
{
    "en": "Your Email",
    "es": "Tu Email"
},
{
    "en": 'If you\'re having issues with your site, please provide your email so we can get in touch with you after we fix the problem:',
    "es": "Si estas teniendo problemas con tu sitio, por favor danos tu email para que podamos contactarte y arreglar el problema:"
},
{
    "en": "Your email...",
    "es": "Tu email..."
},
{
    "en": "Skip",
    "es": "Saltar"
},
{
    "en": "None",
    "es": "Ninguno"
},
{
    "en": "\n\nFrom user: ",
    "es": "\n\nDe usuario: "
},
{
    "en": "\n\nMissing Features: ",
    "es": "\n\nFunciones Faltantes: "
},
{
    "en": "It appears that you are not authorized to submit feedback on this site. We need to sign you in!",
    "es": "Parece que no estas autorizado para enviar opiniones en este sitio. ¡Necesitamos que inicies sesión!"
},
{
    "en": 'Thank You!',
    "es": "¡Gracias!"
},
{
    "en": 'Your feedback has been submitted successfully. We will take it into account when putting out new versions of the platform!',
    "es": "Tu opinión ha sido enviada exitosamente. ¡Lo tendremos en cuenta cuando hagamos nuevas versiones de la plataforma!"
},
{
    "en": 'There appears to be an issue submitting your feedback. Please try again in a moment.',
    "es": "Parece que hubo un problema enviando tu opinión. Por favor intenta de nuevo en un momento."
},
{
    "en": "New Post",
    "es": "Publicación Nueva"
},
{
    "en": "Create your post using the following items.",
    "es": "Crea tu publicación usando estos elementos."
},
{
    "en": "Post",
    "es": "Publicar"
},
{
    "en": "Create Post",
    "es": "Crea Publicación"
},
{
    "en": "Edit Post",
    "es": "Editar Publicación"
},
{
    "en": "click here",
    "es": "haz click aquí"
},
{
    "en": "Edit the contents of your post below, then press Save.",
    "es": "Edita el contenido de tu publicación abajo, luego presiona Guardar."
},
{
    "en": "This option enables visitors to make comments on your posts and engage with both you and one another. It is only available, however, with an upgraded plan. To view available plans, please <a href='javascript:launchUpgradeURL(false)'>click here</a>.",
    "es": "Esta opción permite que los visitantes hagan comentarios en tus publicaciones y entablen una conversación contigo y entre ellos. Esto solo está disponible con un plan premium. Para ver los planes disponibles, por favor <a href='javascript:launchUpgradeURL(false)'>haz click aquí</a>."
},
{
    "en": "This option enables visitors to make comments on your posts and engage with both you and one another.",
    "es": "Esta opción permite que los visitantes hagan comentarios en tus publicaciones y entablen una conversación contigo y entre ellos."
},
{
    "en": "When you create a post, it can either be a pop-up in your page, or it can be it's own page with a sharable link. Only <a href='javascript:launchUpgradeURL(true)'>Leia Business</a> users have access to the \"Separate Page\" option, but upgrading is only $3.99 per month!",
    "es": "Cuando creas una publicación, puede aparecer en tu página, o puede estar en su propia página con un vínculo compartible. Solo usuarios de <a href='javascript:launchUpgradeURL(true)'>Leia Business</a> tienen acceso a la opción de \"Página Separada\", pero ¡obtener el plan solo cuenta $3.99 al mes!"
},
{
    "en": "When you create a post, it can either be a pop-up in your page, or it can be it's own page with a sharable link.",
    "es": "Cuando creas una publicación, puede aparecer en tu página, o puede estar en su propia página con un vínculo compartible."
},
{
    "en": '<span onclick="removePostDiv();">Close</span>',
    "es": '<span onclick="removePostDiv();">Cerrar</span>'
},
{
    "en": '<label for="galleryImageName">POST TITLE</label>',
    "es": '<label for="galleryImageName">TITULO DE PUBLICACIÓN</label '
},
{
    "en": '" type="text" class="form-control" name="galleryImageName" id="galleryImageName" placeholder="Post Title">',
    "es": '" type="text" class="form-control" name="galleryImageName" id="galleryImageName" placeholder="Título de la Publicación">'
},
{
    "en": '<label id="imageFileLabel" for="galleryFile">POST IMAGE (optional)</label>',
    "es": '<label id="imageFileLabel" for="galleryFile">IMAGEN DE PUBLICACIÓN (opcional)</label>'
},
{
    "en": 'margin-top: 5px; width: 60%">Crop/Rotate</label>',
    "es": 'margin-top: 5px; width: 60%">Cortar/Rotar</label>'
},
{
    "en": '<label>POST CONTENT</label>',
    "es": '<label>CONTENIDO DE PUBLICACIÓN</label>'
},
{
    "en": '<label for="galleryImageDescription">ALLOW COMMENTS</label>',
    "es": '<label for="galleryImageDescription">PERMITIR COMENTARIOS</label>'
},
{
    "en": '</p><br>Yes: <input ',
    "es": "</p><br>Si: <input "
},
{
    "en": '/> No: <input ',
    "es": "/> No: <input "
},
{
    "en": '<label for="galleryImageDescription">CREATE AS NEW PAGE</label>',
    "es": '<label for="galleryImageDescription">CREAR EN UNA PÁGINA NUEVA</label>'
},
{
    "en": '</p><br>Separate Page: <input  style="margin-right: 20px;" onchange="document.getElementById(\'newPageNo\').checked = !this.checked;" type="checkbox" id="newPageYes" ',
    "es": '</p><br>Página Separada: <input  style="margin-right: 20px;" onchange="document.getElementById(\'newPageNo\').checked = !this.checked;" type="checkbox" id="newPageYes" '
},
{
    "en": '/> Pop Up: <input checked id="newPageNo" onchange="document.getElementById(\'newPageYes\').checked = !this.checked;" type="checkbox"',
    "es": '/> Pop Up: <input checked id="newPageNo" onchange="document.getElementById(\'newPageYes\').checked = !this.checked;" type="checkbox"'
},
{
    "en": '<button onclick="removePostDiv();" class="btn btn-default" style="margin-right: 10px;">Cancel</button>',
    "es": '<button onclick="removePostDiv();" class="btn btn-default" style="margin-right: 10px;">Cancelar</button>'
},
{
    "en": "Are you sure you want to delete this post? This action cannot be undone.",
    "es": "¿Estás seguro de que quieres eliminar esta publicación? Esto no se puede revertir."
},
{
    "en": "It appears that you have some unsaved changes. Would you save before loading your other page?",
    "es": "Parece que tienes unos cambios sin guardar. ¿Te gustaría guardar los cambios antes de cargar otra página?"
},
{
    "en": "Yes, Save First",
    "es": "Si, Guardar Primero"
},
{
    "en": "Your post has been made! Do you want to see it?",
    "es": "¡Se hizo tu publicación! ¿Te gustaría verlo?"
},
{
    "en": "Your changes have been made! Do you want to see them?",
    "es": "¡Se han hecho los cambios! ¿Te gustaría verlos?"
},
{
    "en": "There was an error retrieving your posts. Please try again later.",
    "es": "Hubo un error cargando tus publicaciones. Por favor intenta de nuevo más tarde."
},
{
    "en": "delete a comment for",
    "es": "elimina un comentario para"
},
{
    "en": "It doesn't look like you have any posts to ",
    "es": "Parece que no tienes publicaciones que "
},
{
    "en": "Which Post?",
    "es": "¿Cuál Publicación?"
},
{
    "en": 'edit',
    "es": "editar"
},
{
    "en": "Edit",
    "es": "Editar"
},
{
    "en": "Delete Post",
    "es": "Eliminar Publicación"
},
{
    "en": "Delete",
    "es": "Eliminar"
},
{
    "en": "Choose which post you want to ",
    "es": "Escoge que publicación quieres que "
},
{
    "en": "It doesn't look like this posts has any comments. If you think this is wrong, please refresh the page.",
    "es": "Parece que estas publicaciones no tienen comentarios. Si crees que esto no es correcto, por favor refresca la página."
},
{
    "en": "Choose which comment you want to delete.",
    "es": "Escoge que comentario quieres eliminar."
},
{
    "en": "Delete Comment",
    "es": "Eliminar Comentario"
},
{
    "en": "Are you sure you want to delete this comment? This action cannot be undone.",
    "es": "¿Estás seguro de que quieres eliminar este comentario? Esto no se puede revertir."
},
{
    "en": "This option enables visitors to make comments on your posts and engage with both you and one another. It is only available, however, with an upgraded plan. To upgrade, exit the editor, then press upgrade next to your site from the projects page.",
    "es": " Esta opción permite que los visitantes hagan comentarios en tus publicaciones y entablen una conversación contigo y entre ellos. Solamente está disponible con un plan premium. Para actualizar a un plan premium, sal del editor, y presiona actualizar a un lado de tu sitio desde la página de proyectos."
},
{
    "en": "Comments",
    "es": "Comentarios"
},
{
    "en": '<label for="numPostsBox">MAXIMUM NUMBER</label>',
    "es": '<label for="numPostsBox">NÚMERO MAXIMO</label>'
},
{
    "en": "Number of Posts",
    "es": "Número de Publicaciones"
},
{
    "en": "If you have a lot of posts, and you don't want to display all of them to the user at once, use this field to choose how many to load initially. If you always want to display all posts, enter 0.",
    "es": "Si tienes muchas publicaciones, y no quieres enseñarlas al usuario todas a la vez, puedes utilizar este campo para escoger cuales cargar inicialmente. Si siempre quieres enseñar todas tus publicaciones, escribe 0."
},
{
    "en": '../blogs/setMaxPosts.php',
    "es": "../blogs/setMaxPosts.php"
},
{
    "en": "Your maximum post number has been updated successfully.",
    "es": "El número máximo de publicaciones ha sido actualizado exitosamente."
},
{
    "en": "Ok",
    "es": "Ok"
},
{
    "en": "There was an error updating your info. Please try again later.",
    "es": "Hubo un error actualizando tu información. Por favor intenta de nuevo más tarde."
},
{
    "en": "Your post has been deleted successfully.",
    "es": "Tu publicación ha sido borrada exitosamente."
},
{
    "en": "There was an error deleting your post. Please try again later.",
    "es": "Hubo un error borrando tu publicación. Por favor intenta de nuevo más tarde."
},
{
    "en": "The comment has been deleted successfully.",
    "es": "El comentario ha sido borrado exitosamente."
},
{
    "en": "There was an error deleting the comment. Please try again later.",
    "es": "Hubo un error borrando el comentario. Por favor intenta de nuevo más tarde."
},
{
    "en": '<h4>Edit Menu Items</h4>',
    "es": "<h4>Editar Elementos del Menú<h4>"
},
{
    "en": '" onclick="addItemToMenu()" class="btn btn-success">Add Item</button>',
    "es": '" onclick="addItemToMenu()" class="btn btn-success">Añadir Elemento</button>'
},
{
    "en": '<button onclick="saveMenuItems()" class="btn btn-primary">Save</button>',
    "es": '<button onclick="saveMenuItems()" class="btn btn-primary">Guardar</button>'
},
{
    "en": '<label for="newMenuItemText">ITEM TEXT</label>',
    "es": '<label for="newMenuItemText">TEXTO DEL ELEMENTO</label>'
},
{
    "en": '<input type="text" class="form-control" id="newMenuItemText" placeholder="New Item">',
    "es": '<input type="text" class="form-control" id="newMenuItemText" placeholder="Nuevo Elemento">'
},
{
    "en": '<label for="newMenuItemLink">ITEM LINK</label>',
    "es": '<label for="newMenuItemLink">ENLACE DEL ELEMENTO</label>'
},
{
    "en": '<input type="text" class="form-control" id="newMenuItemLink" placeholder="/directory">',
    "es": '<input type="text" class="form-control" id="newMenuItemLink" placeholder="/directory">'
},
{
    "en": "Add Item",
    "es": "Añadir Elemento"
},
{
    "en": "Use the two inputs below to add an item to your menu. You can change these values at any time by clicking on the menu.",
    "es": "Usa estas dos entradas abajo para añadir un elemento a tu menú. Puedes cambiar estos valores en cualquier momento haciendo click en el menú."
},
{
    "en": "Remove From Menu",
    "es": "Remover del Menú"
},
{
    "en": "Are you sure you want to remove this item from your menu?",
    "es": "¿Estás seguro de que quieres remover este elemento del menú?"
},
{
    "en": 'No, Cancel',
    "es": "No, Cancelar"
},
{
    "en": "There was an issue saving your changes. Please try again later.",
    "es": "Hubo un problema guardando tus cambios. Por favor intenta de nuevo más tarde."
},
{
    "en": 'There appears to be an issue making your request. Please try again in a moment.',
    "es": "Hubo un problema mandando tu solicitud. Por favor intenta de nuevo más tarde."
},
{
    "en": "You need to include some content in your post!",
    "es": "¡Necesitas incluir algo de contenido en tu publicación!"
},
{
    "en": "There was an error making your post. Please try again later.",
    "es": "Hubo un problema haciendo tu publicación. Por favor intenta de nuevo más tarde."
},
{
    "en": "It appears that you have some unsaved changes. After you add a page to your site, Leia will refresh the editor, and any unsaved changes will be lost. Would you like to save before proceeding?",
    "es": "Parece que tienes unos cambios sin guardar. Después de que añadas una página a tu sitio, Leia refrescará el editor, y todos los cambios sin guardar se perderán. ¿Te gustaría guardar antes de continuar?"
},
{
    "en": 'No, Continue',
    "es": "No, Continuar"
},
{
    "en": 'Add a Page',
    "es": "Añadas una Página"
},
{
    "en": 'Add Page',
    "es": "Añadas una Página"
},
{
    "en": "Overwrite",
    "es": "Sobrescribir"
},
{
    "en": "Looks like you already have a page at that directory. Do you want to overwrite it?",
    "es": "Parece que ya tienes una página en ese directorio. ¿Te gustaría sobrescribirlo?"
},
{
    "en": "Yes, Overwrite It",
    "es": "Si, Sobrescribir"
},
{
    "en": 'Invalid Name',
    "es": "Nombre Inválido"
},
{
    "en": 'Please do not include slashes in your page name. For example, if you want to create a page at ',
    "es": "Por favor no incluyas barras (/) en el nombre de la página. Por ejemplo, si quieres crear una página en "
},
{
    "en": 'Example: pub-123456789',
    "es": "Ejemplo: pub-123456789"
},
{
    "en": '/example, just enter \"example\" for the name.',
    "es": "/ejemplo, solo escribe \"ejemplo\" para el nombre."
},
{
    "en": "Choose the menu item that you want to replace with this link:",
    "es": "Escoge el elemento del menú que te gustaría reemplazar con este enlace:"
},
{
    "en": "Choose the menu item that you want to insert this link after:",
    "es": "Escoge el elemento del menú que te gustaría añadir con este enlace:"
},
{
    "en": "Choose Item",
    "es": "Escoger Elemento"
},
{
    "en": "It appears that you have some unsaved changes. After you delete a page, Leia will refresh the editor, and any unsaved changes will be lost. Would you like to save before proceeding?",
    "es": "Parece que tienes unos cambios sin guardar. Después de que elimines una página, Leia refrescará el editor, y todos los cambios sin guardar se perderán. ¿Te gustaría guardar antes de continuar?"
},
{
    "en": "It doesn't look like you have any pages to edit. If you think this is wrong, please refresh the page.",
    "es": "Parece que no tienes una página que editar. Si crees que esto esta incorrecto, por favor refresca la página."
},
{
    "en": "Choose which page you want to edit.",
    "es": "Escoge la página que quieres editar."
},
{
    "en": "Edit Page",
    "es": "Editar Página"
},
{
    "en": "Edit Selected",
    "es": "Editar Selección"
},
{
    "en": "Edit a Page",
    "es": "Editar Una Página"
},
{
    "en": "It doesn't look like you have any pages to delete. If you think this is wrong, please refresh the page.",
    "es": "Parece que no tienes una página que eliminar. Si crees que esto esta incorrecto, por favor refresca la página."
},
{
    "en": "Choose which page you want to delete.",
    "es": "Escoge la página que quieres eliminar."
},
{
    "en": "Delete Page",
    "es": "Eliminar Página"
},
{
    "en": "Delete a Page",
    "es": "Eliminar una Página"
},
{
    "en": "Page Deleted",
    "es": "Página Eliminada"
},
{
    "en": "Your page has been deleted successfully.",
    "es": "Tu página ha sido eliminada exitosamente."
},
{
    "en": "Page Created",
    "es": "Página Creada"
},
{
    "en": "Your page has been created successfully. Once the editor refreshes, you can edit your page by pressing the \"Edit Page\" button in the menu bar.",
    "es": "Tu página ha sido creada exitosamente. Cuando el editor se refresque, puedes editar tu página presionando el botón \"Editar Página\" en la barra del menú."
},
{
    "en": "Please insert your Publisher ID in the form of pub-xxxxxxxxxxxxxxxx",
    "es": "Por favor añade tu ID de Publicador en la forma pub- xxxxxxxxxxxxxxxx"
},
{
    "en": 'Google Adsense code has been added to your site. Next, please save your site, then go back to Google Ads and check off that you\'ve added the code so they can begin the verification process. Note that your ads will not show up until that process is complete.',
    "es": "El código de Google Adsense ha sido añadido a tu sitio. Por favor guarda tu página, y luego vuelve a Google Ads y checa que hayas añadido el código para que ellos puedan iniciar su proceso de verificación. Los anuncios no saldrán hasta que el proceso este completo."
},
{
    "en": "Thanks for sharing Leia with your Facebook friends! We will now track your post and automatically update your website with Leia Business as people like and share your post.!",
    "es": "¡Gracias por compartir Leia con tus amigos en Facebook! ¡Vamos a seguir a tu publicación y automáticamente actualizaremos tu sitio web con Leia Business mientras gente comparta y les guste tu publicación!"
},
{
    "en": "By checking \"Yes\" for this item, Leia will redesign your site completely - that means new images, colors, text, font families, and font sizes. The rest of the questions can be used to edit the structure of the page, but you don't need to do anything with them if you don't want to.",
    "es": "Marcando \"Si\" para este elemento, Leia rediseñará tu sitio completamente - eso quiere decir nuevas imágenes, colores, texto, estilo y tamaño de texto. El resto de tus preguntas pueden ser usadas para editar la estructura de la página, pero no necesitas hacer algo con ellos si no quieres."
},
{
    "en": "Use this dropdown to check off what you do not like about the current design, so Leia can be sure to make the appropriate changes.",
    "es": "Usa este menú para marcar las cosas que no te gustan del diseño actual, así Leia puede hacer los cambios apropiados."
},
{
    "en": "By checking \"Yes\" for this item, Leia will restructure your site by shifting the positions of the items in each section that you pick in the next dropdown. Leia may also decide to add completely new elements to the selected sections.",
    "es": "Marcando \"Si\" para este elemento, Leia va a restructurar tu sitio cambiando las posiciones de los elementos en cada sección que escojas en el siguiente menú. Leia también puede añadir elementos completamente nuevos en las secciones seleccionadas."
},
{
    "en": "Use this dropdown to check off which sections of your site you would like for Leia to restructure.",
    "es": "Usa este menú para marcar las secciones de tu sitio que quiera que Leia reestructure."
},
{
    "en": "This item is for choosing the font type for your site. You can either use the one that Leia chose for you or choose one yourself.",
    "es": "Este elemento es para escoger el estilo de fuente para tu sitio. Puedes usar el que Leia escoja para ti o escoger uno tú mismo."
},
{
    "en": "If you want to use a custom font that is not native to all browsers (some might not know what your font is), then you can provide a link to it here.",
    "es": "Si quieres usar una fuente personalizada que no es usada por un navegador (los navegadores puede que no reconozcan la fuente), entonces puedes escribir el enlace aquí."
},
{
    "en": "Good looking sites have one main color used in them to create the feel. This is where you can choose that main color.",
    "es": "Sitios que se ven bien tienen un color principal para crear su estilo. Aquí puedes escoger el color principal."
},
{
    "en": "Main Color:",
    "es": "Color Principal:"
},
{
    "en": "This feature will add a link to your site that allows users to shop your inventory of products. The actual products can all be managed from the \"Dashboard\" of your account, which you'll see a link to if you go to HeyLeia.com/Projects.",
    "es": "Esta función añadirá un enlace a tu sitio que permitirá a los usuarios comprar de tu inventario de productos. Los productos pueden ser manejados desde el \"Tablero\" de tu cuenta, y puedes ver un enlace para ir a él si vas a HeyLeia.com/Projects."
},
{
    "en": "This is for choosing where you want to place the button for users to click to navigate to your shop.",
    "es": "Aquí puedes escoger el lugar para poner el botón donde los usuarios pueden hacer click para navegar tu tienda."
},
{
    "en": "This feature will add a link to your site that allows users to book services with you. The actual services that you offer can all be managed from the \"Dashboard\" of your account, which you'll see a link to if you go to HeyLeia.com/Projects.",
    "es": "Esta función añadirá un enlace a tu sitio que permitirá a los usuarios solicitar tus servicios. Los servicios que ofreces pueden ser manejados desde el \"Tablero\" de tu cuenta, y puedes ver un enlace para ir a él si vas a HeyLeia.com/Projects."
},
{
    "en": "This is for choosing where you want to place the button for users to click to navigate to your booking page.",
    "es": "Aquí puedes escoger el lugar para poner el botón donde los usuarios pueden hacer click para navegar tu página de servicios."
},
{
    "en": "If you have a shop or book button in your main section, this is for choosing the colors used in those buttons.",
    "es": ""
},
{
    "en": "This is a section on your page that you can post dynamic content to such as events or updates (or blog posts).",
    "es": "Puedes usar esta sección de tu página para poner contenido dinámico como eventos o actualizaciones (o blogs)."
},
{
    "en": "This is a section on your page that you can post dynamic content to such as events or updates (or blog posts).",
    "es": "Puedes usar esta sección de tu página para poner contenido dinámico como eventos o actualizaciones (o blogs)."
},
{
    "en": "This is a small form on your page that allows users to enter their email and subscribe to your newsletter or mailing list.",
    "es": "Esta es una pequeña forma en tu página que permitirá a los usuarios escribir su email y suscribirse a tu boletín o lista de correos."
},
{
    "en": "This is for choosing the location of your newsletter input form. You can put it in the main section at the top of the page, or in it's own section somewhere lower.",
    "es": "Esto es para escocer la ubicación de la forma de entrada del boletín. Puedes ponerlo en la sección principal en la parte de arriba de la página., o puede tener su propia sección abajo."
},
{
    "en": "This is for choosing the background color of the newsletter form",
    "es": "Esto es para escoger el color del fondo de la forma del boletín"
},
{
    "en": "This is for choosing the text color of the newsletter form",
    "es": "Esto es para escoger el color del texto de la forma del boletín"
},
{
    "en": "Text Color:",
    "es": "Color del Texto:"
},
{
    "en": "Background Color:",
    "es": "Color del Fondo:"
},
{
    "en": "This is for choosing the input box colors in the newsletter form. If you choose to enter your own values, you'll be able to specify the colors you want for the background, text, and placeholder text.",
    "es": "Esto es para escoger el color de la caja de entrada en la forma del boletín. Si quieres escoger tus propios valores, necesitas especificar los colores que quieres en el texto de fondo y texto del marcador."
},
{
    "en": "This is for choosing the button colors in the newsletter form. If you choose to enter your own values, you'll be able to specify the colors you want for the text and background of the button, as well as what you'd like those to change to when the user hover's their mouse over the button.",
    "es": "Esto es para escoger el color de los botones en la forma del boletín. Si quieres escoger tus propios valores, necesitas especificar los colores que quieres en el texto y fondo del botón, y también lo que quieres que el botón cambie cuando el usuario flote el mouse sobre él."
},
{
    "en": "This is for choosing whether or not you want to have a menu bar at the top of your page for users to navigate your site.",
    "es": "Esto es para escoger si quieres o no una barra de menú en la parte de arriba de la página para que los usuarios naveguen tu sitio."
},
{
    "en": "This is for choosing whether or not you put the title of your page in the menu bar.",
    "es": "Esto es para escoger si quieres o no poner el título de tu página en la barra de menú."
},
{
    "en": "Menu Bar",
    "es": "La Barra de Menú."
},
{
    "en": "This is for choosing the font size of the title in your menu bar. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto del título en la barra del menú. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing whether or not you have your logo in the menu bar. If you check \"Yes\" for this item, you'll need to upload a logo.",
    "es": "Esto es para escoger si quieres o no tener un logo en la barra del menú. Si marcaste \"Si\" para este elemento, vas a necesitar subir un logo."
},
{
    "en": "This is for choosing which side of the menu bar you want the naviagation options to appear.",
    "es": "Esto es para escoger que lado de la barra del menú quieres que aparezcan las opciones de navegación."
},
{
    "en": "This is for choosing the font size of the options in your menu bar. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto de las opciones en la barra del menú. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font-case of the options in your menu bar. You could force all the text to be uppercase or lowercase, or you can just leave it as normal and let it be whatever you type into the page.",
    "es": "Esto es para escoger si quieres que las opciones en la barra del menú estén en mayúsculas o minúsculas, o dejarlo normal y que sea lo que escribas en la página."
},
{
    "en": "This is for choosing the background of the menu bar. If you choose to enter your own values, you'll be able to pick a color for when the page is scrolled to the top, for when the user has started scrolling, and for when the user hovers their mouse over an item.",
    "es": "Esto es para escoger el color del fondo de la barra de menú. Si quieres escoger tus propios valores, necesitas especificar los colores que quieres cuando la página sea desplazada hasta arriba, para cuando el usuario empiece a desplazarse, o cuando el usuario el mouse sobre un elemento."
},
{
    "en": "This is for choosing the color of the text in the menu bar. If you choose to enter your own values, you'll be able to pick a color for when the page is scrolled to the top, for when the user has started scrolling, and for when the user hovers their mouse over an item.",
    "es": "Esto es para escoger el color del texto de la barra de menú. Si quieres escoger tus propios valores, necesitas especificar los colores que quieres cuando la página sea desplazada hasta arriba, para cuando el usuario empiece a desplazarse, o cuando el usuario el mouse sobre un elemento."
},
{
    "en": "This is for choosing the background type of the main section at the top of the page. It can be a color, an images, or multiple images being cycled through.",
    "es": "Esto es para escoger el tipo de fondo de la sección principal que aparece en la parte de arriba de la página. Puede ser un color, una imagen, o varias imágenes que van cambiando."
},
{
    "en": "This is for choosing the number of background images you want to be cycled through in your main section at the top of the page.",
    "es": "Esto es para escoger el número de imágenes de fondo que vayan cambiando en la sección principal en la parte de arriba de la página."
},
{
    "en": "You can use this to provide a tint color on the images used in your background.",
    "es": "Puedes usar esto para escoger un color de tinte en las imágenes usadas en el fondo."
},
{
    "en": "This is where you choose the color you want for the main section at the top of your page.",
    "es": "Esto es donde puedes escoger el color que quieres en la sección principal en la parte de arriba de la página."
},
{
    "en": "This is for choosing which part of the main section you would like to place a big header for your page. We refer to this header as the title.",
    "es": "Esto es donde puedes escoger en que parte de la sección principal quieres poner un encabezado grande para tu página. A este encabezado le decimos el título."
},
{
    "en": "This is for choosing the font-case of the title in your main section. You could force all the text to be uppercase or lowercase, or you can just leave it as normal and let it be whatever you type into the page.",
    "es": "Esto es para escoger si quieres que el título en la sección principal estará en mayúsculas o minúsculas, o dejarlo normal y que sea lo que escribas en la página."
},
{
    "en": "This is for choosing the font-case of the subtitle in your main section. You could force all the text to be uppercase or lowercase, or you can just leave it as normal and let it be whatever you type into the page.",
    "es": "Esto es para escoger si quieres que el subtítulo de la sección principal esté en mayúsculas o minúsculas, o dejarlo normal y que sea lo que escribas en la página."
},
{
    "en": "This is for choosing the font size of the big header in your main section at the top of the page. We refer to this header as the title. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del encabezado de la sección principal en la parte de arriba de la página. A este encabezado le decimos el título. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size of the subtitle located beneath the big header in the main section at the top of your page. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del subtítulo ubicado abajo del encabezado de la sección principal en la parte de arriba de la página. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the big header in your main section at the top of the page. We refer to this header as the title.",
    "es": "Esto es para escoger el color del encabezado de la sección principal en la parte de arriba de la página. A este encabezado le decimos el título."
},
{
    "en": "This is for choosing the font color of the subtitle located beneath the big header in the main section at the top of your page.",
    "es": " Esto es para escoger el color del subtítulo debajo del encabezado de la sección principal en la parte de arriba de la página."
},
{
    "en": "This is an extra little design of some kind that Leia can add to your main section to make it stand out.",
    "es": "Este es un tipo de diseño extra que Leia puede añadir en la sección principal para que resalte más."
},
{
    "en": "This is for choosing the placement of the extra design that Leia adds to your main section.",
    "es": "Esto es para escoger la ubicación del diseño extra que Leia puede añadir en la sección principal."
},
{
    "en": "This is for choosing whether or not you want an \"About Us\" section in your page to describe what you do in a bit more detail.",
    "es": "Esto es para escoger si quieres o no que la sección \"Sobre Nosotros\" en tu página describa lo que hacen con más detalle."
},
{
    "en": "About Us",
    "es": "Sobre Nosotros"
},
{
    "en": "Image",
    "es": "Imagen"
},
{
    "en": "This is for choosing the type of background you want for your \"About Us\" section.",
    "es": "Esto es para escoger que tipo de fondo quieres para tu sección \"Sobre Nosotros\"."
},
{
    "en": "This dropdown is for choosing the width of the page you would like to be taken up by the \"About Us\" section.",
    "es": "Este menú es para escoger lo ancho de la página que quieres que ocupe la sección \"Sobre Nosotros\"."
},
{
    "en": "If you said that you did not want the \"About Us\" to take up the full width of the page in the dropdown above, this is for choosing which side of the page you want this section to align itself to.",
    "es": "Si dijiste que no quieres que la sección \"Sobre Nosotros\" ocupe el ancho completo de la página en el menú de atrás, esto es para escoger que lado de la página quieres que esta sección este alineada."
},
{
    "en": "This is for choosing the alignment of the title at the top of the \"About Us\" section.",
    "es": "Esto es para escoger la alineación del título arriba de la sección \"Sobre Nosotros\"."
},
{
    "en": "This is for choosing the font size of the title at the top of the \"About Us\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del título que va arriba de la sección \"Sobre Nosotros\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size of the subtitle at the top of the \"About Us\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del subtítulo que va arriba de la sección \"Sobre Nosotros\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the title at the top of the \"About Us\" section.",
    "es": "Esto es para escoger el color del título que va arriba de la sección \"Sobre Nosotros\"."
},
{
    "en": "This is for choosing the font color of the subtitle at the top of the \"About Us\" section.",
    "es": "Esto es para escoger el color del subtítulo que va arriba de la sección \"Sobre Nosotros\"."
},
{
    "en": "This is for choosing whether or not you want a little divider \"dash\" to separate the \"About Us\" title from the content beneath.",
    "es": "Esto es para escoger si quieres o no tener un pequeño divisor \"dash\" para dividir el título de \"Sobre Nosotros\" del contenido de abajo."
},
{
    "en": "This is for choosing the font size of the text in the paragraph of the \"About Us\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto en el párrafo de la sección \"Sobre Nosotros\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the color of the text in the paragraph of the \"About Us\" section.",
    "es": "Esto es para escoger el color del texto del párrafo de la sección \"Sobre Nosotros\"."
},
{
    "en": "This is for choosing whether or not you want to include an image in your \"About Us\" section.",
    "es": "Esto es para escoger si quieres o no incluir una imagen en la sección \"Sobre Nosotros\"."
},
{
    "en": "This is for choosing the position of the image in your \"About Us\" section.",
    "es": "Esto es para escoger la posición de la imagen en tu sección \"Sobre Nosotros\"."
},
{
    "en": "This is for choosing the width of your image in the \"About Us\" section.",
    "es": "Esto es para escoger el ancho de la imagen en tu sección \"Sobre Nosotros\"."
},
{
    "en": "This is for choosing whether or not you want a \"Features\" section in your page to highlight a few of your most outstanding characteristics.",
    "es": "Esto es para escoger si quieres o no tener una sección \"Funciones\" en tu página para resaltar algunas de tus características más excepcionales."
},
{
    "en": "This is for choosing the type of background you want for your \"Features\" section.",
    "es": "Esto es para escoger que tipo de fondo quieres para tu sección \"Funciones\"."
},
{
    "en": "This dropdown is for choosing the width of the page you would like to be taken up by the \"Features\" section.",
    "es": "Este menú es para escoger lo ancho de la página que quieres que ocupe la sección \"Funciones\"."
},
{
    "en": "If you said that you did not want the \"Features\" to take up the full width of the page in the dropdown above, this is for choosing which side of the page you want this section to align itself to.",
    "es": "Si dijiste que no quieres que la sección \"Funciones\" ocupe el ancho completo de la página en el menú de atrás, esto es para escoger que lado de la página quieres que esta sección este alineada."
},
{
    "en": "This is for choosing the alignment of the title at the top of the \"Features\" section.",
    "es": "Esto es para escoger la alineación del título arriba de la sección \"Funciones\"."
},
{
    "en": "This is for choosing the font size of the title at the top of the \"Features\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del título que va arriba de la sección \"Funciones\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size of the subtitle at the top of the \"Features\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del subtítulo que va arriba de la sección \"Funciones\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the title at the top of the \"Features\" section.",
    "es": "Esto es para escoger el color del título que va arriba de la sección \"Funciones\"."
},
{
    "en": "This is for choosing the font color of the subtitle at the top of the \"Features\" section.",
    "es": "Esto es para escoger el color del subtítulo que va arriba de la sección \"Funciones\"."
},
{
    "en": "This is for choosing whether or not you want a little divider \"dash\" to separate the \"Features\" title from the content beneath.",
    "es": "Esto es para escoger si quieres o no tener un pequeño divisor \"dash\" para dividir el título de \"Funciones\" del contenido de abajo."
},
{
    "en": "This is for choosing the number of different characteristics you want to describe about yourself in this section.",
    "es": "Esto es para escoger el número de las diferentes características que quieres describir sobre ti mismo en esta sección."
},
{
    "en": "This is for choosing whether or not you want to have an icon to go alongside each of your chracteristics.",
    "es": " Esto es para escoger si quieres o no tener un icono a un lado de cada una de las características."
},
{
    "en": "This is for choosing whether or not you want a little divider \"dash\" between the names of your characteristics and the descriptions of them.",
    "es": "Esto es para escoger si quieres o no tener un pequeño divisor \"dash\" entre los nombres de tus características y sus descripciones."
},
{
    "en": "This is for choosing the font size for the name of each of your characteristics. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del nombre de cada una de tus características. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size for the description of each of your characteristics. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto de la descripción de cada una de tus características. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color for the name of each of your characteristics.",
    "es": "Esto es para escoger el color del nombre de cada una de tus características."
},
{
    "en": "This is for choosing the font color for the description of each of your characteristics.",
    "es": " Esto es para escoger el color de las descripciones de cada una de tus características."
},
{
    "en": "This is for choosing whether or not you want an extra paragraph in your \"Features\" section to describe something a little more.",
    "es": "Esto es para escoger si quieres o no tener un párrafo extra en tu sección \"Features\" para que describa algo con más detalle."
},
{
    "en": "This is for choosing the location of the extra paragraph in your \"Features\" section.",
    "es": "Esto es para escoger la ubicación del párrafo extra en la sección \"Features\"."
},
{
    "en": "This is for choosing the font size of the text in your extra paragraph. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño de tu párrafo extra. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the text in your extra paragraph.",
    "es": "Esto es para escoger el color de tu párrafo extra."
},
{
    "en": "This is for choosing whether or not you want a \"Gallery\" section in your page to show the user a few images.",
    "es": "Esto es para escoger si quieres o no una sección \"Galería\" en tu página para mostrarle al usuario algunas imágenes."
},
{
    "en": "This is for choosing the type of background you want for your \"Gallery\" section.",
    "es": "Esto es para escoger que tipo de fondo quieres para tu sección \"Galería\"."
},
{
    "en": "This dropdown is for choosing the width of the page you would like to be taken up by the \"Gallery\" section.",
    "es": "Este menú es para escoger lo ancho de la página que quieres que ocupe la sección \"Galería\"."
},
{
    "en": "If you said that you did not want the \"Gallery\" to take up the full width of the page in the dropdown above, this is for choosing which side of the page you want this section to align itself to.",
    "es": "Si dijiste que no quieres que la sección \"Galería\" ocupe el ancho completo de la página en el menú de atrás, esto es para escoger que lado de la página quieres que esta sección este alineada."
},
{
    "en": "This is for choosing the alignment of the title at the top of the \"Gallery\" section.",
    "es": "Esto es para escoger la alineación del título arriba de la sección \"Galería\"."
},
{
    "en": "This is for choosing the font size of the title at the top of the \"Gallery\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del título que va arriba de la sección \"Galería\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size of the subtitle at the top of the \"Gallery\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del subtítulo que va arriba de la sección \"Galería\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the title at the top of the \"Gallery\" section.",
    "es": "Esto es para escoger el color del título que va arriba de la sección \"Galería\"."
},
{
    "en": "This is for choosing the font color of the subtitle at the top of the \"Gallery\" section.",
    "es": " Esto es para escoger el color del subtítulo que va arriba de la sección \"Galería\"."
},
{
    "en": "This is for choosing whether or not you want a little divider \"dash\" to separate the \"Gallery\" title from the content beneath.",
    "es": "Esto es para escoger si quieres o no tener un pequeño divisor \"dash\" para dividir el título de \"Galería\" del contenido de abajo."
},
{
    "en": "This is for choosing the number of images you want to have in your gallery.",
    "es": "Esto es para escoger el número de imágenes que quieres en tu galería."
},
{
    "en": "When the user hovers their mouse over an image, the title of it will display. This is for choosing the font color of that title.",
    "es": "Cuando un usuario flota su mouse sobre una imagen, el título de la imagen se mostrará. Esto es para escoger el color de ese título."
},
{
    "en": "When the user hovers their mouse over an image, the title of it will display. This is for choosing the background color of that title.",
    "es": "Cuando un usuario flota su mouse sobre una imagen, el título de la imagen se mostrará. Esto es para escoger el color de fondo de ese título."
},
{
    "en": "When the user clicks on an image, its description will display. This is for choosing the font color of that description.",
    "es": "Cuando un usuario hace click en una imagen, su descripción se mostrará. Esto es para escoger el color de esa descripción."
},
{
    "en": "When the user clicks on an image, its description will display. This is for choosing the background color of that description.",
    "es": "Cuando un usuario hace click en una imagen, su descripción se mostrará. Esto es para escoger el color de fondo de esa descripción."
},
{
    "en": "This is for choosing whether or not you want an extra paragraph in your \"Gallery\" section to describe something a little more.",
    "es": "Esto es para escoger si quieres o no tener un párrafo extra en tu sección \"Galería\" para que describa algo con más detalle."
},
{
    "en": "This is for choosing the location of the extra paragraph in your \"Gallery\" section.",
    "es": "Esto es para escoger la ubicación del párrafo extra en la sección \"Galería\"."
},
{
    "en": "This is for choosing whether or not you want a \"Testimonials\" section in your page to cycle through a few reviews by people who know you and can testify to what you do well.",
    "es": ""
},
{
    "en": "This is for choosing the type of background you want for your \"Testimonials\" section.",
    "es": "Esto es para escoger que tipo de fondo quieres para tu sección \"Testimonios\"."
},
{
    "en": "This dropdown is for choosing the width of the page you would like to be taken up by the \"Testimonials\" section.",
    "es": "Este menú es para escoger lo ancho de la página que quieres que ocupe la sección \"Testimonios\"."
},
{
    "en": "If you said that you did not want the \"Testimonials\" to take up the full width of the page in the dropdown above, this is for choosing which side of the page you want this section to align itself to.",
    "es": "Si dijiste que no quieres que la sección \"Testimonios\" ocupe el ancho completo de la página en el menú de atrás, esto es para escoger que lado de la página quieres que esta sección este alineada."
},
{
    "en": "This is for choosing the alignment of the title at the top of the \"Testimonials\" section.",
    "es": "Esto es para escoger la alineación del título arriba de la sección \"Testimonios\"."
},
{
    "en": "This is for choosing the font size of the title at the top of the \"Testimonials\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del título que va arriba de la sección \"Testimonios\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size of the subtitle at the top of the \"Testimonials\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del subtítulo que va arriba de la sección \"Testimonios\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the title at the top of the \"Testimonials\" section.",
    "es": "Esto es para escoger el color del título que va arriba de la sección \"Testimonios\"."
},
{
    "en": "This is for choosing the font color of the subtitle at the top of the \"Testimonials\" section.",
    "es": "Esto es para escoger el color del subtítulo que va arriba de la sección \"Testimonios\"."
},
{
    "en": "This is for choosing whether or not you want a little divider \"dash\" to separate the \"Testimonials\" title from the content beneath.",
    "es": "Esto es para escoger si quieres o no tener un pequeño divisor \"dash\" para dividir el título de \"Testimonios\" del contenido de abajo."
},
{
    "en": "This is for choosing the number of reviews you want to cycle through.",
    "es": "Esto es para escoger el número de reseñas que quieres mostrar."
},
{
    "en": "This is for choosing the amount of time you want to show each testimonial before cycling through to the next one.",
    "es": "Esto es para escoger cuanto tiempo mostrar cada testimonio antes de pasar al siguiente."
},
{
    "en": "This is for choosing the color of the text used in your testimonials.",
    "es": "Esto es para escoger el color del texto usado en los testimonios."
},
{
    "en": "This is for choosing the font size of the text used in your testimonials. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto usado en los testimonios. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the color of the text used for the name of the person who gave the testimonial.",
    "es": "Esto es para escoger el color del texto usado para el nombre de la persona que dio el testimonio."
},
{
    "en": "This is for choosing the font size of the text used for the name of the person who gave the testimonial. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto usado para el nombre de la persona que dio el testimonio. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing whether or not you want to include an image for the person who gave the testimonial.",
    "es": " Esto es para escoger si quieres o no incluir una imagen de la persona que dio el testimonio."
},
{
    "en": "This is for choosing whether the image of the person who gave the testimonial is displayed like a square or a circle.",
    "es": "Esto es para escoger si la imagen de la persona que dio el testimonio sería un cuadrado o un círculo."
},
{
    "en": "This is for choosing how much of the testimonial's width is taken up by the image.",
    "es": "Esto es para escoger el ancho que la imagen toma en el testimonio."
},
{
    "en": "This is for choosing whether or not you want an extra paragraph in your \"Testimonials\" section to describe something a little more.",
    "es": "Esto es para escoger si quieres o no tener un párrafo extra en tu sección \"Testimonios\" para que describa algo con más detalle."
},
{
    "en": "This is for choosing the location of the extra paragraph in your \"Testimonials\" section.",
    "es": "Esto es para escoger la ubicación del párrafo extra en la sección \"Testimonios\"."
},
{
    "en": "This is for choosing whether or not you want a \"Team\" section in your page to show a few members of your team, group, or organization.",
    "es": "Esto es para escoger si quieres o no tener una sección \"Equipo\" en tu página para mostrar algunos miembros de tu equipo, grupo, u organización."
},
{
    "en": "This is for choosing the type of background you want for your \"Team\" section.",
    "es": "Esto es para escoger que tipo de fondo quieres para tu sección \"Equipo\"."
},
{
    "en": "This dropdown is for choosing the width of the page you would like to be taken up by the \"Team\" section.",
    "es": "Este menú es para escoger lo ancho de la página que quieres que ocupe la sección \"Equipo\"."
},
{
    "en": "If you said that you did not want the \"Team\" to take up the full width of the page in the dropdown above, this is for choosing which side of the page you want this section to align itself to.",
    "es": "Si dijiste que no quieres que la sección \"Equipo\" ocupe el ancho completo de la página en el menú de atrás, esto es para escoger que lado de la página quieres que esta sección este alineada."
},
{
    "en": "This is for choosing the alignment of the title at the top of the \"Team\" section.",
    "es": "Esto es para escoger la alineación del título arriba de la sección \"Equipo\"."
},
{
    "en": "This is for choosing the font size of the title at the top of the \"Team\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del título que va arriba de la sección \"Equipo\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size of the subtitle at the top of the \"Team\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del subtítulo que va arriba de la sección \"Equipo\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the title at the top of the \"Team\" section.",
    "es": "Esto es para escoger el color del título que va arriba de la sección \"Equipo\"."
},
{
    "en": "This is for choosing the font color of the subtitle at the top of the \"Team\" section.",
    "es": "Esto es para escoger el color del subtítulo que va arriba de la sección \"Equipo\"."
},
{
    "en": "This is for choosing whether or not you want a little divider \"dash\" to separate the \"Team\" title from the content beneath.",
    "es": "Esto es para escoger si quieres o no tener un pequeño divisor \"dash\" para dividir el título de \"Equipo\" del contenido de abajo."
},
{
    "en": "This is for choosing the number of team members you want to show in this section.",
    "es": "Esto es para escoger el número de miembros del equipo que quieres mostrar en esta sección."
},
{
    "en": "This is for choosing the font size for the name of each of your team members. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto usado en el nombre de los miembros de tu equipo. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size for the description of each of your team members. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto usado en la descripción de los miembros te tu equipo. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color for the name of each of your team members.",
    "es": "Esto es para escoger el color del nombre de los miembros de tu equipo."
},
{
    "en": "This is for choosing the font color for the description of each of your team members.",
    "es": "Esto es para escoger el color de la descripción de los miembros de tu equipo."
},
{
    "en": "This is for choosing whether or not you want to show social media icons for each of your team members.",
    "es": "Esto es para escoger si quieres o no tener iconos de las redes sociales de los miembros de tu equipo."
},
{
    "en": "This is for choosing the number of social media icons your want to show for each of your team members.",
    "es": "Esto es para escoger el número de iconos de las redes sociales que quieres enseñar por cada uno de los miembros de tu equipo."
},
{
    "en": "This is for choosing whether or not you want an extra paragraph in your \"Team\" section to describe something a little more.",
    "es": "Esto es para escoger si quieres o no tener un párrafo extra en tu sección \"Equipo\" para que describa algo con más detalle."
},
{
    "en": "This is for choosing the location of the extra paragraph in your \"Team\" section.",
    "es": "Esto es para escoger la ubicación del párrafo extra en la sección \"Equipo\"."
},
{
    "en": "This is for choosing whether or not you want a \"Contact Us\" section in your page for users to get in touch with you.",
    "es": "Esto es para escoger si quieres o no tener una sección \"Contáctanos\" en tu página para que los usuarios se pongan en contacto contigo."
},
{
    "en": "This is for choosing the type of background you want for your \"Contact Us\" section.",
    "es": "Esto es para escoger que tipo de fondo quieres para tu sección \"Contáctanos\"."
},
{
    "en": "This dropdown is for choosing the width of the page you would like to be taken up by the \"Contact Us\" section.",
    "es": "Este menú es para escoger lo ancho de la página que quieres que ocupe la sección \"Contáctanos\"."
},
{
    "en": "This is for choosing the alignment of the title at the top of the \"Contact Us\" section.",
    "es": "Esto es para escoger la alineación del título arriba de la sección \"Contáctanos\"."
},
{
    "en": "This is for choosing the font size of the title at the top of the \"Contact Us\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del título que va arriba de la sección \"Contáctanos\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font size of the subtitle at the top of the \"Contact Us\" section. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del subtítulo que va arriba de la sección \"Contáctanos\". El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the title at the top of the \"Contact Us\" section.",
    "es": "Esto es para escoger el color del título que va arriba de la sección \"Contáctanos\"."
},
{
    "en": "This is for choosing the font color of the subtitle at the top of the \"Contact Us\" section.",
    "es": "Esto es para escoger el color del subtítulo que va arriba de la sección \"Contáctanos\"."
},
{
    "en": "This is for choosing whether or not you want a little divider \"dash\" to separate the \"Contact Us\" title from the content beneath.",
    "es": "Esto es para escoger si quieres o no tener un pequeño divisor \"dash\" para dividir el título de \"Contáctanos\" del contenido de abajo."
},
{
    "en": "This is for choosing whether or not your contact section has a form for users to send you a message.",
    "es": "Esto es para escoger si quieres o no que tu sección de contacto tenga una forma para que los usuarios te envíen un mensaje."
},
{
    "en": "This is for choosing the position of your contact form within the contact section.",
    "es": "Esto es para escoger la posición de la forma de contacto adentro de la sección de contacto."
},
{
    "en": "This is for choosing the types of input boxes you want to include for the user in your contact form.",
    "es": "Esto es para escoger el número de cajas de entrada que quieres incluir en tu forma de contacto."
},
{
    "en": "This is for choosing how much of the contact section's width is taken up by the contact form.",
    "es": "Esto es para escoger el ancho que la forma de contacto toma adentro de la sección de contacto."
},
{
    "en": "This is for choosing the background color of the contact form.",
    "es": "Esto es para escoger el color de fondo de tu forma de contacto."
},
{
    "en": "This is for choosing the color of the text in the contact form.",
    "es": "Esto es para escoger el color del texto en tu forma de contacto."
},
{
    "en": "This is for choosing the input box colors in the contact form. If you choose to enter your own values, you'll be able to specify the colors you want for the background, text, and placeholder text.",
    "es": "Esto es para escoger el color de la caja de entrada en la forma de contacto. Si quieres escoger tus propios valores, necesitas especificar los colores que quieres en el texto de fondo y texto del marcador."
},
{
    "en": "This is for choosing the button colors in the contact form. If you choose to enter your own values, you'll be able to specify the colors you want for the text and background of the button, as well as what you'd like those to change to when the user hover's their mouse over the button.",
    "es": "Esto es para escoger el color de los botones en la forma de contacto. Si quieres escoger tus propios valores, necesitas especificar los colores que quieres en el texto y fondo del botón, y también lo que quieres que el botón cambie cuando el usuario flote el mouse sobre él."
},
{
    "en": "This is for choosing whether or not you want a section of your contact form to display some contact information for you.",
    "es": "Esto es para escoger si quieres o no tener una sección de la forma de contacto que muestre información de contacto para ti."
},
{
    "en": "This is for choosing the font size of the text used to display your contact details. Font sizes are measured in pixels, and for your reference, this text is using a font size of ",
    "es": "Esto es para escoger el tamaño del texto usado para mostrar tu información de contacto. El tamaño del texto esta medido por pixeles, y para tu referencia, este texto está usando un tamaño de "
},
{
    "en": "This is for choosing the font color of the text used to display your contact details.",
    "es": "Esto es para escoger el color del texto usado en tu información de contacto."
},
{
    "en": "This is the part of the URL that will go after ",
    "es": "Esta es la parte del URL que irá después del "
},
{
    "en": "/ in the address bar. It can't contain any spaces or special characters.",
    "es": "/ en la barra de dirección. No puede tener espacios ni caracteres especiales."
},
{
    "en": "This is for chosing type type of section(s) you want in your new page. If you select a section that already exists on this page, Leia will copy its contents.",
    "es": "Esto es para escoger el tipo de la sección (o secciones) que quieres en tu página nueva. Si seleccionas una sección que ya existe en la página, Leia copiará sus contenidos."
},
{
    "en": "This is for choosing how many extra images you want in this new page. Leia will take this, along with the number of paragraphs below, and create some extra sections for you.",
    "es": "Esto es para escoger cuantas imágenes extra quieres que aparezcan en la página nueva. Leia tomará esto, con el número de párrafos abajo, y creará nuevas secciones para ti."
},
{
    "en": "This is for choosing how many extra paragraphs you want in this new page. Leia will take this, along with the number of images above, and create some extra sections for you.",
    "es": "Esto es para escoger el número de párrafos extra que quieres en la página nueva. Leia tomará esto, con el número de imágenes arriba, y creará nuevas secciones para ti."
},
{
    "en": "This is for choosing whether or not you want to add a link to this page in the menu bar of your site.",
    "es": "Esto es para escoger si quieres o no añadir un enlace a esta página en la barra de menú de tu sitio."
},
{
    "en": "Looks like your site is taking a little while to load. Want to try refreshing the page?",
    "es": "Parece que tu sitio se está tardando un poco para cargar. ¿Quieres refrescar la página?"
},
{
    "en": "Your New Page",
    "es": "Tu Nueva Página"
},
{
    "en": "Check out your new page! You can edit it in the same way as you can the main page.",
    "es": "¡Mira tu página nueva! Puedes editarla en la misma manera que la página principal."
},
{
    "en": "Got It",
    "es": "Lo Tengo"
},
{
    "en": "It appears that you have some unsaved changes. Would you like to save before exiting?",
    "es": "Parece que tienes unos cambios sin guardar. ¿Quieres guardar los cambios antes de salir?"
},
{
    "en": 'No, Exit',
    "es": "No, Salir"
},
{
    "en": "Edit Page Name",
    "es": "Editar Nombre de la Página"
},
{
    "en": "Use the text box below to change the name of your page. This is what comes after the ",
    "es": "Usa la caja de texto abajo para cambiar el nombre de la página. Esto viene después de "
},
{
    "en": 'You have successfully updated the directory name for this page.',
    "es": "Has actualizado exitosamente el nombre del directorio de esta página."
},
{
    "en": "It appears that you have some unsaved changes. Would you like to save before changing the URL? If you don't your changes will be lost.",
    "es": "Parece que tienes unos cambios sin guardar. ¿Quieres guardar los cambios antes de cambiar el URL? Si no, los cambios se perderán."
},
{
    "en": "Edit Page URL",
    "es": "Editar URL de la Página"
},
{
    "en": "Edit your post using the following items.",
    "es": "Edita tu publicación usando los siguientes elementos."
},
{
    "en": '</p><br>Separate Page: <input checked  style="margin-right: 20px;" onchange="document.getElementById(\'newPageNo\').checked = !this.checked;" type="checkbox" id="newPageYes"/> Pop Up: <input id="newPageNo" onchange="document.getElementById(\'newPageYes\').checked = !this.checked;" type="checkbox"/>',
    "es": '</p><br>Página Separada:: <input checked  style="margin-right: 20px;" onchange="document.getElementById(\'newPageNo\').checked = !this.checked;" type="checkbox" id="newPageYes"/> Pop Up: <input id="newPageNo" onchange="document.getElementById(\'newPageYes\').checked = !this.checked;" type="checkbox"/>'
},
{
    "en": "Save Changes?",
    "es": "¿Guardar Cambios?"
},
{
    "en": "Now that you've updated your post, would you like to save?",
    "es": "Ahora que has actualuzado tu publicación, ¿quieres guardar los cambios?"
},
{
    "en": 'Your changes have been saved, and your blog post type has been reset to a standard pop-up post.',
    "es": "Tus cambios han sido guardados y el tipo de blog ha sido reestablecido a la publicación estándar pop-up."
},
{
    "en": "There was an error updating your post. Please try again later.",
    "es": "Hubo un error actualizando tu publicación. Por favor intenta de nuevo más tarde."
},
{
    "en": "There was an error saving your post. Please try again later.",
    "es": "Hubo un error guardando tu publicación. Por favor intenta de nuevo más tarde."
},
{
    "en": "You can tap this button to see a complete redesign of your site, and you can use it as many times as you'd like until Leia gets it right.",
    "es": "Puedes presionar este botón para ver un rediseño completo de tu sitio, y puedes usarlo cuantas veces quieras hasta que Leia le atine."
},
{
    "en": "Don't forget to check out how your site looks on all devices. You can use this dropdown to view your website on a phone, tablet, or browser.",
    "es": "Que no se te olvide checar como se ve el sitio desde todos los dispositivos. Puedes usar este menú para ver tu sitio web desde un celular, tablet, o navegador."
},
{
    "en": "Browser",
    "es": "Navegador"
},
{
    "en": "Tablet",
    "es": "Tablet"
},
{
    "en": "Phone",
    "es": "Celular"
},
{
    "en": "Once you like the design of your site, follow the instructions here to edit the text to your liking.",
    "es": "Cuando te guste el diseño de tu sitio, sigue estas instrucciones para editar el texto a tu gusto."
},
{
    "en": "Note that these images are not all copyright free, so you'll need to upload a few of your own. To do so, follow these instructions.",
    "es": "Parece que algunas de estas imágenes no están libres del derecho de autor, así que vas a necesitar subir algunas imágenes tuyas. Para hacer eso, sigue estas instrucciones."
},
{
    "en": "Your website is divided into sections, and you'll see that each section has some arrows in its top left corner. You can use those arrows to shift the section up and down in your page.",
    "es": "Tu sitio web está dividido en secciones, y puedes ver que cada sección tiene unas flechas en la esquina de arriba a la izquierda. Puedes usar esas flechas para desplazar la sección arriba o debajo de la página."
},
{
    "en": "Please use this quick and easy form to submit some feedback! We're constantly working to improve upon the platform, so your input is very valuable to us.",
    "es": "¡Por favor usa esta forma rápida y fácil de usar para enviarnos algunas de tus opiniones! Estamos trabajando constantemente para mejorar la plataforma, así que tu opinión es muy valiosa para nosotros."
},
{
    "en": "Once you're done editing your site, you can tap this button to navigate to the Leia home page. From there, you can choose a new domain name, create a free account to store your website, and much more.",
    "es": "Cuando hayas acabado de editar tu sitio, puedes presionar este botón para navegar a la pagina de inicio de Leia. Desde ahí puedes escoger una extensión nueva, crear una cuenta gratuita para guardar tu sitio web, y mucho más."
},
{
    "en": "Lastly, you can tap this button to open your live website and view it in your browser, just like one of your visitors would.",
    "es": "Por último, puedes presionar este botón para abrir tu sitio web en vivo y verlo en tu navegador, como si fueras uno de sus visitantes."
},
{
    "en": "To see this walkthrough again at any time, just hit this button. Enjoy!",
    "es": "Para ver esta guía de nuevo en cualquier momento, solo presiona este botón. ¡Disfruta!"
},
{
    "en": 'Let\'s Begin!',
    "es": "¡Empecemos!"
},
{
    "en": 'To get started, tap on some text or on an image that you want to change. There are instructions in the toolbar that can help you make edits if you get stuck.',
    "es": "Para empezar, presiona en algún texto o en una imagen que quieras cambiar. Hay instrucciones en la caja de herramientas que te pueden ayudar si estás atorado."
},
{
    "en": 'NEXT',
    "es": "SIGUIENTE"
},
{
    "en": 'FINISH',
    "es": "TERMINAR"
},
{
    "en": 'BACK',
    "es": "ATRÁS"
},
{
    "en": 'Back',
    "es": "Atrás"
},
{
    "en": ' Chosen',
    "es": " Seleccionado"
},
{
    "en": 'My Projects',
    "es": "Mis Proyectos"
},
{
    "en": 'My Account',
    "es": "Mi Cuenta"
},
{
    "en": "I'm Listening...",
    "es": "Estoy Escuchando..."
},
{
    "en": 'Your browser does not support speech to text at this time. Try downloading the free mobile app instead!',
    "es": "Tu navegador no soporta la función de voz a texto en este momento. ¡Intenta descargar la aplicación móvil gratuita!"
},
{
    "en": 'There seems to be an issue with speech recognition at the moment. Please use the keyword box to describe your site.',
    "es": "Parece que hay u problema con el sistema de reconocimiento de voz en este momento. Por favor usa el teclado para describir tu sitio."
},
{
    "en": 'There seems to be an issue with speech recognition at the moment. Please try to find what you\'re looking for in the items in this section. You can tap on a question mark icon to get some info on what that property does.',
    "es": "Parece que hay un problema con el sistema de reconocimiento de voz en este momento. Por favor intenta encontrar lo que estás buscando en los elementos de esta sección. Puedes presionar el signo de interrogación para obtener información en lo que hace cada característica."
},
{
    "en": "Please press and hold down the icon below while you describe the website that you want.",
    "es": "Por favor presiona y deja presionado el icono debajo mientras describes el sitio que tú quieres."
},
{
    "en": "It appears that you have not checked the reCaptcha item in the form. Please ensure that you have done so, then try again.",
    "es": "Parece que no has marcado el elemento reCaptcha en la forma. Por favor asegúrate de hacerlo e intenta de nuevo."
},
{
    "en": 'WebAudio API has no support on this browser.',
    "es": "WebAudio API no está soportado en este navegador."
},
{
    "en": 'Your browser doesn\'t seem to support speech recognition. Please use the keyword box to describe your site.',
    "es": "Parece que tu navegador no soporta el sistema de reconocimiento de voz. Por favor usa el teclado para describir tu sitio."
},
{
    "en": 'Your browser doesn\'t seem to support speech recognition. Please try to find what you\'re looking for in the items in this section. You can tap on a question mark icon to get some info on what that property does.',
    "es": "Parece que tu navegador no soporta el sistema de reconocimiento de voz. Por favor usa el teclado para describir tu sitio. Por favor intenta encontrar lo que estás buscando en los elementos de esta sección. Puedes presionar el signo de interrogación para obtener información en lo que hace cada característica."
},
{
    "en": '../faq.txt',
    "es": "../faq.txt"
},
{
    "en": 'There was an error loading the FAQ section. Please refresh the page and try again.',
    "es": "Hubo un error cargando la sección de FAQ. Por favor refresca la página e intenta de nuevo."
},
{
    "en": "website",
    "es": "sitio web"
},
{
    "en": "site",
    "es": "sitio"
},
{
    "en": "Don't see an answer to your quesiton? Contact us!",
    "es": "¿No ves una respuesta a tu pregunta? ¡Contáctanos!"
},
{
    "en": "https://connect.facebook.net/en_US/sdk.js",
    "es": "https://connect.facebook.net/en_US/sdk.js"
},
{
    "en": "Step 2/2 Complete",
    "es": "Paso 2/2 Completo"
},
{
    "en": "You did it! Hopefully you like your site and want to keep it up forever. If at any point you'd like to take it down, simply delete it from this page with the touch of a button. Here are three quick slides on next steps:",
    "es": "¡Lo lograste! Ojalá te guste tu sitio y te lo quieras quedar para siempre. Si en algún punto quieres borrarlo, simplemente elimínalo de esta página presionando un botón. Aquí hay instrucciones con los siguientes tres pasos:"
},
{
    "en": "Your Account (1/3)",
    "es": "Tu Cuenta (1/3)"
},
{
    "en": "To protect your site, you'll want to attach it to an account. If you have already created one, then great! If not, you can make one for free by simply entering your name, email, and a password. You can also sign in using your Facebook or Google account with a simple tap.",
    "es": "Para proteger tu sitio, vas a querer vincularla a una cuenta. Si ya creaste una, ¡genial! Si no, podemos hacerte una cuenta gratuita simplemente escribiendo tu nombre, email, y una contraseña. También puedes usar una cuenta de Facebook o Google."
},
{
    "en": "Dashboard (2/3)",
    "es": "Tablero (2/3)"
},
{
    "en": "If you have a place for users to buy products or book services on your website, the Dashboard is a place for you to manage all of that stuff. You can access the Dashboard from this page once you sign in.",
    "es": "Si tienes un lugar en tu sitio web para que los usuarios compren productos o soliciten servicios, el Tablero es un lugar para manejar todo ese tipo de cosas. Puedes acceder el Tablero desde esta página cuando inicies sesión."
},
{
    "en": "Editing Your Site (3/3)",
    "es": "Editando tu Sitio (3/3)"
},
{
    "en": "Your site is currently hosted for free at a *.site.live domain, and it can remain that way forever. If, however, you want to add a custom domain name to your site (like a .com domain), you'll want to upgrade to Leia Pro, which includes a number of other awesome features that the free plan does not have. You can learn more by clicking the \"Upgrade Plan\" button next to your site.",
    "es": "Tu sitio está alojándose gratuitamente en una extensión *.site.live, y puede quedarse ahí para siempre. Pero, si quieres tener una extensión personalizada para tu sitio (como una extensión .com), vas a tener que actualizar a Leia Pro, que incluye un numero de funciones geniales que el plan gratuito no tiene. Puedes aprender más haciendo click en el botón \"Actualizar Plan\" a un lado de tu sitio."
},
{
    "en": "Custom CSS",
    "es": "CSS Personalizada"
},
{
    "en": "Custom JS",
    "es": "JS Personalizada"
},
{
    "en": 'In order to create Leia email accounts, you\'ll need to sign into your account with Leia.',
    "es": "Para crear cuentas de email Leia, necesitas iniciar sesión en Leia."
},
{
    "en": "Upgrade Required",
    "es": "Actualización Requerida"
},
{
    "en": "In order to sell products and book services through your site, you'll need to upgrade your website plan. This can be done for as little as $0.99 per month!",
    "es": "Para poder vender productos y solicitar servicios a través de tu sitio, necesitas actualizar tu plan. ¡Puedes hacer esto por tan solo $0.99 al mes!"
},
{
    "en": "View Plans",
    "es": "Ver Planes"
},
{
    "en": 'You must sign in to view the Dashboard.',
    "es": "Necesitas iniciar sesión para ver el Tablero"
},
{
    "en": "In order to view analytics, you'll need to upgrade your website plan to Leia Business. This can be done for as little as $3.99 per month!",
    "es": "Para poder ver la analítica, necesitas actualizar tu plan a Leia Business. ¡Puedes hacer esto por tan solo $3.99 al mes!"
},
{
    "en": 'There appears to be an issue. Please try again in a few minutes.',
    "es": "Parece que hubo un problema. Por favor intenta de nuevo en unos minutos."
},
{
    "en": 'You have successfully created an account to store your website! You may now close this window. Feel free to continue editing, but don\'t forget to save your changes from time to time.',
    "es": "¡Has creado exitosamente una cuenta para guardar tu sitio web! Ya puedes cerrar esta ventana. Puedes seguir editando, pero que no se te olvide guardar los cambios de vez en cuando."
},
{
    "en": "Rename Site",
    "es": "Renombrar Sitio"
},
{
    "en": 'Enter the new name for your site. This is just for your reference.',
    "es": "Escribe el nombre nuevo para tu sitio. Esto es solo para tu referencia."
},
{
    "en": "Site Name",
    "es": "Nombre del Sitio"
},
{
    "en": 'Your project name has been updated successfully.',
    "es": "El nombre del sitio ha sido actualizado exitosamente."
},
{
    "en": 'Your session has expired. Please sign in to make this change.',
    "es": "Tu sesión ha expirado. Por favor inicia sesión para hacer este cambio."
},
{
    "en": "Are you sure you want to delete this website? Note that this will also delete any upgrade you've made to the site. This action can't be undone.",
    "es": "¿Estás seguro de que quieres borrar este sitio web? Esto también borrara cualquier actualización que le hayas hecho al sitio. Esto no se puede revertir."
},
{
    "en": "Quick Feedback",
    "es": "Opinión Rápida"
},
{
    "en": 'To help us understand how to improve upon the platform for future users, please take a second to tell us the reason(s) why you are deleting this website:',
    "es": "Para ayudarnos a entender cómo mejorar nuestra plataforma para futuros usuarios, por favor tómate unos momentos para decirnos las razones por las que estás borrando el sitio web."
},
{
    "en": "Reason to delete...",
    "es": "Razón para borrar..."
},
{
    "en": "Submit & Delete",
    "es": "Enviar & Borrar"
},
{
    "en": "Feedback Required",
    "es": "Opinión Requerida"
},
{
    "en": "Please let us know why you are deleting the website.",
    "es": "Por favor díganos por qué estas borrando el sitio web."
},
{
    "en": "OK",
    "es": "OK"
},
{
    "en": "Would you like to change to a site.live domain (free), or link a custom domain name?",
    "es": "¿Te gustaría cambiar a una extensión site.live (gratuito), o vincular una extensión personalizada?"
},
{
    "en": "Site.Live",
    "es": "Site.Live"
},
{
    "en": "Custom",
    "es": "Personalizada"
},
{
    "en": "Change Domain",
    "es": "Cambiar Extensión"
},
{
    "en": 'You must sign in to choose a custom domain.',
    "es": "Necesitas iniciar sesión para escoger una extensión personalizada."
},
{
    "en": "Custom Domain",
    "es": "Extensión Personalizada"
},
{
    "en": "Do you already own a domain name that you would like to use?",
    "es": "¿Tienes ya una extensión que te gustaría usar?"
},
{
    "en": "No, Search For One",
    "es": "No, Buscar Una"
},
{
    "en": "Search for an image...",
    "es": "Buscar una imagen..."
},
{
    "en": "Yes, I Have One",
    "es": "Si, Tengo Una"
},
{
    "en": "Your Domain",
    "es": "Tu Extensión"
},
{
    "en": 'Enter the domain name that you want.',
    "es": "Escribe la extensión que quieres."
},
{
    "en": "domain.com",
    "es": "extensión.com"
},
{
    "en": 'That name is already being used by a website we are hosting. Please choose a different one.',
    "es": "Ese nombre ya está siendo usado para un sitio web que estamos alojando. Por favor escoge uno diferente."
},
{
    "en": 'That name is already taken. Please choose a different one.',
    "es": "Ese nombre ya está siendo usado. Escoge uno diferente."
},
{
    "en": 'That domain name is invalid. Please ensure that you\'ve entered it correctly.',
    "es": "La extensión es invalida. Por favor asegúrate de que la estas escribiendo correctamente."
},
{
    "en": "Available!",
    "es": "¡Disponible!"
},
{
    "en": "You can purchase your domain name \"",
    "es": "Puedes comprar tu extensión \""
},
{
    "en": "\" for ",
    "es": "\" por "
},
{
    "en": " per year. Would you like to buy it?",
    "es": " por año. ¿Te gustaría comprarla?"
},
{
    "en": "Purchase",
    "es": "Comprar"
},
{
    "en": "In order to use a custom domain, you'll need to upgrade your website plan.",
    "es": "Para poder usar una extensión personalizada, necesitas actualizar tu plan."
},
{
    "en": "Upgrade",
    "es": "Actualizar"
},
{
    "en": '<label for="cardNumber">CARD HOLDER</label>',
    "es": '<label for="cardNumber">TITULAR DE LA TARJETA</label>'
},
{
    "en": '<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">',
    "es": '<input type="text" class="form-control" name="cardName" id="cardName" placeholder="Nombre del Titular de la Tarjeta" autocomplete="cc-holder" required="">'
},
{
    "en": '<label for="cardNumber">CARD NUMBER</label>',
    "es": '<label for="cardNumber">NÚMERO DE LA TARJETA</label>'
},
{
    "en": '<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">',
    "es": '<input type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Numero Valido de la Tarjeta" autocomplete="cc-number" required="">'
},
{
    "en": '<label for="cardExpiry"><span class="hidden-xs">EXP.</span><span class="visible-xs-inline">EXP.</span> DATE</label>',
    "es": '<label for="cardExpiry"><span class="hidden-xs">EXP.</span><span class="visible-xs-inline">EXP.</span> FECHA</label>'
},
{
    "en": '<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">',
    "es": '<input type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / AA" autocomplete="cc-exp" required="">'
},
{
    "en": '<label for="cardCVC">CVC</label>',
    "es": '<label for="cardCVC">CVC</label>'
},
{
    "en": '<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">',
    "es": '<input type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">'
},
{
    "en": '<label for="cardCVC">ZIP CODE</label>',
    "es": '<label for="cardCVC">CÓDIGO POSTAL</label>'
},
{
    "en": '<input type="tel" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">',
    "es": '<input type="tel" class="form-control" name="cardZip" id="cardZip" placeholder="Código Postal" autocomplete="zipCode" required="">'
},
{
    "en": "Purchase Domain",
    "es": "Comprar Extensión"
},
{
    "en": "Enter your card info to purchase this domain name and add it to your website.",
    "es": "Escribe la información de la tarjeta para comprar esta extensión y añadirla a tu sitio web."
},
{
    "en": 'Make sure the expiration date on your card is entered in the form MM/YY.',
    "es": "Asegúrate de que la fecha de expiración de la tarjeta está en la forma MM/AA"
},
{
    "en": 'Please fill out all fields.',
    "es": "Por favor llena todos los campos"
},
{
    "en": 'Your domain name has been updated successfully! Please allow up to two hours for the change to update on the internet. If your domain is not working after two hours, please contact us.',
    "es": "¡Tu extensión ha sido actualizada exitosamente! Por favor deja que pasen como dos horas para que el cambio se vea reflejado en el internet. Si tu extensión aún no funciona después de dos horas, por favor contáctanos."
},
{
    "en": 'Verification',
    "es": "Verificación"
},
{
    "en": 'Also, please check your email, as we may need to send you a quick verification message to confirm your purchase.',
    "es": "Por favor checa tu email, puede que necesitemos mandarte un mensaje rápido de verificación para confirmar la compra."
},
{
    "en": 'Free Account',
    "es": "Cuenta Gratuita"
},
{
    "en": "Before we complete the upgrade, let's get you signed into an account to store the website. You can do this with one-tap sign-in via Google/Facebook, or by choosing a password.",
    "es": "Antes de que podamos completar la actualización, necesitamos que inicies sesión a tu cuenta para guardar el sitio web. Puedes hacer esto iniciando sesión vía Google/Facebook, o escogiendo una contraseña."
},
{
    "en": "Signing up for Leia Pro at the annual duration costs ~$4.99 per month, or $59.99 for the year. If you elect to go monthly, you'll be charged $6.99 per month. In either case, your first week is free, and you can cancel whenever. Which would you like to choose?",
    "es": "Registrarte a Leia Pro anualmente cuesta ~$4.99 al mes, o $59.99 al año. Si elijes el plan mensual, se te cobrará $6.99 al mes. En cualquier caso, tu primera semana es gratis, y puedes cancelar en cualquier momento. ¿Cuál quieres escoger?"
},
{
    "en": "Monthly ($6.99/mo)",
    "es": "Mensual ($6.99/mes) "
},
{
    "en": "Annually (~$4.99/mo)",
    "es": "Anual (~$4.99/mes)"
},
{
    "en": "Signing up for Leia Business at the annual duration costs ~$6.99 per month, or $83.99 for the year. If you elect to go monthly, you'll be charged $9.99 per month. In either case, your first week is free, and you can cancel whenever. Which would you like to choose?",
    "es": "Registrarte a Leia Pro anualmente cuesta ~$6.99 al mes, o $83.99 al año. Si elijes el plan mensual, se te cobrará $9.99 al mes. En cualquier caso, tu primera semana es gratis, y puedes cancelar en cualquier momento. ¿Cuál quieres escoger?"
},
{
    "en": "Monthly ($9.99/mo)",
    "es": "Mensual ($9.99/mes)"
},
{
    "en": "Annually (~$6.99/mo)",
    "es": "Anual (~$6.99/mes)"
},
{
    "en": "monthly",
    "es": "mensual"
},
{
    "en": "annually",
    "es": "anual"
},
{
    "en": "Choose Duration",
    "es": "Escoger Duración"
},
{
    "en": 'Choose Website',
    "es": "Escoger Sitio Web"
},
{
    "en": 'We\'re going to take you back to the projects page now. To upgrade a website, click on the "Upgrade" button next to it to come back here, then choose your plan!',
    "es": 'Vamos a regresarte a tu página de proyectos. Para actualizar un sitio web, has click en el botón "Actualizar" a su lado para traerte de vuelta, y ¡escoger un plan!'
},
{
    "en": 'Nothing To Do',
    "es": "Nada Para Hacer"
},
{
    "en": 'It appears that you have already upgraded to this plan with the selected duration.',
    "es": "Parece que ya has actualizado a este plan para la duración seleccionada."
},
{
    "en": 'You have already paid for a year of this plan, so you can change your billing to monthly once the year is up.',
    "es": "Ya pagaste por un año de este plan, así que puedes cambiar a mensualidad cuando se acabe el año."
},
{
    "en": "Upgrading to the \"Leia Pro\" plan at a monthly rate costs $0.99 per month. We will only charge you one month at a time, and you can cancel whenever.",
    "es": "Actualizar al plan mensual \"Leia Pro\" cuesta $0.99 al mes. Te cobraremos una vez al mes, y puedes cancelar en cualquier momento."
},
{
    "en": "LEIA PRO MONTHLY",
    "es": "LEIA PRO MENSUAL"
},
{
    "en": "Upgrading to the \"Leia Pro\" plan at an annual rate costs $9.99 for the year.",
    "es": "Actualizar al plan anual \"Leia Pro\" cuesta $9.99 al año."
},
{
    "en": "LEIA PRO ANNUALLY",
    "es": "LEIA PRO ANUAL"
},
{
    "en": "Since you have already signed up for one month of Leia Pro, we will charge you $9.00 now for the next 11 months, and your future charges will change to $9.99 per year.",
    "es": "Como ya estas registrado por un mes de Leia Pro, te cobraremos $9.00 ahora por los siguientes 11 meses, y futuros cobros cambiaran a $9.99 al año."
},
{
    "en": "LEIA PRO UPGRADE",
    "es": "ACTUALIZACION LEIA PRO"
},
{
    "en": "Upgrading to the \"Leia Business\" plan at a monthly rate costs $3.99 per month. We will only charge you one month at a time, and you can cancel whenever.",
    "es": "Actualizar al plan mensual \"Leia Business\" cuesta $3.99 al mes. Te cobraremos una vez al mes, y puedes cancelar en cualquier momento."
},
{
    "en": "LEIA BUSINESS MONTHLY",
    "es": "LEIA BUSINESS MENSUAL"
},
{
    "en": "Upgrading to the \"Leia Business\" plan at an annual rate costs $39.99 for the year.",
    "es": "Actualizar al plan anual \"Leia Business\" cuesta $39.99 al año."
},
{
    "en": "LEIA BUSINESS ANNUALLY",
    "es": "LEIA BUSINESS ANUAL"
},
{
    "en": "Since you have already signed up for one month of Leia Pro, we will charge you $3.00 now for the upgrade, and your future charges will change to $3.99 per month.",
    "es": "Como ya estas registrado por un mes de Leia Pro, te cobraremos $3.00 ahora por la actualización, y futuros cobros cambiaran a $3.99 al mes."
},
{
    "en": "LEIA BUSINESS UPGRADE",
    "es": "ACTUALIZACION LEIA BUSINESS"
},
{
    "en": "Since you have already signed up for one year of Leia Pro, we will charge you $30.00 now for the upgrade, and your future charges will change to $39.99 per year.",
    "es": "Como ya estas registrado por un año de Leia Pro, te cobraremos $30.00 ahora por la actualización, y futuros cobros cambiaran a $39.99 al año "
},
{
    "en": "Since you have already signed up for one month of Leia Pro, we will charge you $39.00 now for the upgrade, and your future charges will change to $39.99 per year.",
    "es": "Como ya estas registrado por un mes de Leia Pro, te cobraremos $39.00 ahora por la actualización, y futuros cobros cambiaran a $39.99 al año "
},
{
    "en": "Since you have already signed up for one month of Leia Business, we will charge you $36.00 now for the next 11 months, and your future charges will change to $39.99 per year.",
    "es": "Como ya estas registrado por un mes de Leia Business, te cobraremos $36.00 ahora por los siguientes 11 meses, y futuros cobros cambiaran a $39.99 al año "
},
{
    "en": "LEIA PRO DOWNGRADE",
    "es": "DESACTUALIZACION LEIA PRO"
},
{
    "en": '<input style="height: 42px" type="text" class="form-control" name="cardName" id="cardName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">',
    "es": '<input style="height: 42px" type="text" class="form-control" name="cardName" id="cardName" placeholder="Nombre del Titular de la Tarjeta" autocomplete="cc-holder" required="">'
},
{
    "en": '<input style="height: 42px" type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">',
    "es": '<input style="height: 42px" type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Numero Valido de la Tarjeta" autocomplete="cc-number" required="">'
},
{
    "en": '<input style="height: 42px" type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">',
    "es": '<input style="height: 42px" type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / AA" autocomplete="cc-exp" required="">'
},
{
    "en": '<input style="height: 42px" type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">',
    "es": '<input style="height: 42px" type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">'
},
{
    "en": '<input style="height: 42px" type="tel" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">',
    "es": '<input style="height: 42px" type="tel" class="form-control" name="cardZip" id="cardZip" placeholder="Código Postal" autocomplete="zipCode" required="">'
},
{
    "en": "Downgrade",
    "es": "Desactualizar"
},
{
    "en": "Based on what you've signed up for thus far, you will not be charged to make this downgrade.",
    "es": "Basado en lo que te has registrado, no te cobraremos por esta desactualización."
},
{
    "en": 'It appears that you have already upgraded to this plan.',
    "es": "Parece que ya te actualizaste a este plan."
},
{
    "en": 'Your platform has been downgraded successfully.',
    "es": "Tu plataforma ha sido desactualizada exitosamente."
},
{
    "en": '<label for="cardExpiry"><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>',
    "es": '<label for="cardExpiry"><span class="hidden-xs">EXPIRACION</span><span class="visible-xs-inline">EXP</span> FECHA</label>'
},
{
    "en": '<label for="cardCVC">CV CODE</label>',
    "es": '<label for="cardCVC">CÓDIGO CV</label>'
},
{
    "en": 'Please provide the best email we can use to reach you if we see any problems!',
    "es": "¡Por favor danos el mejor correo que podamos usar en caso de cualquier problema!"
},
{
    "en": 'Please enter a valid email address.',
    "es": "Por favor escribe un email valido."
},
{
    "en": "<option>Other</option></select>",
    "es": "<option>Otro</option></select>"
},
{
    "en": "Choose your preferred currency:",
    "es": "Escoge tu moneda preferida:"
},
{
    "en": "Choose Currency",
    "es": "Escoge Moneda"
},
{
    "en": 'There was an error submitting this upgrade. Please try again later.',
    "es": "Hubo un error enviando la actualización. Por favor intenta de nuevo más tarde."
},
{
    "en": 'Your platform has been upgraded successfully.',
    "es": "Tu plataforma ha sido actualizada exitosamente."
},
{
    "en": "Please ensure that the email you provided is correct, then try again.",
    "es": "Por favor asegúrate de que tu email está correcto, e intenta de nuevo."
},
{
    "en": 'Your platform has been upgraded successfully. Please allow up to two hours for the domain name change to appear on the internet. If your domain is not working after two hours, please contact us.',
    "es": "Tu plataforma ha sido actualizada exitosamente. Por favor deja que pasen unas dos horas para que el cambio en la extensión se vea reflejada en el internet. Si tu extensión aun no funciona después de dos horas, contáctanos."
},
{
    "en": "Next Steps",
    "es": "Siguientes Pasos"
},
{
    "en": "You have successfully updated your account and your domain name. In order to make your site appear at the new name, you'll need to point it toward our servers. We can either send you instructions on how to do that, or you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99.",
    "es": "Has actualizado exitosamente tu cuenta y tu extensión. Para que tu sitio aparezca con el nombre nuevo, necesitas dirigirlo a nuestros servidores. Podemos enviarte instrucciones con pasos para hacer eso, o puedes contratar a uno de nuestros representantes técnicos para que inicie sesión en tu registrador de extensión y lo haga por ti. Puedes hacer esto por una tarifa de servicio única de $19.99." 
},
{
    "en": "Send Instructions",
    "es": "Enviar Instrucciones"
},
{
    "en": "Hire Representative",
    "es": "Contratar Representante"
},
{
    "en": "You have successfully upgraded your account and updated your domain name. In order for your site to show up at this new name, you'll need to point it toward our servers. We just sent you instructions on how to do that.",
    "es": "Has actualizado exitosamente tu cuenta y tu extensión. Para que tu sitio aparezca con el nombre nuevo, necesitas dirigirlo a nuestros servidores. Acabamos de enviarte instrucciones con pasos para hacer eso."
},
{
    "en": "Personal Assistance",
    "es": "Asistencia Personal"
},
{
    "en": "If you want to follow the instructions on your own, then great! But if you think you need some help, you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99.",
    "es": "Si quieres seguir las instrucciones por tu cuenta, ¡genial! Pero si necesitas ayuda, puedes contratar a uno de nuestros representantes técnicos para que inicie sesión en tu registrador de extensión y lo haga por ti. Puedes hacer esto por una tarifa de servicio única de $19.99."
},
{
    "en": "Now that you've upgraded your site, you can add a custom domain name to it. Want to search for one?",
    "es": "Ya que actualizaste tu sitio, puedes añadir una extension personalizada. ¿Quieres buscar uno?"
},
{
    "en": 'Enter the domain that you own.',
    "es": "Escribe la extensión que ya tienes."
},
{
    "en": "The domain name \"",
    "es": "La extensión \""
},
{
    "en": "\" doesn\'t appear to have an owner. Would you like to register it?",
    "es": "\" parece que no tiene dueño. ¿Quieres registrarlo a tu nombre?"
},
{
    "en": "Search Again",
    "es": "Buscar de Nuevo"
},
{
    "en": "Register Domain",
    "es": "Registrar Extensión"
},
{
    "en": "In order to use a custom domain, you'll need to upgrade your website plan. This can be done for as little as $0.99 per month!",
    "es": "Para poder usar una extension personalizada, necesitas actualizar tu plan. ¡Puedes hacer esto por tan solo $0.99 al mes!"
},
{
    "en": "You have successfully updated your domain name. In order to make your site appear at the new name, you'll need to point it toward our servers. We can either send you instructions on how to do that, or you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99.",
    "es": "Has actualizado exitosamente tu extensión. Para que tu sitio aparezca con el nombre nuevo, necesitas dirigirlo a nuestros servidores. Podemos enviarte instrucciones con pasos para hacer eso, o puedes contratar a uno de nuestros representantes técnicos para que inicie sesión en tu registrador de extensión y lo haga por ti. Puedes hacer esto por una tarifa de servicio única de $19.99."
},
{
    "en": "You have successfully updated your your domain name. In order for your site to show up at this new name, you'll need to point it toward our servers. We just sent you instructions on how to do that.",
    "es": "Has actualizado exitosamente tu extensión. Para que tu sitio aparezca con el nombre nuevo, necesitas dirigirlo a nuestros servidores. Acabamos de enviarte instrucciones con pasos para hacer eso."
},
{
    "en": "SSL Encryption",
    "es": "Cifrado SSL"
},
{
    "en": "SSL is a way to encrypt traffic to your site to ensure that it is secure. All site.live subdomains are automatically encrypted this way, but individual SSL certificates are required for custom domain names. We sell SSL certificates for $9.99 annually, and will install them on your website for free.",
    "es": "SSL es una manera de cifrar el tráfico a tu sitio y asegurar que sea seguro. Todos las subextensiones site.live están automáticamente cifradas, pero certificados individuales SSL son requeridas para extensiones personalizadas. Nosotros vendemos certificados SSL a $9.99 anuales, y los instalaremos en tu sitio web gratuitamente."
},
{
    "en": "Purchase SSL",
    "es": "Comprar SSL"
},
{
    "en": "Card Info",
    "es": "Información de la Tarjeta"
},
{
    "en": "Please enter the card that you would like to use for the first years's payment of $9.99.",
    "es": "Por favor escribe la tarjeta que te gustaría usar para el pago de $9.99 del primer año."
},
{
    "en": 'Your SSL Certificate has been created! Please allow 48 hours for one of our technical representatives to install it on your website. We will be in touch as soon as that is completed.',
    "es": "¡Tu Certificado SSL ha sido creado! En 48 horas lo instalará uno de nuestros representantes técnicos en tu sitio web. Te contactaremos tan pronto completemos la instalación."
},
{
    "en": 'Your session has expired. Please sign in to make this request.',
    "es": "Tu sesión ha expirado. Por favor inicia sesión para hacer esta solicitud."
},
{
    "en": "Domain Service",
    "es": "Servicio de Extensión"
},
{
    "en": "When you connect a domain name purchased outside of the Leia app, you need to log into your account with the registrar who you bought the domain name from and point it toward the Leia servers. If you think you need some help, you can hire one of our technical representatives to log into your account with your domain registrar and do it for you. This can be done for a one-time service fee of $19.99.",
    "es": "Cuando conectas una extensión comprada afuera de la aplicación Leia, necesitas iniciar sesión desde el registrador de donde compraste la extensión y dirigirlo a nuestros servidores. Si necesitas ayuda para hacer eso, puedes contratar a uno de nuestros representantes técnicos para que inicie sesión en tu registrador de extensión y lo haga por ti. Puedes hacer esto por una tarifa de servicio única de $19.99."
},
{
    "en": "Your Registrar",
    "es": "Tu Registrador"
},
{
    "en": 'Please enter the name of the company who you bought your domain name from.',
    "es": "Por favor escribe el nombre de la compañía de donde compraste tu extensión."
},
{
    "en": "Your registrar...",
    "es": "Tu registrador..."
},
{
    "en": "servicesInput",
    "es": "servicesInput"
},
{
    "en": "Your Username",
    "es": "Tu Usuario"
},
{
    "en": 'Please enter the username/email we can use to log into your registrar to make the changes.',
    "es": "Por favor escribe el usuario/email que podemos usar para iniciar sesión en el registrador para hacer los cambios."
},
{
    "en": "Your Password",
    "es": "Tu Contraseña"
},
{
    "en": 'Please enter the password we can use to log into your registrar to make the changes.',
    "es": "Por favor escribe la contraseña que podemos usar para iniciar sesión en el registrador para hacer los cambios."
},
{
    "en": "Please enter the card that you would like to use for this payment of $19.99.",
    "es": "Por favor escribe la tarjeta que te gustaría usar para el pago de $19.99."
},
{
    "en": 'Your request has been submitted! Once of our technical representatives will attend to this matter and follow up in the next 48 hours.',
    "es": "¡Tu solicitud ha sido enviara! Uno de nuestros representantes técnicos atenderá este asunto y te contactará en las siguientes 48 horas."
},
{
    "en": "View Instructions",
    "es": "Ver Instrucciones"
},
{
    "en": 'Enter the email that we should send the instructions to.',
    "es": "Escribe el email al que deberíamos de enviar las instrucciones."
},
{
    "en": 'We have sent you an email with instructions on how to point your domain toward our servers.',
    "es": "Te acabamos de mandar un email con instrucciones sobre como dirigir tu extensión hacia nuestros servidores."
},
{
    "en": 'The email you provided appears to be invalid. Please try entering it again.',
    "es": "El email que escribiste parece ser invalido. Por favor intenta escribirlo de nuevo."
},
{
    "en": 'Enter the new site.live domain for your site.',
    "es": "Escribe la nueva extension site.live para tu sitio."
},
{
    "en": "domain.site.live",
    "es": "extension.site.live"
},
{
    "en": 'Please enter a domain in the form of "domain.site.live".',
    "es": 'Por favor escribe una extensión en la forma "extension.site.live".'
},
{
    "en": 'Your domain name has been updated successfully.',
    "es": "Tu extensión ha sido actualizada exitosamente."
},
{
    "en": 'That name has already been taken. Please try a different one.',
    "es": "Ese nombre ya está siendo usado. Escoge uno diferente."
},
{
    "en": "This plan offers you all of the same features as the other one, but with the addition of Brainalytics. Brainalytics is the process by which our AI engine constantly makes small tweaks to your site based upon how your visitors are interacting with it. Through Brainalytics, you can rest assured that your site is always up-to-date and looking it's best.",
    "es": "Este plan ofrece todas las mismas funciones que el otro, pero con Brainalytics añadido. Brainalytics es un proceso en el cual nuestro motor AI constantemente hace pequeños cambios a tu sitio basado en como los usuarios interactúan con él. A través de Brainalytics, puedes sentirte seguro de que tu sitio siempre esta actualizado y viéndose como nunca."
},
{
    "en": "This plan enables you to use a custom domain name, and it also provides you with preferred access to our human developers if you ever want to hire a real person to edit your site. Additionally, you'll be provided with unlimited bandwidth to ensure that your site is always operating - no matter how much traffic you get. Lastly, if you're a developer, it allows you to add custom HTML, CSS, and Javascript to your site.",
    "es": "Este plan permite que uses una extensión personalizada, y también provee con acceso preferido a nuestros desarrolladores humanos por si quieres contratar una persona de verdad para editar tu sitio. Adicionalmente, te proveeremos con banda ancha ilimitada para asegurar que tu sitio siempre esté operando - no importa cuánto tráfico tengas. Por último, si eres un desarrollador, te permite que añadas código personalizado HTML, CSS, y Javascript a tu sitio."
},
{
    "en": 'You must sign in to request a developer.',
    "es": "Necesitas iniciar sesión para solicitar un desarrollador."
},
{
    "en": "Request a Human",
    "es": "Solicitar un Humano"
},
{
    "en": 'If you have a question about something, please describe your needs below. We will get back to you as soon as possible with next steps!',
    "es": "Si tienes preguntas sobre lo que sea, por favor describe lo que necesitas abajo. ¡Te contactaremos lo antes posible!"
},
{
    "en": "Describe the type of help you require...",
    "es": "Describe el tipo de ayuda que necesitas..."
},
{
    "en": 'Your request has been submitted successfully. Our team is still pretty small, but we promise to get back to you as soon as possible.',
    "es": "Tu solicitud ha sido enviada exitosamente. Nuestro equipo aún es muy pequeño, pero te prometemos que te contactaremos lo antes posible."
},
{
    "en": "Would you like to cancel this renewal or change the card on file? This payment currently uses a card ending in ",
    "es": "¿Te gustaría cancelar esta renovación o cambiar la tarjeta? Este pago usa la tarjeta que termina en "
},
{
    "en": "N/A",
    "es": "N/A"
},
{
    "en": "Edit Payment",
    "es": "Editar Pago"
},
{
    "en": "Would you like to cancel this renewal? Your website will remain upgraded until the end of the period that has already been paid for.",
    "es": "¿Te gustaría cancelar esta renovación? Tu sitio web seguirá actualizada hasta el final del periodo que ya está pago."
},
{
    "en": "Cancel Renewal",
    "es": "Cancelar Renovación"
},
{
    "en": "Change Card",
    "es": "Cambiar Tarjeta"
},
{
    "en": "Would you like to have this product autorenew on the expiration date or change the card on file? This payment currently uses a card ending in ",
    "es": "¿Te gustaría que este producto se auto renueve en la fecha de expiración o cambiar la tarjeta? Este pago usa la tarjeta que termina en "
},
{
    "en": "Would you like to have this product autorenew on the expiration date?",
    "es": "¿Te gustaría que este producto se auto renueve en la fecha de expiración?"
},
{
    "en": "Add Autorenew",
    "es": "Añadir Autorrenovación"
},
{
    "en": "Please enter the card that you would like to use for future payments on this product.",
    "es": "Por favor escribe la tarjeta que te gustaría usar para pagos futuros a este producto."
},
{
    "en": 'To help us understand how to improve upon the platform for future users, please take a second to tell us the reason(s) why you are canceling this renewal:',
    "es": "Para ayudarnos a entender cómo mejorar nuestra plataforma para futuros usuarios, por favor tómate unos momentos para decirnos las razones por las que estás cancelando esta renovación:"
},
{
    "en": "Reason to cancel...",
    "es": "Razón para cancelar..."
},
{
    "en": "Submit & Cancel",
    "es": "Enviar & Cancelar"
},
{
    "en": "Please let us know why you are canceling the renewal.",
    "es": "Por favor díganos por que estas cancelando esta renovación."
},
{
    "en": 'This product will NOT automatically renew on it\'s expiration date.',
    "es": "Este producto NO se renovará automáticamente en su fecha de expiración."
},
{
    "en": 'This product will now automatically renew on it\'s expiration date.',
    "es": "Este producto se renovará automáticamente en su fecha de expiración."
},
{
    "en": 'The payment method for this product has been updated.',
    "es": "El método de pago para este producto ha sido actualizado."
},
{
    "en": 'Please enter the new name for your account.',
    "es": "Por favor escribe el nuevo nombre para tu cuenta."
},
{
    "en": 'Please enter the new email for your account.',
    "es": "Por favor escribe el nuevo email para tu cuenta."
},
{
    "en": "Update Info",
    "es": "Actualizar Información"
},
{
    "en": "Update Text",
    "es": "Actualizar Texto"
},
{
    "en": 'Please use the link in the email we just sent you to confirm your new email address',
    "es": "Por favor usa el vínculo en el email que te mandamos para confirmar tu nueva dirección de email."
},
{
    "en": 'Your account information has been updated.',
    "es": "La información de tu cuenta ha sido actualizada."
},
{
    "en": "Reset Password",
    "es": "Reestablecer Contraseña"
},
{
    "en": 'Enter your email, and we\'ll send you a link to reset your password.',
    "es": "Escribe tu email, y te mandaremos un vínculo para reestablecer tu contraseña."
},
{
    "en": 'We have just sent you an email with a link to reset your password.',
    "es": "Te acabamos de mandar un email con un vínculo para reestablecer tu contraseña."
},
{
    "en": 'Please provide your full name or the name of your company.',
    "es": "Por favor escribe el nombre completo de tu compañía."
},
{
    "en": 'The email address you have provided is invalid. Please ensure you have entered it correctly.',
    "es": "El email que escribiste no es válido. Por favor asegúrate de que este escrito correctamente."
},
{
    "en": 'Please be a bit more descriptive about the website you need.',
    "es": "Por favor se más descriptivo sobre el sitio web que necesitas."
},
{
    "en": 'You have indicated that you have an existing website but have not provided a link to it.',
    "es": "Has indicado que tienes un sitio web existente, pero no has dado un vínculo a él."
},
{
    "en": 'Please be a bit more descriptive about the functionality needed for the user accounts.',
    "es": "Por favor se más descriptivo sobre las funcionalidades necesarias para las cuentas de usuario."
},
{
    "en": 'Your request has been submitted successfully! A member of our team will be in touch shortly with a game plan to begin working on your site.',
    "es": "¡Tu solicitud ha sido enviada exitosamente! Un miembro de nuestro equipo se pondrá en contacto contigo con un plan para empezar a construir tu sitio."
},
{
    "en": 'Just built my website using the Leia A.I. website builder! Check it out at ',
    "es": "¡Acabo de construir mi sitio web con Leia A.I.! Checalo en "
},
{
    "en": " (Flexible)",
    "es": " (Flexible)"
},
{
    "en": 'This item has already been added to the cart. You can change the quantity using the dropdown in the order summary.',
    "es": "Este artículo ya está añadido en el carrito. Puedes cambiar las cantidades usando el menú en el resumen de la orden."
},
{
    "en": ' unit(s) of this item have been added to your cart!',
    "es": " unidad(es) de este artículo ha(n) sido añadidas al carrito!"
},
{
    "en": 'Sorry, this product seems to be sold out.',
    "es": "Una disculpa, este producto se ha agotado."
},
{
    "en": ' Item(s) (',
    "es": " Artículo (s) ("
},
{
    "en": '<div class="row"><div class="col-sm-12"><div class="input-group"><label>Select quantity:</label><select class="quantitySelect">',
    "es": '<div class="row"><div class="col-sm-12"><div class="input-group"><label>Elegir cantidad:</label><select class="quantitySelect">'
},
{
    "en": '</select></div></div></div><div class="row"><div class="col-sm-12"><div class="input-group"><label>Enter the ammount you would like to pay:</label><input onchange="updatePrice()" type="number" class="quantityInput quoteInput"/></div></div></div>',
    "es": '</select></div></div></div><div class="row"><div class="col-sm-12"><div class="input-group"><label>Escribe el monto que quieres pagar:</label><input onchange="updatePrice()" type="number" class="quantityInput quoteInput"/></div></div></div>'
},
{
    "en": '<div class="row"><div class="col-sm-12"><div class="input-group"><label>Select quantity:</label><select onchange="updateRowPrice(this)" class="quantitySelect quoteInput">',
    "es": '<div class="row"><div class="col-sm-12"><div class="input-group"><label>Elegir cantidad:</label><select onchange="updateRowPrice(this)" class="quantitySelect quoteInput">'
},
{
    "en": "\")'><option disabled>Choose size</option>",
    "es": "\")'><option disabled>Escoge el tamaño</option>"
},
{
    "en": '<div class="row"><div class="col-sm-12"><div class="input-group"><label>Add a tip:</label><input class="tipInput quoteInput" onkeyup="updatePrice(this)" type="number"/></div></div></div>',
    "es": '<div class="row"><div class="col-sm-12"><div class="input-group"><label>Añade una propina:</label><input class="tipInput quoteInput" onkeyup="updatePrice(this)" type="number"/></div></div></div>'
},
{
    "en": '<div class="row"><div class="col-sm-12"><div class="input-group"><div class="deliveryOption"><select class="shippingOptions quoteInput" onchange="updatePrice()"><option selected disabled>Select shipping type</option>',
    "es": '<div class="row"><div class="col-sm-12"><div class="input-group"><div class="deliveryOption"><select class="shippingOptions quoteInput" onchange="updatePrice()"><option selected disabled>Seleccione el tipo de envío</option>'
},
{
    "en": "Day",
    "es": "Día"
},
{
    "en": " Day",
    "es": "Día"
},
{
    "en": "Week",
    "es": "Semana"
},
{
    "en": " Week",
    "es": "Semana"
},
{
    "en": "Same",
    "es": "Mismo"
},
{
    "en": " Shipping + (",
    "es": " Envío + ("
},
{
    "en": "<div class='row'><div class='col-sm-12'><div class='input-group'><div class='deliveryOption'><label>Pick it up at:</label><br>",
    "es": "<div class='row'><div class='col-sm-12'><div class='input-group'><div class='deliveryOption'><label>Recógelo en:</label><br>"
},
{
    "en": '<div class="row"><div class="col-sm-12"><div class="input-group"><select class="deliveryOptions quoteInput" onchange="updateDeliveryType(this)"><option selected disabled>Select delivery type</option>',
    "es": '<div class="row"><div class="col-sm-12"><div class="input-group"><select class="deliveryOptions quoteInput" onchange="updateDeliveryType(this)"><option selected disabled>Selecciona tipo de envío</option>'
},
{
    "en": 'Pick It Up',
    "es": "Recógelo"
},
{
    "en": 'Ship It',
    "es": "Envíalo"
},
{
    "en": 'Hand Deliver It',
    "es": "Entrégalo Personalmente"
},
{
    "en": 'Email It',
    "es": "Envía un Email"
},
{
    "en": ';" class="paymentOptions quoteInput"><option selected disabled>Select payment type</option>',
    "es": ';" class="paymentOptions quoteInput"><option selected disabled>Selecciona tipo de pago</option>'
},
{
    "en": 'Pay Upon Pick Up',
    "es": "Pagar al Recoger"
},
{
    "en": 'Pay Upon Delivery',
    "es": "Pagar al Enviar"
},
{
    "en": 'Pay Now',
    "es": "Pagar Ahora"
},
{
    "en": " Shipping (",
    "es": " Envío ("
},
{
    "en": "<div class='deliveryOption'><span>Pick it up at:</span><br>",
    "es": "<div class='deliveryOption'><span>Recógelo en:</span><br>"
},
{
    "en": 'Sorry, it doesn\'t look like you\'ve added any items to your cart.',
    "es": "Lo siento, parece que no has añadido nada al carrito."
},
{
    "en": "Your purchase was successful! You should recieve a receipt to your email shortly.",
    "es": "¡Su compra fue exitosa! Deberías de recibir un recibo en tu email en unos momentos."
},
{
    "en": "There was an error. Please try again later.",
    "es": "Hubo un error. Por favor intenta de nuevo más tarde."
},
{
    "en": 'Price: ',
    "es": "Precio: "
},
{
    "en": 'Shipping: ',
    "es": "Envío: "
},
{
    "en": 'Total: ',
    "es": "Total: "
},
{
    "en": ' available',
    "es": " disponible"
},
{
    "en": 'per item',
    "es": "por artículo"
},
{
    "en": 'Add Product',
    "es": "Añadir Producto"
},
{
    "en": 'Create Product',
    "es": "Crear Producto"
},
{
    "en": 'Add Service',
    "es": "Añadir Servicio"
},
{
    "en": 'Create Service',
    "es": "Crear Servicio"
},
{
    "en": 'Price',
    "es": "Precio"
},
{
    "en": "Product Created!",
    "es": "¡Producto Creado!"
},
{
    "en": "Uh Oh!",
    "es": "¡Oh No!"
},
{
    "en": 'There appears to be an issue. Please contact us.',
    "es": "Parece que hubo un problema. Por favor contáctanos."
},
{
    "en": 'There appears to be an issue. Please try again in a few minutes.',
    "es": "Parece que hubo un problema. Por favor intenta de nuevo en unos minutos."
},
{
    "en": '1 Week',
    "es": "1 Semana"
},
{
    "en": '2 Weeks',
    "es": "2 Semanas"
},
{
    "en": '3 Weeks',
    "es": "3 Semanas"
},
{
    "en": '1 Month',
    "es": "1 Mes"
},
{
    "en": '2 Months',
    "es": "2 Meses"
},
{
    "en": 'Edit Service',
    "es": "Editar Servicio"
},
{
    "en": 'Save Service',
    "es": "Guardar Servicio"
},
{
    "en": "You have chosen a day to offer this service with an earlier or equal end time relative to the start time.",
    "es": "Has escogido un día para ofrecer este servicio en un tiempo de fin igual o anterior relativo al tiempo de comienzo"
},
{
    "en": "Service Saved",
    "es": "Servicio Guardado"
},
{
    "en": 'Edit Product',
    "es": "Editar Producto"
},
{
    "en": 'Save Product',
    "es": "Guardar Producto"
},
{
    "en": "Remove File",
    "es": "Remover Archivo"
},
{
    "en": "Are you sure you want to remove this file?",
    "es": "¿Estás seguro de que quieres remover este archivo?"
},
{
    "en": 'Cancel',
    "es": "Cancelar"
},
{
    "en": "Product Saved!",
    "es": "¡Producto Guardado!"
},
{
    "en": "Delete Product",
    "es": "Borrar Producto"
},
{
    "en": "Are you sure you want to delete this product? This action can't be undone.",
    "es": "¿Estás seguro de que quieres borrar este producto? Esto no se puede revertir."
},
{
    "en": "Product Deleted",
    "es": "Producto Borrado"
},
{
    "en": "Duplicate Product",
    "es": "Duplicar Producto"
},
{
    "en": "Are you sure you want to duplicate this product?",
    "es": "¿Estás seguro de que quieres duplicar este producto?"
},
{
    "en": "Product Duplicated",
    "es": "Producto Duplicado"
},
{
    "en": "Delete Service",
    "es": "Borrar Servicio"
},
{
    "en": "Are you sure you want to delete this service? This action can't be undone.",
    "es": "¿Estás seguro de que quieres borrar este servicio? Esto no se puede revertir."
},
{
    "en": "Service Deleted",
    "es": "Servicio Borrado"
},
{
    "en": "Duplicate Service",
    "es": "Duplicar Servicio"
},
{
    "en": "Are you sure you want to duplicate this service?",
    "es": "¿Estás seguro de que quieres duplicar este servicio?"
},
{
    "en": "Service Duplicated",
    "es": "Servicio Duplicado"
},
{
    "en": "Settings Saved",
    "es": "Configuración Guardada"
},
{
    "en": "Service Created",
    "es": "Servicio Creado"
},
{
    "en": 'Enter your message...',
    "es": "Escribe tu mensaje..."
},
{
    "en": 'Attachments can\'t exceed 25MB in size.',
    "es": "Archivos adjuntos no pueden exceder más de 25MB en tamaño."
},
{
    "en": "You're In!",
    "es": "¡Entraste!"
},
{
    "en": "Welcome to Leia Mail! You can now use this portal to send and receive email from your new address. If you have an iOS device, you can also download the Leia Mail app for free from the App Store.",
    "es": "¡Bienvenido a Leia Mail! Puedes usar este portal para mandar y recibir emails desde tu nueva dirección de correo. Si tienes un dispositivo iOS, también puedes descargar la aplicación gratuita de Leia Mail desde el App Store."
},
{
    "en": "(No Subject)",
    "es": "(No Sujeto)"
},
{
    "en": '(No Recipients)',
    "es": "(No Recipientes)"
},
{
    "en": ', and ',
    "es": ", y "
},
{
    "en": ' more',
    "es": " más"
},
{
    "en": "Remove Attachment",
    "es": "Remover Archivo Adjunto"
},
{
    "en": "Are you sure you want to remove this attachment?",
    "es": "¿Estás seguro de que quieres remover el archivo adjunto este producto?"
},
{
    "en": "Yes, Remove It",
    "es": "Si, Remover"
},
{
    "en": "Remove Image",
    "es": "Remover Imagen"
},
{
    "en": "Are you sure?",
    "es": "¿Seguro?"
},
{
    "en": "Are you sure you want to delete this email? This action can't be undone.",
    "es": "¿Estás seguro de que quieres borrar este email? Esto no se puede revertir."
},
{
    "en": "Yes, Delete It",
    "es": "Si, Borrar"
},
{
    "en": "Change Address",
    "es": "Cambiar Dirección"
},
{
    "en": 'This is the part of your email address before the @ symbol.',
    "es": "Esta es la parte de tu dirección de email que va antes del símbolo @."
},
{
    "en": "Change",
    "es": "Cambiar"
},
{
    "en": 'Address Changed',
    "es": "Direccion Cambiada"
},
{
    "en": 'There appears to be an issue. Please try again in a few minutes.',
    "es": "Parece que hubo un problema. Por favor intenta de nuevo en unos minutos."
},
{
    "en": "Change Name",
    "es": "Cambiar Nombre"
},
{
    "en": 'This is the name that we attach to your outbound emails for your recipients to see.',
    "es": "Este es el nombre que está vinculado a tus emails salientes para que tus recipientes lo vean."
},
{
    "en": 'Name Changed',
    "es": "Nombre Cambiado"
},
{
    "en": "Change Password",
    "es": "Cambiar Contraseña"
},
{
    "en": 'Enter your current password, then choose a new one:',
    "es": "Escribe tu contraseña actual, y después escoge uno nuevo."
},
{
    "en": 'Password Changed',
    "es": "Contraseña Cambiada"
},
{
    "en": 'Current Password',
    "es": "Contraseña Actual"
},
{
    "en": '<input style="margin-top: 12px;" type="password" class="form-control" tabindex="4" placeholder="New Password" id="newPassword">',
    "es": '<input style="margin-top: 12px;" type="password" class="form-control" tabindex="4" placeholder="Contraseña Nueva" id="newPassword">'
},
{
    "en": "To: ",
    "es": "Para: "
},
{
    "en": "<span class='emailHeaderText'>CC: ",
    "es": "<span class='emailHeaderText'>CC: "
},
{
    "en": "<span class='emailHeaderText'>BCC: ",
    "es": "<span class='emailHeaderText'>BCC: "
},
{
    "en": "<span class='emailHeaderText'>From: ",
    "es": "<span class='emailHeaderText'>De: "
},
{
    "en": "<span class='emailHeaderText'>Date: ",
    "es": "<span class='emailHeaderText'>Fecha: "
},
{
    "en": "<button title='Reply All' onclick='startReply(\"",
    "es": "<button title='Responder a Todos' onclick='startReply(\""
},
{
    "en": "<button title='Reply Sender' onclick='startReply(\"",
    "es": "<button title='Responder al Remitente' onclick='startReply(\""
},
{
    "en": "<button title='Forward' onclick='startForward(\"",
    "es": "<button title='Remitir' onclick='startForward(\""
},
{
    "en": "<button title='Mark as Unread' onclick='markUnread(\"",
    "es": "<button title='Marcar como No Leído' onclick='markUnread(\""
},
{
    "en": "<button title='Delete eMail' onclick='deleteEmail(\"",
    "es": "<button title='Borrar eMail' onclick='deleteEmail(\""
},
{
    "en": "Fwd: ",
    "es": "Fwd: "
},
{
    "en": "Re: ",
    "es": "Re: "
},
{
    "en": "Re:",
    "es": "Re:"
},
{
    "en": "<span>Begin Forwarded Message</span><br>",
    "es": "<span>Empezar Mensaje Remitido</span><br>"
},
{
    "en": "<span>CC: ",
    "es": "<span>CC: "
},
{
    "en": "<span>BCC: ",
    "es": "<span>BCC: "
},
{
    "en": "<span>From: ",
    "es": "<span>De: "
},
{
    "en": "<span>Date: ",
    "es": "<span>Fecha: "
},
{
    "en": "Jan",
    "es": "Ene"
},
{
    "en": "Feb",
    "es": "Feb"
},
{
    "en": "Mar",
    "es": "Mar"
},
{
    "en": "Apr",
    "es": "Abr"
},
{
    "en": "May",
    "es": "May"
},
{
    "en": "Jun",
    "es": "Jun"
},
{
    "en": "Jul",
    "es": "Jul"
},
{
    "en": "Aug",
    "es": "Ago"
},
{
    "en": "Sept",
    "es": "Sept"
},
{
    "en": "Oct",
    "es": "Oct"
},
{
    "en": "Nov",
    "es": "Nov"
},
{
    "en": "Dec",
    "es": "Dic"
},
{
    "en": "Today at ",
    "es": "Hoy a las "
},
{
    "en": "Yesterday at ",
    "es": "Ayer a las "
},
{
    "en": " at ",
    "es": " a las "
},
{
    "en": "Are you sure you want to deactivate this account? This action can't be undone.",
    "es": "¿Estás seguro de que quieres desactivar esta cuenta? Esto no se puede revertir."
},
{
    "en": 'There appears to be an issue. Please contact us.',
    "es": " Parece que hubo un problema. Por favor contáctanos."
},
{
    "en": "Your Registrar",
    "es": "Tu Registrador"
},
{
    "en": 'Please enter the name of the company who you bought your domain name from.',
    "es": "Por favor escribe el nombre de la compañía de donde compraste tu extensión."
},
{
    "en": "Your Username",
    "es": "Tu Usuario"
},
{
    "en": 'Please enter the username/email we can use to log into your registrar to make the changes.',
    "es": "Por favor escribe el usuario/email que podemos usar para iniciar sesión en el registrador para hacer los cambios."
},
{
    "en": "Your Password",
    "es": "Tu Contraseña"
},
{
    "en": 'Please enter the password we can use to log into your registrar to make the changes.',
    "es": "Por favor escribe la contraseña que podemos usar para iniciar sesión en el registrador para hacer los cambios."
},
{
    "en": 'Your Password...',
    "es": "Tu Contraseña..."
},
{
    "en": 'Your Username...',
    "es": "Tu Usuario..."
},
{
    "en": 'Your Registrar...',
    "es": "Tu Registrador..."
},
{
    "en": '<label for="cardNumber">CARD HOLDER</label>',
    "es": '<label for="cardNumber">TITULAR DE LA TARJETA</label>'
},
{
    "en": '<input type="text" class="form-control" name="cardHolderName" id="cardHolderName" placeholder="Card Holder Name" autocomplete="cc-holder" required="">',
    "es": '<input type="text" class="form-control" name="cardHolderName" id="cardHolderName" placeholder="Nombre del Titular de la Tarjeta" autocomplete="cc-holder" required="">'
},
{
    "en": '<label for="cardNumber">CARD NUMBER</label>',
    "es": '<label for="cardNumber">NÚMERO DE LA TARJETA</label>'
},
{
    "en": '<input tabindex="9" type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Valid Card Number" autocomplete="cc-number" required="">',
    "es": '<input tabindex="9" type="tel" class="form-control" name="cardNumber" id="cardNumber" placeholder="Número Valido de la Tarjeta" autocomplete="cc-number" required="">'
},
{
    "en": '<label for="cardExpiry"><span class="hidden-xs">EXPIRATION</span><span class="visible-xs-inline">EXP</span> DATE</label>',
    "es": '<label for="cardExpiry"><span class="hidden-xs">EXPIRACIÓN</span><span class="visible-xs-inline">EXP</span> FECHA</label>'
},
{
    "en": '<input tabindex="10" type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / YY" autocomplete="cc-exp" required="">',
    "es": '<input tabindex="10" type="text" class="form-control" name="cardExpiry" id="expDate" placeholder="MM / AA" autocomplete="cc-exp" required="">'
},
{
    "en": '<label for="cardCVC">CV CODE</label>',
    "es": '<label for="cardCVC">CÓDIGO CV</label>'
},
{
    "en": '<input tabindex="11" type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">',
    "es": '<input tabindex="11" type="tel" class="form-control" name="cardCVC" id="cvc" placeholder="CVC" autocomplete="cc-csc" required="">'
},
{
    "en": '<label for="cardCVC">ZIP CODE</label>',
    "es": '<label for="cardCVC">CÓDIGO POSTAL</label>'
},
{
    "en": '<input type="tel" class="form-control" name="cardZip" id="cardZip" placeholder="Zip Code" autocomplete="zipCode" required="">',
    "es": '<input type="tel" class="form-control" name="cardZip" id="cardZip" placeholder="Código Postal" autocomplete="zipCode" required="">'
},
{
    "en": "Change Card",
    "es": "Cambiar Tarjeta"
},
{
    "en": 'Please enter the card that you would like to use for this payment of $19.99.',
    "es": "Por favor escribe la tarjeta que te gustaría usar para el pago de $19.99."
},
{
    "en": "Submit",
    "es": "Enviar"
},
{
    "en": 'Please enter the expiration date in the form of MM/YY.',
    "es": "Por favor escribe la fecha de expiración de la tarjeta está en la forma MM/AA "
},
{
    "en": "OK",
    "es": "OK"
},
{
    "en": 'Please follw out all fields.',
    "es": "Por favor llena todos los campos."
},
{
    "en": "Your Email",
    "es": "Tu Email"
},
{
    "en": 'Please provide the best email we can use to reach you if we see any problems!',
    "es": "¡Por favor danos el mejor correo que podamos usar en caso de cualquier problema!"
},
{
    "en": 'Your email...',
    "es": "Tu email..."
},
{
    "en": 'Please enter a valid email address.',
    "es": "Por favor escribe un email valido."
},
{
    "en": 'Your request has been submitted! Once of our technical representatives will attend to this matter and follow up in the next 48 hours.',
    "es": "¡Tu solicitud ha sido enviara! Uno de nuestros representantes técnicos atenderá este asunto y te contactará en las siguientes 48 horas."
},
{
    "en": 'Your session has expired. Please sign in to make this request.',
    "es": "Tu sesión ha expirado. Por favor inicia sesión para hacer la solicitud."
},
{
    "en": 'You haven\'t specified any recipients for this message.',
    "es": "No hay un recipiente para este mensaje."
},
{
    "en": 'Drafts are always marked as read.',
    "es": "Los borradores siempre están marcados como leídos."
},
{
    "en": 'You haven\'t selected any emails to mark as read.',
    "es": "No has seleccionado un email para marcar como leído."
},
{
    "en": 'You haven\'t selected any emails to mark as unread.',
    "es": "No has seleccionado un email para marcar como no leído."
},
{
    "en": 'You haven\'t selected any emails to delete.',
    "es": "No has seleccionado un email para borrar."
},
{
    "en": 'You haven\'t selected any drafts to delete.',
    "es": "No has seleccionado un borrador para borrar."
},
{
    "en": "Are you sure you want to delete the selected emails? This action can't be undone.",
    "es": "¿Estás seguro de que quieres borrar los emails seleccionados? Esto no se puede revertir."
},
{
    "en": "Yes, Delete Selected",
    "es": "Si, Borrar Seleccionados"
}];
