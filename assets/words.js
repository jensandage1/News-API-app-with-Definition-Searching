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
 