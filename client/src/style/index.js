/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './style.css';
import api from '../api';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
        }
    }

    render() {
        return (
            <div className="app">
                <Navbar />
                <Library />
            </div>
        )
    }
}

class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
      return(
        <div id="navbar">
            <Buttons />
            <a href="/" id="link"><h3>Home</h3></a>
            <Search />
        </div>
      )
    }
  }

  class Buttons extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        category: [],
        isLoading: false
      }
      }

      componentDidMount = async () => {
        this.setState({isLoading: true});
        await api.getAllCategories().then(categories => {
            this.setState({
                category: categories.data.data,
                isLoading: false,
            })
        })
      }

      
      render() {
        function cat(link, name) {
            return(<li><a id="categories" href={link}><h3>{name}</h3></a></li>)
        }
        let category = []
        for (let i = 0; i < this.state.category.length; i++) {
            category.push(cat("/category/" + this.state.category[i].category, this.state.category[i].category))
        }

    return(
      <div className="buttons">
        <input type="checkbox" id="check"/>
        <label for="check" className="checkbtn">
          <div className="categoryLogo"></div>
          <div className="categoryLogo"></div>
          <div className="categoryLogo"></div>
        </label>
        <ul>
          <label for="check">
            {category}
      </label>
      </ul>
      </div>

    )
      }
    }

    class Search extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            input: ""
          }
        }
        handleChange(event) {
          this.setState({
            input: event.target.value
          })
        }
        render() {
          return(
            <div>
              <input className="src" value = {this.state.input} onChange = {this.handleChange.bind(this)}/>
              <SearchResult output={this.state.input}/>
            </div>
          )
        }
      }
 
      class SearchResult extends React.Component {
        constructor(props) {
          super(props)
          this.state = {
            library: [],
            isLoading: false
          }
        }

        componentDidMount = async () => {
            this.setState({ isLoading: true })
                await api.getAllBooks().then(books => {
                    this.setState({
                        library: books.data.data,
                        isLoading: false,
                    })
            })
        }
        render() {
          function searchLib(link,src, alt, title, category, author) {
            const categories = category.map(e => <p className="category">{e}</p>)
            return (
              <div className="srcAnim">
                <a href={link}>
              <img id="theImg" src={src} alt={alt} />
              </a>
              <div>
              <h3 className="title" style={{paddingRight:30}}>{title}</h3>
              <div className="categories">
                {categories}
              </div>
              <p>{author}</p>
              </div>
              </div>
            )
          }
          var display = []
          for(let i in this.state.library) {
            if(this.props.output === "") {return display;}
            else if (this.state.library[i].name.toLowerCase().search(this.props.output.toLowerCase()) >= 0) {
            display.push(searchLib("/" + this.state.library[i]._id, this.state.library[i].img, "image",
            this.state.library[i].name, this.state.library[i].category, this.state.library[i].author))
          }   
          }
          
          return(
            <div className="searchOutput">
              <p style={{display: "none"}}>{this.props.output}</p>
              {display}
            </div>
          )
        }
      }

    class Library extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        library: [],
        isLoading: false
      }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
            await api.getAllBooks().then(books => {
                this.setState({
                    library: books.data.data,
                    isLoading: false,
                })
        })
    }
    render(){
      function libraryStructure(link, src, alt, title, cat, author) {
        
        const categories = cat.map(event => {return <p className="category">{event}</p>})
        return(<div className="anime">
          <a href={link} id="link">
          <img id="libImg" src={src} alt={alt} />
          <div className="categories">
            {categories}
          </div>
          <h4 className="title">{title}</h4>
          <p className="author">{author}</p>
          </a>
        </div>)
      }

      let home = []

    if (!this.props.type){
        for(let i in this.state.library) {
            home.push(libraryStructure("/" + this.state.library[i]._id, this.state.library[i].img, "a image",
            this.state.library[i].name, this.state.library[i].category, this.state.library[i].author))
        }
    } else {
        for(let i in this.state.library) {
            for (let j in this.state.library[i].category) {
                if (this.state.library[i].category[j] == this.props.type) {
                    home.push(libraryStructure("/" + this.state.library[i]._id, this.state.library[i].img, "a image",
                    this.state.library[i].name, this.state.library[i].category, this.state.library[i].author))
                }
            }
        }
    }
        return(
          <div id="bg">
            <div id="library">
              {home}
              <p style={{display: "none"}}>{this.props.type}</p>
            </div>
          </div>
        )
    }
  }

  export { Home, Navbar, Library }