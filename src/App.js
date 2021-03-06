import React from 'react';
import Header from './Header/Header.js';
import SearchForm from './SearchForm/SearchForm.js';
import FilterOptions from './FilterOptions/FilterOptions.js';
import BookList from './BookList/BookList.js';
import './App.css';
import { arrayExpression } from '@babel/types';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books:null,
      error:null,
      printType:'allPrint',
      bookType:'allBooks'
    }
  }

  setPrintType = (filter) => {
    this.setState({
      printType: filter
    });
  }

  setBookType = (filter) => {
    this.setState({
      bookType: filter
    });
  }

  handleBookFilter = (books, filter) => {
    if (filter === "allBooks") {
      return (books)
    } else if (filter === "epub") {
      return (
        books.find(book => book.accessInfo.epub.isAvailable === true)
      )
    } else if (filter === "pdf") {
      return (
        books.find(book => book.accessInfo.pdf.isAvailable === true)
      )
    }
    else {
      throw new Error('There was a problem with the Book Type filter. Please try again later.')
    }
  }

  handlePrintFilter = (books, filter) => {
    if (filter === 'allPrint') {
      return (books)
    } else if (filter === 'book') {
      return (
        books.find(book => book.volumeInfo.printType === "BOOK")
      )
    } else if (filter === 'magazine') {
      return (
        books.volumeInfo.printType === 'MAGAZINE'
      )
    } else {
      throw new Error('There was a problem with the Print Type filter. Please try again later.')}
  }

  combineFilters = (printFilterArray, bookFilterArray) => {
    const filteredBooks = [];
    printFilterArray.forEach((e1)=>bookFilterArray.forEach((e2)=>
        {if(e1 === e2){
          filteredBooks.push(e1)
        }}
      )
    )
    return filteredBooks;
  }

  handleSubmit = (books) => {
    this.setState({
      books: books,
    })
  }

  render() {
    const printFilterArray = this.handlePrintFilter(
      this.state.books, this.state.printType);
    const bookFilterArray = this.handleBookFilter(
      this.state.books, this.state.bookType);
    const filteredBooks = printFilterArray
      ? this.combineFilters(printFilterArray, bookFilterArray)
      : this.state.books;
    const books = this.state.books
      ? <BookList books={filteredBooks} />
      : <div className="book-placeholder">Search for a book in the box above</div>
    const appError = this.state.error
      ? <div className="error-message">Error: {this.state.error}</div>
      : "";
    return (
      <main className='App'>
        <Header />
        <SearchForm handleSubmit={this.handleSubmit} />
        <FilterOptions 
          countries={this.state.books} 
          setPrintType={filter => this.setPrintType(filter)}
          setBookType={filter => this.setBookType(filter)}
          />
        {appError}
        {books}
      </main>
    )}
}

export default App;