// wait until the HTML page is loaded 
document.addEventListener("DOMContentLoaded", () => {
  // get the (select) element and the container for articles
  const sectionSelect = document.getElementById("sectionSelect");
  const articlesContainer = document.getElementById("articlesContainer");

  // the API key goes here
  const apiKey = "sBfweAXGbenWPk2hGwGsN2G5PqPFsjsB";

  // fetch and display articles based on the selected section
  async function fetchArticles(section) {
    // put the URL for top stories API
    const url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;

    try {
      // make the API request and wait for the response
      const response = await fetch(url);
      const data = await response.json();

      // call the function to show articles on the page 
      displayArticles(data.results);
    } catch (error) {
      // in case something goes wrong, show an error message
      articlesContainer.innerHTML = `<p>Failed to fetch articles. Please try again later.</p>`;
      console.error("Error fetching articles", error);
    }
  }

  // function to show articles on the page 
  function displayArticles(articles) {
    // clear any previous articles 
    articlesContainer.innerHTML = "";

    // loop through each article and add it to the page 
    articles.forEach(article => {
      const articleElement = document.createElement("div");
      articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.abstract}</p> 
        <a href="${article.url}" target="_blank">Read more</a>
        <hr>
      `;
      articlesContainer.appendChild(articleElement);
    });
  }

  // fetch articles for the initial selected section (default)
  fetchArticles(sectionSelect.value);

  // when user selects a new section, fetch new articles 
  sectionSelect.addEventListener("change", () => {
    fetchArticles(sectionSelect.value);
  });

  // the search form
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();    // prevent page reload

    const query = searchInput.value.trim();
    if (query === "") return;

    // the article search api url
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      displaySearchResults(data.response.docs);
    } catch (error) {
      articlesContainer.innerHTML = `<p>failed to search articles.</p>`;
      console.error("error searching articles:", error);
    }
  });

  // function to show search results on the page
  function displaySearchResults(articles) {
    articlesContainer.innerHTML = "";

    articles.forEach(article => {
      const articleElement = document.createElement("div");
      articleElement.innerHTML = `
        <h2>${article.headline.main}</h2>
        <p>${article.snippet}</p>
        <a href="${article.web_url}" target="_blank">Read more</a>
        <hr>
      `;
      articlesContainer.appendChild(articleElement);
    });
  }

  //the archive form
  const archiveForm = document.getElementById("archiveForm");
  const monthSelect = document.getElementById("monthSelect");
  const yearSelect = document.getElementById("yearSelect");

  archiveForm.addEventListener("submit", async (e) => {
    e.preventDefault();    //prevent page reload

    const month = monthSelect.value;
    const year = yearSelect.value;

    const url = `https://api.nytimes.com/svc/archive/v1/${year}/${month}.json?api-key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      displayArchiveArticles(data.response.docs);
    } catch (error) {
      articlesContainer.innerHTML = `<p>failed to load archive.</p>`;
      console.error("error loading arhive:", error);
    }
  });

  // function to show archive articles on the page
  function displayArchiveArticles(articles) {
    articlesContainer.innerHTML = "";

    articles.forEach(article => {
      const articleElement = document.createElement("div");
      articleElement.innerHTML = `
        <h2>${article.headline.main}</h2>
        <p>${article.snippet}</p>
        <a href="${article.web_url}" target="_blank">Read more</a>
        <hr>
      `;
      articlesContainer.appendChild(articleElement);
    });
  }
});