import { createArticle } from './queries';

let createInput = (title, category, content) => {
    return {
        "input": {
            "authorId": Cookies.get('userId'),
            "title": title,
            "category": category,
            "content": content
        }
    };
};

$('#create-button').on('click', (event) => {
    event.preventDefault();
    
    let title = $('#title').val(),
        category = $('#category').val(),
        content = $('#content').val(),
        data = createInput(title, category, content);
        
    $.ajax({
        type: "POST",
        url: "https://us-west-2.api.scaphold.io/graphql/web130_class",
        data: JSON.stringify({
            query: createArticle,
            variables: data
        }),
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + Cookies.get('token')
        },
        success: function(response) {
            if (response.hasOwnProperty('data')) {
                alert('You created a new article!');
                $('form')[0].reset();
            }
        },
        error: function(xhr, status, response) {
            console.log(response);
            if (response.hasOwnProperty('errors')) {
                alert(response.errors[0].message);
            }
        }
    });
});