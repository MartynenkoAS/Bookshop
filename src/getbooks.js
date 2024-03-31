class GetBooks {
    constructor() {
        this.APIKEY  = "AIzaSyAAsp0KAxhayeBQy7wvupWzW44xhsnVaxE";
        this.URL     = `https://www.googleapis.com/books/v1/volumes?key=${this.APIKEY}&printType=books&maxResults=6&langRestrict=en`;
        this.fullURL = "";           //this.URL + `&q=subject:Art&startIndex=0`;
        this.booksPosition  = document.querySelector(".booksShowArea");
        this.inTheCartIndexPosition = document.querySelector(".header__inTheCartIndex");
        // this.booksCategoryPosition = document.querySelectorAll(".categories__element");
        this.MainBooksArray = [];
        this.__subject = "Architecture";
        this.__startIndex = 0;
        this.inTheCartIndex = localStorage.length || 0;
        this.inTheCartIndexPosition.textContent = this.inTheCartIndex;

        this.getCategorFunc(this.__subject);
    }

    getCategorFunc(subjectInt = null) {                                         // формируем запрос исходя из категории или нажатии кнопки дозагрузки и
                                                                                // перерисовываем стили категорий книг
        if (subjectInt !== null) {
            this.booksPosition.replaceChildren();
            this.MainBooksArray.splice(0);
            
            let booksCategoryPositionRingHide = document.querySelector('.categories__element_ring[data-category="'+this.__subject+'"]');
                booksCategoryPositionRingHide.style.backgroundColor = "#EFEEF6";

            let booksCategoryPositionHide = document.querySelector('.categories__element[data-category="'+this.__subject+'"]');
                booksCategoryPositionHide.classList.remove("categories__element_active");
            
            let booksCategoryPositionRing = document.querySelector('.categories__element_ring[data-category="'+subjectInt+'"]');
                booksCategoryPositionRing.style.backgroundColor = "#756AD3";
                
            let booksCategoryPositionActive = document.querySelector('.categories__element[data-category="'+subjectInt+'"]');
                booksCategoryPositionActive.classList.add("categories__element_active");

                this.__subject    = subjectInt;
                this.__startIndex = 0;
        } else {
                this.__startIndex += 6;
        }

        this.fullURL = this.URL + `&q=subject:${this.__subject}&startIndex=${this.__startIndex}`;
        
        this.booksRequest();
    }

    booksRequest() {                                                            // получаем книзи из googl
        fetch(this.fullURL) 
        .then( (response) => { return response.json(); })
        .then( (data) => {
            
            for (let i = 0; i < data.items.length; i++) {

                let bookGetElement = {
                    cat: data.items[i].volumeInfo.categories?.join(", ") || "not catecories",
                    id: data.items[i].id || "not id",
                    cover: data.items[i].volumeInfo.imageLinks?.thumbnail == undefined ? "./img/no_image.png" : data.items[i].volumeInfo.imageLinks.thumbnail,
                    specTitle: data.items[i].volumeInfo.title?.length > 60 ?
                               data.items[i].volumeInfo.title.slice(0, 60) + "..." :
                               data.items[i].volumeInfo.title,
                    specAuthor: data.items[i].volumeInfo.authors?.join(", ") || "not author",
                    // specRaiting_stars: "✭✭✭✭✭",                                                         // теперь в ответах нет параметра avarageRating
                    // specRaiting_review: "### review",                                                      // теперь в ответах нет параметра ratingsCount
                    specDescript: data.items[i].volumeInfo.description?.length > 90 ? 
                                  data.items[i].volumeInfo.description.slice(0, 90) + "..." :
                                  data.items[i].volumeInfo.description,
                    specPrice:    data.items[i].saleInfo.saleability == "NOT_FOR_SALE" || data.items[i].saleInfo.retailPrice == undefined ? 
                                  "Not for sale" :
                                  data.items[i].saleInfo.retailPrice?.currencyCode + " " + data.items[i].saleInfo.retailPrice?.amount
                };
                
                this.MainBooksArray.push(bookGetElement);
            }
            
            this.setBooksCollection(false);
        })
        .catch( (error) => { console.log("JSON Error:" + error); });
    }
    
    getBooksFromCartFunc() {                                                // получаем книги из корзины
        
        this.booksPosition.replaceChildren();
        this.MainBooksArray.splice(0);
        this.__startIndex = 0;
        
        for (let i = 0; i <localStorage.length; i++) {
            this.MainBooksArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }

        this.setBooksCollection(true);
    }
    
    setBooksCollection(isLocalStorage) {                                    // формируем блоки книг и выводим в нужную зону экрана

        for (let i = this.__startIndex; i < this.MainBooksArray.length; i++) {
            let booksShowAreaElement = document.createElement("div");
                booksShowAreaElement.classList.add("booksShowArea__element");

                let booksShowAreaElementCover = document.createElement("img");
                    booksShowAreaElementCover.classList.add("booksShowArea__element-cover");
                    booksShowAreaElementCover.src = this.MainBooksArray[i].cover;
                    booksShowAreaElementCover.setAttribute("alt", this.MainBooksArray[i].cover);

                    booksShowAreaElement.appendChild(booksShowAreaElementCover);
                
                let booksShowAreaElementDescription = document.createElement("div");
                    booksShowAreaElementDescription.classList.add("booksShowArea__element-descript");

                    let booksShowAreaElementSpecCat = document.createElement("div");
                        booksShowAreaElementSpecCat.classList.add("booksShowArea__element-specAuthor");
                        booksShowAreaElementSpecCat.textContent = this.MainBooksArray[i].cat;

                        booksShowAreaElementDescription.appendChild(booksShowAreaElementSpecCat);

                    let booksShowAreaElementSpecAuthor = document.createElement("div");
                        booksShowAreaElementSpecAuthor.classList.add("booksShowArea__element-specAuthor");
                        booksShowAreaElementSpecAuthor.textContent = this.MainBooksArray[i].specAuthor;

                        booksShowAreaElementDescription.appendChild(booksShowAreaElementSpecAuthor);
                    
                    let booksShowAreaElementSpecTitle = document.createElement("div");
                        booksShowAreaElementSpecTitle.classList.add("booksShowArea__element-specTitle");
                        booksShowAreaElementSpecTitle.textContent = this.MainBooksArray[i].specTitle;

                        booksShowAreaElementDescription.appendChild(booksShowAreaElementSpecTitle);

                        let booksShowAreaElementSpecRaiting = document.createElement("div");
                            booksShowAreaElementSpecRaiting.classList.add("booksShowArea__element-specRaiting");

                            let booksShowAreaElementSpecRaitingStars = document.createElement("div");
                                booksShowAreaElementSpecRaitingStars.classList.add("booksShowArea__element-specRaiting_stars");
                                booksShowAreaElementSpecRaitingStars.textContent = this.MainBooksArray[i].specRaiting_stars;

                                booksShowAreaElementSpecRaiting.appendChild(booksShowAreaElementSpecRaitingStars);

                            let booksShowAreaElementSpecRaitingReview = document.createElement("div");
                                booksShowAreaElementSpecRaitingReview.classList.add("booksShowArea__element-specRaiting_review");
                                booksShowAreaElementSpecRaitingReview.textContent = this.MainBooksArray[i].specRaiting_review;

                                booksShowAreaElementSpecRaiting.appendChild(booksShowAreaElementSpecRaitingReview);

                        booksShowAreaElementDescription.appendChild(booksShowAreaElementSpecRaiting);

                    let booksShowAreaElementSpecDescript = document.createElement("div");
                        booksShowAreaElementSpecDescript.classList.add("booksShowArea__element-specDescript");
                        booksShowAreaElementSpecDescript.textContent = this.MainBooksArray[i].specDescript;

                        booksShowAreaElementDescription.appendChild(booksShowAreaElementSpecDescript);

                    let booksShowAreaElementSpecPrice = document.createElement("div");
                        booksShowAreaElementSpecPrice.classList.add("booksShowArea__element-specPrice");
                        booksShowAreaElementSpecPrice.textContent = this.MainBooksArray[i].specPrice;

                        booksShowAreaElementDescription.appendChild(booksShowAreaElementSpecPrice);

                    let booksShowAreaElementButton = document.createElement("button");

                        if (isLocalStorage) {
                            booksShowAreaElementButton.textContent = "IN THE CART";
                            booksShowAreaElementButton.className = "button buttonInTheCart";
                            
                        } else {
                            booksShowAreaElementButton.textContent = "BUY NOW";
                            booksShowAreaElementButton.className = "button";
                        }
                        
                        booksShowAreaElementButton.addEventListener("click", () => {
                            
                            if (booksShowAreaElementButton.classList.contains("buttonInTheCart")) {
                                booksShowAreaElementButton.textContent = "BUY NOW";
                                booksShowAreaElementButton.className = "button";
                                this.inTheCartIndex -= 1;
                                this.inTheCartIndexPosition.textContent = this.inTheCartIndex;

                                localStorage.removeItem(this.MainBooksArray[i].id);
                                
                            } else {
                                booksShowAreaElementButton.textContent = "IN THE CART";
                                booksShowAreaElementButton.className = "button buttonInTheCart";
                                this.inTheCartIndex += 1;
                                this.inTheCartIndexPosition.textContent = this.inTheCartIndex;
                                
                                localStorage.setItem(this.MainBooksArray[i].id, JSON.stringify(this.MainBooksArray[i]));
                            }
                        });

                        booksShowAreaElementDescription.appendChild(booksShowAreaElementButton);

                    booksShowAreaElement.appendChild(booksShowAreaElementDescription);
                
                this.booksPosition.appendChild(booksShowAreaElement);
        }
            if (!isLocalStorage) {                                      // не рисуем кнопку дозагрузки, если вывели данные из localStorage
                
                let buttonLoadMore = document.createElement("button");
                    buttonLoadMore.className = "button buttonLoadMore";
                    buttonLoadMore.textContent = "LOAD MORE";
                    this.booksPosition.appendChild(buttonLoadMore);

                    buttonLoadMore.addEventListener ("click", () => {
                    document.querySelector(".buttonLoadMore").remove();
                    this.getCategorFunc();
                    });
            }
    }

}
export default GetBooks;