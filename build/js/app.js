const navMenu=document.querySelector("#nav-menu"),navToggle=document.querySelector("#nav-toggle"),navClose=document.querySelector("#nav-close");navToggle&&navToggle.addEventListener("click",(()=>{navMenu.classList.add("show-menu")})),navClose&&navClose.addEventListener("click",(()=>{navMenu.classList.remove("show-menu")}));const navLink=document.querySelectorAll(".nav__link");function linkAction(){document.querySelector("#nav-menu").classList.remove("show-menu")}navLink.forEach((e=>e.addEventListener("click",linkAction)));