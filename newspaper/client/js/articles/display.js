const MAX_ARTICLES = 5;

export let displayArticles = (articles) => {
    let numberToDisplay = Math.min(articles.length, MAX_ARTICLES),
        i;
    for (i = 0; i < numberToDisplay; i++) {
        let article = articles[i],
            $elem = $('#article-'+ (i + 1));
        $elem.find('h1, h2').html(article.title);
        $elem.find('article').html(article.content);
    
        console.log(article.createdAt);
    }
};