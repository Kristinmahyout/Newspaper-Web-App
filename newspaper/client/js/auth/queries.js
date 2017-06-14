// Login query
export const loginUser = `
    mutation loginUserQuery($input: LoginUserInput!) {
        loginUser(input: $input) {
            token
            user {
                id
                username
                name
            }
        }
    }`;