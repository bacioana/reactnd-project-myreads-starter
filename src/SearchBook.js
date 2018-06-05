import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
	state = {
	    query:'',
	    books:[]
  	}

  	updateQuery= (query) => {
		this.setState({
			query:query.trim()
		})	
		if(query.length>0){
			this.searchBook(query)
		} else {
			this.setState({books:[]})
		}
	}

	searchBook = (query) => {
	    BooksAPI.search(query).then((data)=>{
	    	if(data.length>0){
	    		let newArr=[]
		    	data.map((book)=>{
		    		let al='false'
		    		this.props.listedBooks.map((listedBook)=>{
		    			if(book.id===listedBook.id){
		    				book.shelf=listedBook.shelf
		    				newArr.push(book)	
		    				al='true'    					    				
		    			}	    			
		    		})
		    		if(al==='false'){
	    				book.shelf='none'
	    				newArr.push(book)
	    			}
		    	})
		    	this.setState({books:newArr})
	    	}	    	
    			    		    		    	   		    	
	    })	    
  	}

	render () {		
		return (				
			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to='/'
						className='close-search'
						>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							placeholder="Search by title or author" 
							value={this.state.query}
							onChange={(event) => this.updateQuery(event.target.value)}
							/>
					</div>
				</div>			
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.books.length > 0 &&(
							<div>
								{this.state.books.map((book) => (
									<li key={book.id}>
										<div className="book">
											<div className="book-top">
												{book.hasOwnProperty('imageLinks') && (
													<div className="book-cover" style={{width: 128, height: 193, backgroundImage:`url(${book.imageLinks.thumbnail})`}}></div>
												)}												
												<div className="book-shelf-changer">
												  <select value={book.shelf} onChange={(e) =>{														  	
													  	let shelf=e.target.value
													  	this.props.onUpdate({book},shelf)
													  }}>
												    <option value="moveTo" disabled>Move to...</option>
												    <option value="currentlyReading">Currently Reading</option>
												    <option value="wantToRead">Want to Read</option>
												    <option value="read">Read</option>
												    <option value="none">None</option>
												  </select>
												</div>
											</div>
											<div className="book-title">{book.title}</div>
											{book.hasOwnProperty('authors') && (
												<div className="book-authors">{book.authors}</div>
											)}
											
										</div>
									</li>
								))}
							</div>							
						)}								
					</ol>
				</div>				
			</div>
		)
	}
}

export default SearchBook