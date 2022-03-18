
    const cocktailContainer = document.getElementById('cocktail-container');
const loadAllData = (input = '')=>{
    console.log(input)
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    loadData(url,displayData)
}

const loadData =async (url,callBack) =>{
    try{

        const res = await fetch(url);
        const data = await res.json();
        callBack(data.drinks)
    }catch(e){

    }
}


const displayData = (drinks) =>{

    const htmlDocument = drinks.map(drink => getHtmlDocument(drink));
    cocktailContainer.innerHTML = htmlDocument.join(' ');
}

const getHtmlDocument = ({strDrinkThumb,strIngredient2,strInstructions,idDrink}) =>{
    return `
    <div class="col">
                  <div class="card h-100">
                    <img src="${strDrinkThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${strIngredient2}</h5>
                      <p class="card-text">${strInstructions}</p>
                    </div>
                    <div class="text-center">
                    <button onclick="loadCocktail('${idDrink}')" class="mb-4  btn btn-primary"data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
                  </div>
                </div>
    `;
}

const loadCocktail = (id) =>{
    document.getElementById('exampleModalLabel').innerText = ''
    document.getElementById('modal-img').setAttribute('src', '');
    document.getElementById('category').innerText= '';
    document.getElementById('name').innerText = '';
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    loadData(url,detailCocktail)
}
const detailCocktail = (drink)=>{
    console.log(drink)
    document.getElementById('exampleModalLabel').innerText = `${drink[0].strIngredient2}`
    document.getElementById('modal-img').setAttribute('src', drink[0].strDrinkThumb);
    document.getElementById('category').innerText= drink[0].strCategory;
    document.getElementById('name').innerText = drink[0].strIngredient2;
}


// intial call 
loadAllData();

const searchCocktail = () =>{
    cocktailContainer.textContent=''
    const input = document.getElementById('search-input');
    const inputValue =input.value;

    input.value='';

    loadAllData(inputValue)


}

document.getElementById('search-input').addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        searchCocktail();
    }
})