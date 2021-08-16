import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link, Route, Switch } from 'react-router-dom'
import BookShelf from './BookShelf';
import NoMatchPage from './NoMatchPage';

class BooksApp extends React.Component {
  state = {
    query: '',
    searchResults: [],
    allBooks : [],
    currentlyReading :[],
    wantToRead :[], 
    read :[]
  }

  assignBooksToCategories = (books, category) => { 
    return books.filter( book => book.shelf === category)
  };  

  getDataFromAPI = () => {
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        allBooks: books,
        currentlyReading : this.assignBooksToCategories(books, 'currentlyReading'),
        wantToRead : this.assignBooksToCategories(books, 'wantToRead'),
        read : this.assignBooksToCategories(books, 'read'),
      }))
    })
  }
	
  getDataForSearch = (query) => {
    BooksAPI.search(query)
    .then((results)=>{
        const newArr = (results && results.length>0) ?  results.map((book) => {
          book.shelf = 'none';
          this.state.allBooks.map( (b) => {
            if(b.id === book.id){
             book.shelf = b.shelf;
            }
            return b;
          })
        return book;
      	}) : [];
        this.setState( () => ({
            searchResults: newArr
         }))
    })
}
  
  handleChangeCategory = (book, newCategory) => {
    BooksAPI.update(book, newCategory)
    .then( () => {
      this.getDataFromAPI();
    })
  }

  componentDidMount() {
    this.getDataFromAPI();
  }
	
  updateQuery = (query) => {
    this.setState( () => ({
      query:query.trim()
    }));
    this.getDataForSearch(query);
  }
  
  resetSearch = () => {
    this.setState( () => ({
      query:'',
      searchResults:[]
    }));
  }
  
  render() {
    console.log('searchResults',this.state.searchResults)
    return (
      <div className="app">
      <Switch>
        <Route exact path='/' 
          render={ () => (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf title='Currently Reading' bookList={this.state.currentlyReading} 
                          handleChangeCategory={this.handleChangeCategory}/>
                    <BookShelf title='Want to Read' bookList={this.state.wantToRead}
                          handleChangeCategory={this.handleChangeCategory}/>
                    <BookShelf title='Read' bookList={this.state.read} handleChangeCategory={this.handleChangeCategory}/>
                  </div>
                </div>
                <div className="open-search">
                      <Link to='/search' onClick={this.resetSearch}>Add a book</Link>
                </div>
              </div>)
          }
        />
        <Route path='/search' 
          render={ () => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                   <input type="text"
                       placeholder="Search by title or author"
                      value={this.state.text}
                      onChange={(event) => this.updateQuery(event.target.value)}
                      />
                </div>
              </div>
              { (this.state.searchResults && this.state.searchResults.length >1 )&& 
                   <div className="search-books-results">
                      <BookShelf title='Search Results' bookList={this.state.searchResults} 
                          handleChangeCategory={this.handleChangeCategory}/>
                  </div>
              }
            </div>
          )}
        />
      <Route component={NoMatchPage}/>
     </Switch>
	</div>)
	}
}

export default BooksApp
