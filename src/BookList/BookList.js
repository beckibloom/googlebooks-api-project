import React from 'react';
import './BookList.css';
import Book from '../Book/Book.js';

class BookList extends React.Component {
    render() {
        let books = this.props.books.map(book => (
        <Book bookObj={book} key={book.id} />
        ))
        return(
            <main>
                <ul>
                    {books}
                </ul>
            </main>
        )
    }
}

export default BookList;