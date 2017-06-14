import { loginUser } from './queries';

let loginInput = (username, password) => {
    return {
        "input": {
            "username": username,
            "password": password
        }
    };
};

let processLogin = (user, token) => {
    Cookies.set('userId', user.id);
    Cookies.set('token', token);
    
    window.location = createArticleUrl();
};

let createArticleUrl = () => {
    return window.location.href.replace('/login.html', '/create.html');
};

$('#logbutton').on('click', (event) => {
    event.preventDefault(); //this captures the event and prevents it from getting submitted right away
    
    let username = $('#username').val(),
        password = $('#password').val(),
        data = loginInput(username, password);
        
    $.ajax({
        type: "POST",
        url: "https://us-west-2.api.scaphold.io/graphql/web130_class",
        data: JSON.stringify({
            query: loginUser,
            variables: data
        }),
        contentType: 'application/json',
        success: function(response) {
            if (response.hasOwnProperty('errors')) {
                alert(response.errors[0].message);
            } else if (response.hasOwnProperty('data')) {
                let loginUser = response.data.loginUser,
                    token = loginUser.token,
                    user = loginUser.user;
                processLogin(user, token);
            }
        }
    });
});