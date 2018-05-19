import React from 'react'
// import * as BooksAPI from './BooksAPI'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'
import {Switch} from 'react-router-dom'
import BookList from './BookList'
import SearchBook from './SearchBook'

class BooksApp extends React.Component {
  state = {
    books :[]      
  }

  componentDidMount(){
    let db=[];
    BooksAPI.getAll().then((books)=> {
        db=books
        console.log(db)
        this.setState({books})
      })
  }

  
  render() {
    return (    

      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={()=> (   
            <div>       
              <BookList 
                books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                shelf='Currently Reading'
                />
              <BookList 
                books={this.state.books.filter((book) => book.shelf === 'wantToRead')} 
                shelf='Want to Read'
                />
              <BookList 
                books={this.state.books.filter((book) => book.shelf === 'read')} 
                shelf='Read'
                />  
            </div>
          )}/>

          <Route path="/search" render={() => (            
              <SearchBook 
                books={this.state.books}                   
                />                     
          )}/>  
        </Switch>      
      </BrowserRouter>
    )
  }
}

export default BooksApp
