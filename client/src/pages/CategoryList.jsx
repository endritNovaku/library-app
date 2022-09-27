import React, { Component } from 'react'
import ReactTable from 'react-table-6'
import api from '../api'
import NavBar from '../components/NavBar'

import styled from 'styled-components'

import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateAuthor extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/admin/category/update/${this.props.id}`
    }
    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteAuthor extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (window.confirm(`Do you want to delete the category ${this.props.id} permanently?`)) {
            api.deleteCategoryById(this.props.id)
            window.location.reload();
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class CategoryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            books: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllCategories().then(books => {
            this.setState({
                books: books.data.data,
                isLoading: false,
            })
        })
    }

    render() {
        const { books, isLoading } = this.state
        console.log('TCL: BooksList -> render -> books', books)

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Category',
                accessor: 'category',
                filterable: true,
            },
            {
                Header: 'Books',
                accessor: 'books',
                filterable: true,
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteAuthor id={props.original._id} />
                        </span>
                    )
                }
            },
            {
                Header: '',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateAuthor id={props.original._id} />
                        </span>
                    )
                }
            }
        ]

        let showTable = true
        if (!books.length) {
            showTable = false
        }

        return (
            <Wrapper>
                <NavBar />
                {showTable && (
                    <ReactTable
                        data={books}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default CategoryList