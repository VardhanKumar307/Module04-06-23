document.addEventListener('DOMContentLoaded', function() {
    getCurrentImageOfTheDay();
    addSearchToHistory();
  
    document.getElementById('search-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var date = document.getElementById('search-input').value;
      getImageOfTheDay(date);
      saveSearch(date);
      addSearchToHistory();
    });
  
    document.getElementById('search-history').addEventListener('click', function(e) {
      if (e.target.tagName === 'LI') {
        var date = e.target.textContent;
        getImageOfTheDay(date);
      }
    });
  });
  
  function getCurrentImageOfTheDay() {
    var apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DMCsgQD1fdcIwWEofCBrleNssdznui4rfrezVuN4';
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayImage(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  function getImageOfTheDay(date) {
    var apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DMCsgQD1fdcIwWEofCBrleNssdznui4rfrezVuN4&date=' + date;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        displayImage(data);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  
  function displayImage(data) {
    var imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = '';
  
    if (data.media_type === 'image') {
      var image = document.createElement('img');
      image.src = data.url;
      image.alt = 'APOD';
      imageContainer.appendChild(image);
    } else {
      var message = document.createElement('p');
      message.textContent = 'No image available for this date.....';
      imageContainer.appendChild(message);
    }
  }
  
  function saveSearch(date) {
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
  }
  
  function addSearchToHistory() {
    var searchHistory = document.getElementById('search-history');
    searchHistory.innerHTML = '';
  
    var searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(function(date) {
      var listItem = document.createElement('li');
      listItem.textContent = date;
      searchHistory.appendChild(listItem);
    });
  }
  