import banner_1 from "./img/banner_1.png";
import banner_2 from "./img/banner_2.png";
import banner_3 from "./img/banner_3.png"; 

const pictureArr = [banner_1, banner_2, banner_3];

class Slider {
    constructor() {
        this.sliderIndex = 0;
        this.sliderPosition = document.querySelector(".banner-elem");
        this.sliderButtonPosition = document.querySelectorAll(".bunner__buttons-element");
    }
    
    sliderFunc() {             
        console.log("banner_" + Number(this.sliderIndex+1));
        console.log(typeof("banner_" + this.sliderIndex+1));

        this.sliderPosition.src = pictureArr[this.sliderIndex];
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

