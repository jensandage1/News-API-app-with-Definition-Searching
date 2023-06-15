// Retrieve saved articles from localStorage or initialize an empty array
var savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

// Get the saved articles list container element
var savedArticlesList = document.getElementById("saved-articles-list");

// Function to update the visual positions of the list items
function updateVisualPositions() {
  var listItems = savedArticlesList.children;
  var startIndex = 1; // Adjust the starting index as needed
  savedArticlesList.setAttribute("start", startIndex);
  for (var i = 0; i < listItems.length; i++) {
    var listItem = listItems[i];
    listItem.setAttribute("data-index", i);
   
    
  }
}

// Function to render the saved articles in the DOM
function renderSavedArticles() {
  // Clear the existing list
  savedArticlesList.innerHTML = "";

  if (savedArticles && savedArticles.length > 0) {
    for (var i = 0; i < savedArticles.length; i++) {
      var article = savedArticles[i];

      var listItem = document.createElement("li");
      listItem.setAttribute("data-index", i);
      listItem.classList.add("results-container");

      var headline = document.createElement("a");
      headline.textContent = article.headline;
      headline.href = article.link;
      headline.target = "_blank";

      var description = document.createElement("p");
      description.textContent = article.description;

      var deleteIcon = document.createElement("i");
      deleteIcon.className = "fa-solid fa-trash-can";

      deleteIcon.addEventListener("click", function(event) {
        event.stopPropagation(); // Prevent event bubbling

        var listItem = event.target.parentNode;
        var index = parseInt(listItem.getAttribute("data-index"), 10); 
        // 10 to be sure it'll read the data-index as integers
        
        if (index !== -1) {
          savedArticles.splice(index, 1);
          localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
          listItem.remove();
          updateVisualPositions();

          if(savedArticles.length === 0){
            savedArticlesList.innerHTML = "<span>No saved articles found.</span>"
          }
        }
      });

      listItem.appendChild(headline);
      listItem.appendChild(description);
      listItem.appendChild(deleteIcon);

      savedArticlesList.appendChild(listItem);
    }
  } else {
    savedArticlesList.innerHTML = "<span>No saved articles found.</span>";
  }

  updateVisualPositions();
}

// Call the renderSavedArticles function to initially render the saved articles
renderSavedArticles();