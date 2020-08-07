// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

axios.get('https://lambda-times-api.herokuapp.com/articles')
    .then(response => {
        debugger
        console.log(response)
        console.log(response.data)
        const cards = document.querySelector('.cards-container')
        console.log(response.data.articles)
        for(let key in response.data.articles){
            console.log(key)
            response.data.articles[key].forEach(element => {
                const newCard = cardMaker(element)
                document.querySelectorAll('.tab').forEach(tabElement => {
                    tabElement.addEventListener('click', event => {
                        console.log(key)
                        console.log(event.target.outerText, " first")
                        if(!event.target.outerText.toLowerCase().includes(key)){
                            console.log(event.target.outerText, "hello")
                            newCard.style.display = 'none'
                        } else {
                            newCard.style.display = 'inline-block'
                        }
                    })
                })
            cards.appendChild(newCard)
            })
        }
    })
    .catch(errorResponse =>{
        debugger
        console.log(errorResponse)  
    })

function cardMaker(cardObj){
    const card = document.createElement('div')
    const cardHeadline = document.createElement('div')
    const cardAuthor = document.createElement('div')
    const cardImgCont = document.createElement('div')
    const cardImg = document.createElement('img')
    const cardBy = document.createElement('span')

    card.classList.add('card')
    cardHeadline.classList.add('headline')
    cardAuthor.classList.add('author')
    cardImgCont.classList.add('img-container')
    cardImg.src = cardObj.authorPhoto

    card.appendChild(cardHeadline)
    card.appendChild(cardAuthor)
    cardAuthor.appendChild(cardImgCont)
    cardAuthor.appendChild(cardBy)
    cardImgCont.appendChild(cardImg)

    cardHeadline.textContent = `${cardObj.headline}`
    cardBy.textContent = `By: ${cardObj.authorName}`

    card.addEventListener('click', () => {
        console.log(`${cardObj.headline}`)
    })

    return card
}

