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