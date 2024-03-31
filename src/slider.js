class Slider {
    constructor() {
        this.sliderIndex = 0;
        this.sliderPosition = document.querySelector(".banner-elem");
        this.sliderButtonPosition = document.querySelectorAll(".bunner__buttons-element");
    }
    
    sliderFunc() {              
        this.sliderPosition.src = `./img/banner_${this.sliderIndex + 1}.png`;
        this.sliderButtonPosition.forEach((element) => {
            element.style.backgroundColor = "#EFEEF6";
        });
        this.sliderButtonPosition[this.sliderIndex].style.backgroundColor = "#9E98DC";
        this.sliderIndex == 2 ? this.sliderIndex = 0 : this.sliderIndex++;
    }
    
    sliderButton() {
        for (let i = 0; i < this.sliderButtonPosition.length; i++) {
            this.sliderButtonPosition[i].addEventListener("click", () => {
                this.sliderIndex = i;
                this.sliderFunc();
            });
        }
    }
}
export default Slider;

