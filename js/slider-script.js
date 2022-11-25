'use strict';

document.addEventListener('DOMContentLoaded', () => {
    //Slides
    const sliderContainer = document.querySelector('.past_content-container_slider_inner-container'),
          sliderSlides = document.querySelectorAll('.past_content-container_slider_inner-container_slide');

    //Grades
    const sliderGradeContainer = document.querySelectorAll('.past_content-container_slider_inner-container_slide_content_grade'),
          sliderGrades = document.querySelectorAll('.slide-grade');

    //Buttons
    const sliderButtonForward = document.querySelector('[data-slider-forward]'),
          sliderButtonBackward = document.querySelector('[data-slider-backward]'),
          sliderButtons = document.querySelectorAll('.past_content-container_slider_buttons-container_button');

    let slidePath = sliderSlides[0].offsetWidth;

    let sliderCurrentPosition = 0,
        currentSlide = 0,
        nextSlide = 0,
        sliderNextPosition = 0;

    //Slide forward
    sliderButtonForward.addEventListener('click', activeSlideForward);

    function activeSlideForward() {
        nextSlide++;

        if (nextSlide > sliderSlides.length - 1) {
            console.log('No more slides left');
            nextSlide--;
        } 
        else {
            //Remove ability to switch slides while animation is on
            sliderButtonForward.removeEventListener('click', activeSlideForward);
            sliderButtonBackward.removeEventListener('click', activeSlideBackward);

            sliderButtonForward.classList.add('slider_button-click');

            //Animation of current slide close
            if (window.innerWidth < 768) {
                sliderSlides[currentSlide].classList.add('current-slide_close');
            }

            currentSlide++;

            //Animation of next slide open
            if (window.innerWidth < 768) {
                sliderSlides[currentSlide].classList.add('next-slide_open');
            };

            sliderNextPosition = sliderNextPosition + slidePath;

            let timerId = setTimeout( function move() {
                if (sliderCurrentPosition < sliderNextPosition) {
                    sliderCurrentPosition += 3;
                    sliderContainer.style.right = sliderCurrentPosition + 'px';
                    timerId = setTimeout( move, 3);
                }
                else {
                    clearInterval(timerId);

                    //Return ability to switch slides
                    sliderButtonForward.addEventListener('click', activeSlideForward);
                    sliderButtonBackward.addEventListener('click', activeSlideBackward);

                    sliderButtonForward.classList.remove('slider_button-click');

                    //Remove animation classes after animation end
                    sliderSlides.forEach( item => {
                        item.classList.remove('current-slide_close');
                        item.classList.remove('next-slide_open');
                    });
                }
            }, 3);
        }
    };

    //Slide backward
    sliderButtonBackward.addEventListener('click', activeSlideBackward);

    function activeSlideBackward() {
        nextSlide--;

        if (nextSlide < 0) {
            nextSlide++;
            console.log('No more slides left');

        }
        else {
            //Remove ability to switch slides while animation is on
            sliderButtonForward.removeEventListener('click', activeSlideForward);
            sliderButtonBackward.removeEventListener('click', activeSlideBackward);

            sliderButtonBackward.classList.add('slider_button-click');

            //Animation of current slide close
            if (window.innerWidth < 768) {
                sliderSlides[currentSlide].classList.add('current-slide_close');
            };

            currentSlide--;

            //Animation of next slide open
            if (window.innerWidth < 768) {
                sliderSlides[currentSlide].classList.add('next-slide_open');
            };

            sliderNextPosition = sliderNextPosition - slidePath;

            let timerId = setTimeout( function move() {
                if (sliderNextPosition < sliderCurrentPosition) {
                    sliderCurrentPosition -= 3;
                    sliderContainer.style.right = sliderCurrentPosition + 'px';
                    timerId = setTimeout( move, 3);
                }
                else {
                    clearInterval(timerId);

                    //Return ability to switch slides
                    sliderButtonForward.addEventListener('click', activeSlideForward);
                    sliderButtonBackward.addEventListener('click', activeSlideBackward);

                    sliderButtonBackward.classList.remove('slider_button-click');

                    //Remove animation classes after animation end
                    sliderSlides.forEach( item => {
                        item.classList.remove('current-slide_close');
                        item.classList.remove('next-slide_open');
                    });
                }
            }, 3);
        }
    };

    //Grade
    sliderGrades.forEach( item => {
        item.addEventListener('click', () => {
            //Marking parent container as active
            item.parentElement.classList.add('active-container');
            item.classList.add('active-grade');

            //Searching for index of active container
            let activeContainerIndex;

            sliderGradeContainer.forEach( (item, i) => {
                if (item.classList.contains('active-container')) {
                    activeContainerIndex = i;
                    item.classList.remove('active-container');
                };
            });

            //Searching for index of active grade
            let allElementsFromActiveContainer = [],
                activeGradeIndex;

            sliderGradeContainer[activeContainerIndex].childNodes.forEach( item => {
                if (item.nodeName !== '#text' && item.nodeName !== '#comment') {
                    allElementsFromActiveContainer.push(item);
                };
            });

            allElementsFromActiveContainer.forEach( (item, i) => {
                if (item.classList.contains('active-grade')) {
                    activeGradeIndex = i;
                    item.classList.remove('active-grade');
                };
            });

            //If element was not graded before
            if (!sliderGradeContainer[activeContainerIndex].classList.contains('graded')) {
                //Change grade
                for (let i = 0; i <= activeGradeIndex; i++) {
                    allElementsFromActiveContainer[i].src = './images/slider-images/marked.png';
                    allElementsFromActiveContainer[i].classList.add('marked');
                };

                //Marked container as 'graded'
                sliderGradeContainer[activeContainerIndex].classList.add('graded');
            }
            //If it already was graded
            else {
                //Check if new grade higher or lower than previous one
                let previousGradeIndex = 0;

                allElementsFromActiveContainer.forEach( item => {
                    if (item.classList.contains('marked')) {
                        previousGradeIndex++;
                    };
                });

                previousGradeIndex--;

                console.log(previousGradeIndex);
                console.log(activeGradeIndex);

                //If previous grade is lower than current
                if (activeGradeIndex < previousGradeIndex) {

                    //Changing grade
                    allElementsFromActiveContainer.forEach( item => {
                        item.classList.remove('marked');
                    });

                    for (let i = 0; i <= activeGradeIndex; i++) {
                        allElementsFromActiveContainer[i].classList.add('marked');
                    };

                    allElementsFromActiveContainer.forEach( item => {
                        if (item.classList.contains('marked')) {
                            item.src = './images/slider-images/marked.png'
                        }
                        else {
                            item.src = './images/slider-images/unmarked.png'
                        };
                    });
                }
                //If previous grade is higher than current
                else if (activeGradeIndex > previousGradeIndex) {
                    //Changing grade
                    allElementsFromActiveContainer.forEach( item => {
                        item.classList.remove('marked');
                    });

                    for (let i = 0; i <= activeGradeIndex; i++) {
                        allElementsFromActiveContainer[i].classList.add('marked');
                    };

                    allElementsFromActiveContainer.forEach( item => {
                        if (item.classList.contains('marked')) {
                            item.src = './images/slider-images/marked.png'
                        } 
                        else {
                            item.src = './images/slider-images/unmarked.png'
                        }
                    });
                }
            };
        });
    });
});