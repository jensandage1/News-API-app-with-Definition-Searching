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
    var url = "https://newsapi.org/v2/everything?apiKey=eae3fd95544c42e79c03646924fc6cf2";
    
    if (searchOptions.q) {
        url += ("&q=" + searchOptions.q);
    }
    if (searchOptions.country) {
        url += "&country=";
        url = addCommaSeparatedParams(url, searchOptions.sources);
    }
    if (searchOptions.domains) {
        url += "&domains=";
        url = addCommaSeparatedParams(url, searchOptions.domains);
    }
    if (searchOptions.language) {
        url += ("&language=" + searchOptions.language);
    }
    if (searchOptions.dateFrom) {
        url += ("&from=" + searchOptions.dateFrom);
    }
    if (searchOptions.dateTo) {
        url += ("&to=" + searchOptions.dateTo);
    }

    url = encodeURI(url);
    var results = {};
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        if (data.error === "error") {
            results.error.code = data.code;
            results.error.message = data.message;
            return;
        }
        results.array = data.articles;
    });

    return results;
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
 