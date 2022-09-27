import { Navbar } from './index'
import api from '../api'
import React from 'react'
import "./book.css"




class Book extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        url: window.location.href.replace("http://localhost:3000/", ""),
        library: {},
        categories: [],
        isLoading: false
      }
    }

    componentDidMount = async () => {
      this.setState({ isLoading: true })
          await api.getBookById(this.state.url).then(book => {
              this.setState({
                  library: book.data.data,
                  categories: book.data.data.category,
                  isLoading: false,
              })
      })
  }

  render() {
    let cat = this.state.categories.map(e => {return (<p id="cat">{e}</p>)})
    return(
        <div id="book">
          <Navbar />
          <div id="content">
        <div id="imgDiv">
        <img src={this.state.library.img} alt="book" />
        </div>
        <div id="description">
            <h2>{this.state.library.name}</h2>
            <h3>{this.state.library.author}</h3>
            <p>{this.state.library.description}</p>
          </div>
          <div id="categories">
            {cat}
          </div>
      </div>
        </div>
      )
  }
}

export default Book;