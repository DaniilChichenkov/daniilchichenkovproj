'use strict'

document.addEventListener('DOMContentLoaded', function() {
    //Burger menu open and close
    const burgerMenuOpenButton = document.querySelector('[data-burger-open]'),
          burgerMenuCloseButton = document.querySelector('[data-burger-close]'),
          burgerMenu = document.querySelector('.burger-menu');

    burgerMenuOpenButton.addEventListener('click', () => {
        //Animation
        burgerMenuCloseButton.classList.remove('burger-menu_close-button_animation');

        burgerMenuOpenButton.classList.add('burger-menu_open-button_animation');
        burgerMenu.classList.remove('burger-menu_close');
        burgerMenu.classList.add('burger-menu_open');

        //Prevent page from scroll
        document.documentElement.style.overflow = 'hidden';
    });

    burgerMenuCloseButton.addEventListener('click', (e) => {
        //Animation
        burgerMenuOpenButton.classList.remove('burger-menu_open-button_animation');

        e.target.classList.add('burger-menu_close-button_animation');
        burgerMenu.classList.remove('burger-menu_open');
        burgerMenu.classList.add('burger-menu_close')

        //Enable page to scroll
        document.documentElement.style.overflow = 'scroll';
    });
});