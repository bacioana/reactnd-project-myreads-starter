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
    BooksAPI.getAll().then((books)=> {        
        this.setState({books})
      })
  }

  updateShelf = (book, shelf) => { 
    // BooksAPI.update(book.book,shelf).then((book)=>{
    //   window.location.reload()
    // })

    BooksAPI.update(book.book, shelf).then(() => {
      book.book.shelf = shelf        
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.book.id).concat(book.book)
      }))     
    })
  }

  
  
  render() {
    return (
      <BrowserRouter >
        <Switch>          
          <Route path="/" exact render={()=> (   
            <div>       
              <BookList 
                books={this.state.books.filter((book) => book.shelf === 'currentlyReading')}
                shelf='Currently Reading'
                onUpdate={(book,shelf)=>{
                  this.updateShelf(book,shelf)                  
                }}
                />
              <BookList 
                books={this.state.books.filter((book) => book.shelf === 'wantToRead')} 
                shelf='Want to Read'
                onUpdate={(book,shelf)=>{
                  this.updateShelf(book,shelf)                 
                  }}
                />
              <BookList 
                books={this.state.books.filter((book) => book.shelf === 'read')} 
                shelf='Read'
                onUpdate={(book,shelf)=>{
                  this.updateShelf(book,shelf)               
                }}
                /> 
            </div>
            
          )}/>
          <Route path="/search" render={() => (               
                <SearchBook 
                  listedBooks={this.state.books}
                  onUpdate={(book,shelf)=>{
                    this.updateShelf(book,shelf)                  
                  }}                               
                  />                                               
          )}/>  
        </Switch>      
      </BrowserRouter>
    )
  }
}

export default BooksApp
