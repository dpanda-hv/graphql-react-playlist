import React from "react";
import { graphql } from "@apollo/client/react/hoc";
import { getBookQuery } from "../graphql/queries";

const BookDetails = ({ data }) => {
    const { book } = data;

    return (
      <div id="book-details">
          {
              book ? 
                <>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {book.author.books.map((item) => {
                            return <li key={item.id}>{item.name}</li>;
                        })}
                    </ul>                
                </> :
                <p>No book selected!</p>
          }
      </div>
    );
}

export default graphql(getBookQuery, {
    options: ({ bookId }) => ({ id: bookId })
})(BookDetails);
