import React from 'react';
import './SearchForm.css';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ""
        }
    }

    queryChanged = (newQuery) => {
        this.setState({
            query: newQuery
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit button was clicked')
        const query = this.state.query;
        const url = `https://www.googleapis.com/books/v1/volumes?q=` + query;
        const options = {
          method: 'GET',
        }
        fetch(url, options)
          .then(response => {
            if(!response.ok) {
              throw new Error('Something went wrong in the Search Form. Please try again later.');
            }
            return response;
          })
          .then(response => response.json())
          .then(data => {
            this.setState({
              query: ""
            })
            console.log(data.items)
            this.props.handleSubmit(data.items)
          })
          .catch(err => {
            this.setState({
              error: err.message
            })
          });
    }

    render() {
        const error = this.state.error
            ? <div className="error">{this.state.error} </div>
            : "";

        return (
            <form 
                className="search-form" 
                onSubmit={e => this.handleSubmit(e)}>
                {error}
                <label htmlFor="search-box">Search: </label>
                <input 
                    type="text" 
                    name="search-box"
                    id="search-box"
                    placeholder="Search for a book"
                    value={this.state.query}
                    onChange={e => this.queryChanged(e.target.value)} />
                <button type="submit">Search</button>
            </form>
        )
    }
}

export default SearchForm;