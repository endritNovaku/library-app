import NavBar from '../components/NavBar'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
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

export default function AuthorUpdate (props) {
    const [name, setName] = useState();
    const [bio, setBio] = useState();
    const { id } = useParams()

    const handleUpdateAuthor = event => {
        const payload = new FormData()
        payload.append("name", name)
        payload.append("bio", bio)
        api.updateAuthorById(id, payload).then(res => {
            window.alert("Author Updated Suceeded")
        }).catch(err => {
            window.alert(err)
        })
        }
    return (
        <Wrapper>
            <NavBar />
            <Title>Update Book</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                onChange={event => {
                    const { value } = event.target
                    setName(value)
                }}
            />

            <Label>Bio: </Label>
            <InputText
                type="text"
                onChange={event => {
                    const { value } = event.target
                    setBio(value)
                }}
            />

            

            <Button onClick={handleUpdateAuthor}>Update Author</Button>
            <CancelButton href={'/admin/author/list'}>Cancel</CancelButton>
        </Wrapper>
        )
}