import NavBar from '../components/NavBar'
import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class CategoryInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: '',
        }
    }

    handleChangeInputCategory = async event => {
        const category = event.target.value
        this.setState({ category })
    }

    handleIncludeCategory = async () => {
        const { category } = this.state
        const payload = { category }

        await api.InsertCategory(payload).then(res => {
            window.alert(`Category inserted successfully`)
            this.setState({
                category: '',
            })
        })
    }

    render() {
        const { category } = this.state
        return (
            <Wrapper>
                <NavBar/>
                <Title>Create Category</Title>

                <Label>Category Name: </Label>
                <InputText
                    type="text"
                    value={category}
                    onChange={this.handleChangeInputCategory}
                />

                <Button onClick={this.handleIncludeCategory}>Add Category</Button>
                <CancelButton href={'/admin/category/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default CategoryInsert