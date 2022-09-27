import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Admin Site
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/admin/books/list" className="nav-link">
                                List Books
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/admin/books/create" className="nav-link">
                                Create Book
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/admin/category/list" className="nav-link">
                                List Categories
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/admin/category/create" className="nav-link">
                                Create Category
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/admin/author/list" className="nav-link">
                                List Author
                            </Link>
                        <Item>
                            <Link to="/admin/author/create" className="nav-link">
                                Create Author
                            </Link>
                        </Item>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links