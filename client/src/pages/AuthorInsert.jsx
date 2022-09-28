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

class AuthorInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            bio: '',
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputBio = async event => {
        const bio = event.target.value
        this.setState({ bio })
    }

    handleIncludeAuthor = async () => {
        const { name, bio } = this.state
        const payload = { name, bio }

        await api.InsertAuthor(payload).then(res => {
            window.alert(`Author inserted successfully`)
            this.setState({
                name: '',
                bio: '',
            })
        }).catch(err => {
            window.alert(err)
        })
    }

    render() {
        const { name, bio } = this.state
        return (
            <Wrapper>
                <NavBar/>
                <Title>Create Author</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Biography: </Label>
                <InputText
                    type="text"
                    value={bio}
                    onChange={this.handleChangeInputBio}
                />

                <Button onClick={this.handleIncludeAuthor}>Add Author</Button>
                <CancelButton href={'/admin/author/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}
export default AuthorInsert