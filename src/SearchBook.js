import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'

class SearchBook extends Component {
	state = {
	    query:''
  	}

  	updateQuery= (query) => {
		this.setState({
			query:query.trim()
		})
	}

	render () {

		const {books} = this.props
		const {query} = this.state

		let showingBooks
		if(query) {
			const match= new RegExp(escapeRegExp(this.state.query), 'i')
			showingBooks= books.filter((book) => match.test(book.name) || match.test(book.authors))
		} else {
			showingBooks= books
		}

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
					<ol className="books-grid"></ol>
				</div>
			</div>
		)
	}
}

export default SearchBook