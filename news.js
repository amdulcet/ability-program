async function fetchNews(query = '') {
    const apiKey = 'e241d450dd2743d0969e22f2e888785d'; // Replace with your NewsAPI key
    const url = `https://newsapi.org/v2/top-headlines?country=us&q=${query}&apiKey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function renderNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No news articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'news-article';
        
        articleElement.innerHTML = `
            <img src="${article.urlToImage || 'placeholder.jpg'}" alt="${article.title}">
            <h2>${article.title}</h2>
            <p>${article.description}</p>
        `;
        
        newsContainer.appendChild(articleElement);
    });
}

function readNews(articles) {
    const synth = window.speechSynthesis;
    synth.cancel(); // Cancel any ongoing speech synthesis

    articles.forEach((article, index) => {
        const utterance = new SpeechSynthesisUtterance(article.title + '. ' + article.description);
        utterance.onstart = () => {
            highlightArticle(index);
        };
        utterance.onend = () => {
            unhighlightArticle(index);
        };
        synth.speak(utterance);
    });
}

async function handleVoiceCommand(command) {
    const articles = await fetchNews(document.getElementById('search-input').value);
    if (command.toLowerCase() === 'read news') {
        readNews(articles);
    }
}

document.getElementById('search-input').addEventListener('input', async (event) => {
    const query = event.target.value;
    const articles = await fetchNews(query);
    renderNews(articles);
});

document.addEventListener('keydown', async (event) => {
    if (event.code === 'Space') {
        startVoiceRecognition();
    } else if (event.code === 'Enter') {
        stopReadingNews();
    }
});

async function init() {
    const articles = await fetchNews();
    renderNews(articles);
    readNews(articles); // Automatically read the news when the interface is opened
}

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        handleVoiceCommand(command);
    };

    recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
    };

    recognition.start();
}

function stopReadingNews() {
    window.speechSynthesis.cancel(); // Stop the speech synthesis
    unhighlightAllArticles(); // Remove highlighting from all articles
}

function highlightArticle(index) {
    const newsArticles = document.querySelectorAll('.news-article');
    const article = newsArticles[index];
    article.classList.add('highlighted');

    // Scroll to the highlighted article
    article.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Blur the surrounding articles
    newsArticles.forEach((a, idx) => {
        if (idx !== index) {
            a.classList.add('blurred');
        }
    });
}

function unhighlightArticle(index) {
    const newsArticles = document.querySelectorAll('.news-article');
    newsArticles.forEach(article => {
        article.classList.remove('highlighted', 'blurred');
    });
}

function unhighlightAllArticles() {
    const newsArticles = document.querySelectorAll('.news-article');
    newsArticles.forEach(article => {
        article.classList.remove('highlighted', 'blurred');
    });
}

init();
