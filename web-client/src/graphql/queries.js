import { gql } from '@apollo/client';

export const getAuthorsQuery = gql`
    {
        authors {
            id,
            name
        }
    }
`;


export const getBooksQuery = gql`
    {
        books {
            id,
            name,
            genre,
            author {
              name
            }
        }
    }
`;

export const getBookQuery = gql`
    query GetBook($bookId: ID) {
        book(id: $bookId) {
            id,
            name,
            genre,
            author {
                id,
                name,
                age,
                books {
                    id,
                    name
                }
            }
        }
    }
`;

export const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId) {
            id,
            name
        }
    }
`;
