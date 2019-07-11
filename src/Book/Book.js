import React from 'react';
import './Book.css';

class Book extends React.Component {
    findPrice = () => {
        const book = this.props.bookObj;
        if (book.saleInfo.saleability === "FOR_SALE") {
            return (
                book.saleInfo.retailPrice.amount + ' ' + 
                book.saleInfo.retailPrice.currencyCode
            )
        } else { return ('Not for sale') }
    }

    // getImage = () => {
    //     const book = this.props.bookObj;
    //     if (book.volumeInfo.imageLinks == true) {
    //         return (
    //             <img src={book.volumeInfo.imageLinks.smallThumbnail}
    //             alt='Cover art'
    //             className="book-img" />
    //         )
    //     } else {
    //         return (
    //             <div className="book-img">No cover image available</div>
    //         )
    //     }
    // }
    
    // Note that AUTHOR prop is an array of author names
    render() {
        const book = this.props.bookObj;
        const title = book.volumeInfo.title
            ? book.volumeInfo.title
            : 'Title not found';
        const author = book.volumeInfo.authors
            ? book.volumeInfo.authors.join(', ')
            : 'Author not found';
        const price = this.findPrice();
        const description = book.volumeInfo.description
            ? book.volumeInfo.description
            : 'Description not found';
        const image = book.volumeInfo.imageLinks
            ? <img src={book.volumeInfo.imageLinks.smallThumbnail}
                    alt='Cover art'
                    className="book-img" />
            : <div className="book-img">No cover image available</div>;
        return(
            <li>
                <h2>{title}</h2>
                <section className="book-details">
                    {image}
                    <div className="book-summary">
                        <p>Author(s): <span className="author">{author}</span></p>
                        <p>Price: <span className="price">{price}</span></p>
                        <p className="description">{description}</p>
                    </div>
                </section>
            </li>
        )
    }
}

export default Book;