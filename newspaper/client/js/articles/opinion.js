import { getCategoryArticles } from './queries';
import { displayArticles } from './display';


if (js_page == 'opinion_page') {
    
    let opinionFilter = {
        "where": {
            "category": {
                "eq": "Opinion"
            }
        }
    };
    
    $.ajax({
        type: "POST",
        url: "https://us-west-2.api.scaphold.io/graphql/web130_class",
        data: JSON.stringify({
            query: getCategoryArticles,
            variables: opinionFilter
        }),
        contentType: 'application/json',
        success: function(response) {
            let articles = [];
            if (response.hasOwnProperty('data')) {
                let articleEdges = response.data.viewer.allArticles.edges;
                for (var article of articleEdges) {
                    articles.push(article.node);
                }
            }
            
            displayArticles(articles);
        }
    });
}