import React, { Component } from 'react';
import Book from './Book';

class BookShelf extends Component{
    render(){
        const {title, bookList} = this.props;
      	if(bookList && bookList.length>=1){
          return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books"> 
                    <ol className="books-grid">
                    {bookList.map( 
                      (book) => ( <li key={book.id}> <Book book={book} handleChangeCategory={this.props.handleChangeCategory}/></li>)
                    )} 
                    </ol>
                  </div>
            </div>
        );
        }else{
          return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
            </div>
        );
        }
    }

};


export default BookShelf;