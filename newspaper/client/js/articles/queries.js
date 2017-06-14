// List of all articles
export const getAllArticles = `query getAllArticles {
    viewer {
        allArticles{
            edges {
                node {
                    id
                    createdAt
                    title
                    content
                    category
                    author {
                        id
                        name
                    }
                }
            }
        }
    }
}`;

export const getCategoryArticles = `
    query getCategoryArticles($where: ArticleWhereArgs) {
        viewer {
            allArticles(where: $where) {
                edges {
                    node {
                        id
                        title
                        content
                        category
                        createdAt
                        author {
                            id
                            name
                        }
                    }
                }
            }
        }
    }`;
    
export const createArticle = `
    mutation createArticleQuery($input: CreateArticleInput!) {
        createArticle(input: $input) {
            changedArticle {
                id
                modifiedAt
                title
                content
                category
                author {
                    id
                    name
                }
            }
        }
    }`;