import React from 'react';
import './FilterOptions.css';

class FilterOptions extends React.Component {
    changePrintFilter = (value) => {
        if(value === "allPrint") {
            this.props.setPrintType("allPrint");
        } 
        else if(value === "book") {
            this.props.setPrintType('BOOK');
        }
        else if(value === "magazine") {
            // const isMagazine = this.props.books.find(book => book.volumeInfo.printType === "MAGAZINE");
            this.props.setPrintType("MAGAZINE");
        }
    }


    render() {
        return (
            <form className="filter-options">
                <label htmlFor="print-type">Print Type: </label>
                <select 
                    id="print-type"
                    name="print-type"
                    onChange={e => this.changePrintFilter(e.target.value)}>
                    <option value="allPrint">No filter</option>
                    <option value="book">Books</option>
                    <option value="magazine">Magazines</option>
                </select>
                <label htmlFor="book-type">  Book Type: </label>
                <select 
                    id="book-type"
                    name="book-type"
                    onChange={e => this.changeBookFilter(e.target.value)}>
                    <option value="allBooks">No Filter</option>
                    <option value="epub">e-Publication Available</option>
                    <option value="pdf">PDF Available</option>
                </select>
            </form>
        )
    }
}

export default FilterOptions;