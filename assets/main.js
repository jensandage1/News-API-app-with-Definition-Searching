function addCommaSeparatedParams(str, array) {
    for (var i = 0; i < array.length; i++) {
        str += array[i];
        if (i < array.length - 1) {
            str += ",";
        }
    }
    return str;
}

function makeNewsApiRequest(searchOptions) {    
    var url = "http://api.mediastack.com/v1/news?access_key=a0b27656eb8ca6fbf0376345a1bd8ff9";
    
    if (searchOptions.keywords) {
        url += ("&keywords=" + searchOptions.keywords);
    }
    if (searchOptions.countries) {
        url += "&countries=";
        url = addCommaSeparatedParams(url, searchOptions.country);
    }
    if (searchOptions.languages) {
        url += ("&languages=" + searchOptions.language);
    }
    if (searchOptions.date) {
        url += ("&date=" + searchOptions.date);
    }

    url = encodeURI(url);
    var results = {};
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(responseJson) {
        results.array = responseJson.data;
    });

    return results;
}

function handleSearchInput(event) {
    event.preventDefault();
    
    var searchKeyword = document.getElementById("search-keyword");
    var searchLanguage = document.getElementById("search-language");
    var searchDate = document.getElementById("search-date");
    var searchCountry = document.getElementById("search-country");
    var searchDomain = document.getElementById("search-domain");
    
    var keywordInput = searchKeyword.value;
    var languageInput = searchLanguage.value;
    var dateInput = searchDate.value;
    var countryInput = searchCountry.value;
    var domainInput = searchDomain.value;

    var optionObj = {};
    optionObj.keywords = keywordInput;
    optionObj.languages = languageInput;
    optionObj.countries = countryInput;

    var results = makeNewsApiRequest(optionObj);
    console.log(results);
}

var searchForm = document.getElementById("search-form");
searchForm.addEventListener("submit", handleSearchInput);

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
 