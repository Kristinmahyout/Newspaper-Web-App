import { getCategoryArticles } from './queries';
import { displayArticles } from './display';


if (js_page == 'community_page') {
    
    let campusFilter = {
        "where": {
            "category": {
                "eq": "Community"
            }
        }
    };

    $.ajax({
        type: "POST",
        url: "https://us-west-2.api.scaphold.io/graphql/web130_class",
        data: JSON.stringify({
            query: getCategoryArticles,
            variables: communityFilter
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