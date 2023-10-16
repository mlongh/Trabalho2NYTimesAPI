document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const sectionInput = document.getElementById('section'); // Input para selecionar a seção
    const defaultSection = 'home'; // Seção padrão

    // Função para carregar os artigos
    function loadArticles(section) {
        // Remova os artigos existentes da lista
        const newsList = document.getElementById('news-list');
        newsList.innerHTML = ''; // Limpa a lista

        // Substitua 'YOUR_API_KEY' pela sua chave de API real do New York Times.
        const apiKey = '';
        const apiUrl = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${apiKey}`;

        // Obtenha dados da API do New York Times
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Log the entire data object to the console
                console.log(data);
                data.results.forEach(article => {
                    const articleCard = document.createElement('div');
                    articleCard.className = 'col-md-4 mb-4 card';
                    articleCard.style.width = '18rem';
                    articleCard.style.padding = '4px';
                    articleCard.style.margin = '8px';

                    const articleImage = document.createElement('img');
                    articleImage.className = "img img-fluid rounded";
                    articleImage.style.width = "100%"; 
                    articleImage.style.height = "200px"; 
                    if (article?.multimedia?.length > 0) {
                        articleImage.src = article.multimedia[0].url;
                    }   

                    const articleTitle = document.createElement('h4');
                    articleTitle.textContent = article.title;
                    articleTitle.className = 'card-title';

                    const articleDescription = document.createElement('div');
                    articleDescription.textContent = article.abstract;
                    articleDescription.className = 'card-body';

                    const articleLink = document.createElement('a');
                    articleLink.href = article.url;
                    articleLink.textContent = 'Read More';
                    articleLink.className = 'btn btn-primary';

                    articleCard.appendChild(articleImage);
                    articleCard.appendChild(articleTitle);
                    articleCard.appendChild(articleDescription);
                    articleCard.appendChild(articleLink);

                    newsList.appendChild(articleCard);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Carregar os artigos com a seção padrão
    loadArticles(defaultSection);

    // evento de mudança  para recarregar os artigos quando a seção é alterada
    sectionInput.addEventListener('change', function () {
        const selectedSection = sectionInput.value;
        loadArticles(selectedSection);
    });
});
