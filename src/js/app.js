/*======= MENU SHOW Y HIDDEN =======*/
const navMenu = document.querySelector('#nav-menu');
const navToggle = document.querySelector('#nav-toggle');
const navClose = document.querySelector('#nav-close');



/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    })
}



/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    })
}



/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.querySelector('#nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))



/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.querySelectorAll('.skills__content');
const skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (let i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close'
    }

    if(itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
})



/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents =document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('qualification__active');
        })

        target.classList.add('qualification__active');

        tabs.forEach(tab => {
            tab.classList.remove('qualification__active');
        })
        tab.classList.add('qualification__active');
    })
})



/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal');
const modalBtns = document.querySelectorAll('.services__button');
const modalCloses = document.querySelectorAll('.services__modal-close');
const body = document.querySelector('body');

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal');
    body.classList.add('overflow-hidden');
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i);
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal');
            body.classList.remove('overflow-hidden');
        })
    })
})



/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
});



/*==================== TESTIMONIAL SWIPER ====================*/
let swiperTestimonial = new Swiper(".testimonial__container", {
    cssMode: true,
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        }
    }

});



/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)



/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)



/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)



/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})



/*==================== FORM TO WHATSAPP ====================*/
function sendToWhatsapp() {
    let number = "+526143840053"

    let name = document.querySelector('#name').value;
    let email = document.querySelector('#email').value;
    let project = document.querySelector('#project').value;
    let message = document.querySelector('#message').value;

    let url = `https://wa.me/${number}?text=
    Name : ${name}%0a
    Email : ${email}%0a
    Project: ${project}%0a
    Message : ${message}%0a%0a`;
    
    window.open(url, '_blank').focus();
}



/*==================== FORM VALIDATION ====================*/
document.addEventListener('DOMContentLoaded', function() {
    const email = {
        name: '',
        email: '',
        project: '',
        message: '' 
    }

    //select interface items 
    const inputName = document.querySelector('#name');
    const inputEmail = document.querySelector('#email');
    const inputProject = document.querySelector('#project');
    const inputMessage = document.querySelector('#message');
    const form = document.querySelector('#form');
    const btnSubmit = document.querySelector('#form button[type="submit"]');

    //Assign events
    inputName.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputProject.addEventListener('input', validar);
    inputMessage.addEventListener('input', validar);

    form.addEventListener('submit', enviarEmail);


    //Functions
    function enviarEmail(e) {
        e.preventDefault();

        setTimeout(() => {

            resetFormulario();

            //Crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('succed');

            alertaExito.textContent = 'Mensaje enviado correctamente'

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);
        }, 2000)
    }
    
    function validar(e) {
        if(e.target.value.trim() === '') {
            mostrarAlerta(`The ${e.target.id} field is required.`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        } 

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('Invalid email.', e.target.parentElement)
            email[e.target.name] = '';
            comprobarEmail();
            return;
        };


        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        //Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) { //*listo

        limpiarAlerta(referencia);

        //Generar 'alerta' en HTML 
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('contact__alert');

        //Inyectar 'error' a formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia){ //*listo
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.contact__alert');
        if(alerta) {
            alerta.remove();
        }
    }

    function comprobarEmail() { //*listo
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50')
            btnSubmit.disabled = true;
            return;
        } 
        
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false;
    }

    function resetFormulario() { //*listo
        //reiciar el objeto
        email.name = '';
        email.email = '';
        email.project = '';
        email.message = '';
        
        form.reset();
        comprobarEmail();
    }

    function validarEmail(email) {
        //'expresion regular' para email en JS
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email)
        return resultado;
    }
});



/*==================== CAMBIAR IDIOMA ====================*/
const flagsElement = document.querySelector('#flags');
const textsToChange = document.querySelectorAll('[data-section]');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email');
const inputMessage = document.querySelector('#message');

// Función para cambiar el idioma y guardar la preferencia en localStorage
const setLanguage = (language) => {
    flagsElement.setAttribute('data-language', language);
    localStorage.setItem('selectedLanguage', language);
    changeLanguages(language);
    
    inputName.placeholder = language === 'esp' ? 'Tu nombre' : 'Your name';
    inputEmail.placeholder = language === 'esp' ? 'Tu correo electrónico' : 'Your email';
    inputMessage.placeholder = language === 'esp' ? 'La descripción de tu proyecto' : 'Your project description';
};

// Escuchar el cambio de checkbox y actualizar idioma
flagsElement.addEventListener('change', (e) => {
    let language = e.target.checked ? 'esp' : 'eng';
    setLanguage(language);
});

// Cargar el idioma guardado al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    let savedLanguage = localStorage.getItem('selectedLanguage') || 'eng'; // Idioma predeterminado: inglés
    flagsElement.checked = savedLanguage === 'esp';
    setLanguage(savedLanguage);
});

// Toma el JSON y modifica el idioma
const changeLanguages = async (language) => {
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();

    for (const textToChange of textsToChange) {
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
};
