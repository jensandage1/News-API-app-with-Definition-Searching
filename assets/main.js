var newsResults = document.getElementById("news-results");

function makeNewsApiRequest(searchOptions) {    
    var url = "https://newsdata.io/api/1/news?apikey=pub_2427444b5c3582055dfc0d123514e20901632";
    
    if (searchOptions.q) {
        url += ("&q=" + searchOptions.q);
    }
    if (searchOptions.country) {
        url += ("&country=" + searchOptions.country);
    }
    if (searchOptions.language) {
        url += ("&language=" + searchOptions.language);
    }

    url = encodeURI(url);
    var results = {};
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(responseJson) {
        displayResults(newsResults, responseJson);
    });
}

function handleSearchInput(event) {
    event.preventDefault();
    
    var searchKeyword = document.getElementById("search-keyword");
    var searchDate = document.getElementById("search-date");
    var searchCountry = document.getElementById("search-country");
    var searchLanguage = document.getElementById("search-language")
    
    var keywordInput = searchKeyword.value;
    var dateInput = searchDate.value;
    var countryInput = searchCountry.value;
    var languageInput = searchLanguage.value

    var optionObj = {};
    optionObj.q = keywordInput;
    optionObj.country = countryInput;
    optionObj.language = languageInput;

    makeNewsApiRequest(optionObj);
}

var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleSearchInput);



function saveArticle(headline, link, description) {
    var savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];
    var article = {
        headline: headline,
        link: link,
        description: description
    };
    savedArticles.push(article)
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
}

function makeResultsLi(headline, link, description) {
    var resultLi = document.createElement("li");
    resultLi.setAttribute("class", "results-container");
    var headlineA = document.createElement("a");
    headlineA.setAttribute("href", link);
    headlineA.textContent = headline;
    var descriptionP = document.createElement("p");
    descriptionP.textContent = description;
    var icon = document.createElement("i");
    icon.setAttribute("class", "fa-sharp fa-regular fa-star");
    icon.addEventListener("click", () => {
        saveArticle(headline, link, description);
    })

    resultLi.append(headlineA);
    resultLi.append(descriptionP);
    resultLi.append(icon);

    return resultLi;
}

function displayResults(baseElement, results) {
    console.log(results);
    baseElement.innerHTML = "";

    for (var i = 0; i < results.results.length; i++) {
        baseElement.append(makeResultsLi(results.results[i].title, results.results[i].link, results.results[i].description));
    }
}

var searchFormWord = document.getElementById('searchFormWord');
var userInputWord = document.getElementById('userWordInput');
var wordElement = document.getElementById('word');
var definitionEl = document.getElementById('definition');
var showModelButton = document.getElementById('showModalButton');

var urlWords = 'https://wordsapiv1.p.rapidapi.com/words/';

searchFormWord.addEventListener('submit', function(event){

    event.preventDefault();

    var searchQueryWord = userInputWord.value;

    fetch(urlWords + searchQueryWord + '/definitions' , {
        headers: {
            'X-RapidAPI-Key': '62d7a2ae92mshe8b924f7693f6ffp13c826jsnfab2aff8db21',
		    'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.definitions && data.definitions.length > 0){
            var word = searchQueryWord;
            var define = data.definitions[0].definition;
            wordElement.textContent = 'Word:' + word;
            definitionEl.textContent = define;

        
            console.log (data);
        } else {
            wordElement.textContent = 'No definition found';
            definitionEl.textContent =  ' ';
        }
    });
});
 