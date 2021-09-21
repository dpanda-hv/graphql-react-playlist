import React, { useState } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getBooksQuery } from '../graphql/queries';
import BookDetails from './BookDetails';

const BookList = ({ data }) => {
  const [bookId, setBookId] = useState(null);
  const { loading, books } = data;
  return loading ? (
    <div>No Books available!</div>
  ) : (
    <div>
      <ul id="book-list">
        {books.map((book) => (
          <li key={book.id} onClick={() => setBookId(book.id)}>
            {book.name}
          </li>
        ))}
      </ul>
      <BookDetails bookId={bookId} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
