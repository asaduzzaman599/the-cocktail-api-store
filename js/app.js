const loadData =async (input = '')=>{

    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    try{

        const res = await fetch(url);
        const data = await res.json();
        displayData(data.drinks)
    }catch(e){

    }
}

// intial call 
loadData();

const displayData = (drinks) =>{
    const cocktailContainer = document.getElementById('cocktail-container')

    const htmlDocument = drinks.map(drink => getHtmlDocument(drink))
    console.log(htmlDocument)
    cocktailContainer.innerHTML = htmlDocument.join(' ');
}

const getHtmlDocument = ({strDrinkThumb,strAlcoholic,strInstructions}) =>{
    return `
    <div class="col">
                  <div class="card">
                    <img src="${strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${strAlcoholic}</h5>
                      <p class="card-text">${strInstructions}</p>
                    </div>
                  </div>
                </div>
    `;
}