import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class BookList extends Component {

	render() {	
		return(
			<div>			  	
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>
					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">{this.props.shelf}</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{this.props.books.map((book) => (
											<li key={book.title}>
												<div className="book">
													<div className="book-top">
														<div className="book-cover" style={{width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` }}></div>
														<div className="book-shelf-changer">
														  <select>
														    <option value="none" disabled>Move to...</option>
														    <option value="currentlyReading">Currently Reading</option>
														    <option value="wantToRead">Want to Read</option>
														    <option value="read">Read</option>
														    <option value="none">None</option>
														  </select>
														</div>
													</div>
													<div className="book-title">{book.title}</div>
													<div className="book-authors">{book.authors}</div>
												</div>
											</li>
										))}		                      
									</ol>
								</div>
							</div>		              
						</div>
					</div>		            
					<div className="open-search">
						<Link
							to='/search'
							>Add a book</Link>
					</div>						
				</div>
		  	</div>
		)          	
	}	
}

export default BookList