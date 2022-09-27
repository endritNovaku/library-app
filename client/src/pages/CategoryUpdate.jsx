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

export default function CategoryUpdate (props) {
    const [category, setCategory] = useState();
    const { id } = useParams()

    const handleUpdateCategory = event => {
        const payload = new FormData()
        payload.append("category", category)
        api.updateAuthorById(id, payload).then(res => {
            window.alert("Category Updated Suceeded")
        })
        }
    return (
        <Wrapper>
            <NavBar />
            <Title>Update Category</Title>

            <Label>Category: </Label>
            <InputText
                type="text"
                onChange={event => {
                    const { value } = event.target
                    setCategory(value)
                }}
            />
            
            <Button onClick={handleUpdateCategory}>Update Category</Button>
            <CancelButton href={'/admin/category/list'}>Cancel</CancelButton>
        </Wrapper>
        )
}