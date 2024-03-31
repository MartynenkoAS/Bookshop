import Slider   from "./slider.js";
import GetBooks from "./getbooks.js";

const sliderClass   = new Slider();
const getBooksClass = new GetBooks();

let booksCategoryPosition = document.querySelectorAll(".categories__element");      // слушаем нажатие категории
    booksCategoryPosition.forEach( (categor) => {
        categor.addEventListener("click", () => {
            getBooksClass.getCategorFunc(categor.dataset.category);                // определяем нажатую категрию по data-атрибуту
        });
    });

let headerIconElementCartPosition = document.querySelector(".header__icon-element-cart");
    headerIconElementCartPosition.addEventListener ("click", () => {
    
    getBooksClass.getBooksFromCartFunc();
    });

    let stopInterval = 0;
    let sliderSpeed  = 5000;

    sliderClass.sliderButton();
    
    stopInterval = setInterval(() => {
    sliderClass.sliderFunc(stopInterval);
    }, sliderSpeed);