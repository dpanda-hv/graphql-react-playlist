import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';

import { addBookMutation, getAuthorsQuery, getBooksQuery } from '../graphql/queries';


const AddBook = ({ data }) => {
    const INITIAL_STATE = {
        name: "",
        genre: "",
        authorId: ""
    };

    const [state, setState] = useState({...INITIAL_STATE});
    const {authors, loading} = data;
    const [addBook, ] = useMutation(addBookMutation);

    const onChange = ({ value, name }) => {
        setState({
            ...state,
            [name]: value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        addBook({
            variables: {
                name: state.name,
                genre: state.genre,
                authorId: state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        }).then(() => setState({...INITIAL_STATE}));

    }

    return (
        <form id="add-book" onSubmit={onSubmit}>
            <div className="field">
                <label>Book Name</label>
                <input type="text" name="name" value={state.name} onChange={(e) => onChange(e.target)} />
            </div>
            <div className="field">
                <label>Genre</label>
                <input type="text" name="genre" value={state.genre} onChange={(e) => onChange(e.target)} />
            </div>
            <div className="field">
                <label>Author</label>
                <select name="authorId" value={state.authorId} onChange={(e) => onChange(e.target)}>
                    {
                        loading
                            ? <option disabled>loading...</option>
                            : (
                                <>
                                    <option disabled value="">Select Author</option>
                                    {authors.map(author => (<option key={author.id} value={author.id}>{author.name}</option>))}
                                </>
                            )
                    }
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default graphql(getAuthorsQuery)(AddBook);
