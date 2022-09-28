import React,  {useState, useEffect} from 'react'
import api from '../api'
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar'
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

export default function BooksUpdate (props) {
    const [img, setImg] = useState();
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const [category, setCategory] = useState();
    const [author, setAuthor] = useState();
    const { id } = useParams()
    
    const handleUpdateBook = event => {
        const payload = new FormData()
        payload.append("img", img)
        payload.append("name", name)
        payload.append("description", description)
        payload.append("category", category)
        payload.append("author", author)
        api.updateBookById(id, payload).then(res => {
            window.alert("Book Updated Suceeded")
        }).catch(err => {
            window.alert(err);
        })
        }
        
        useEffect(() => {
            // Your code here
            async function book() {
                const book = await api.getBookById(id)
                setName(book.data.data.name)
                setDescription(book.data.data.description)
                setAuthor(book.data.data.author)
                setCategory(book.data.data.category)
            }
            book()
            
          }, []);

    return (
        <Wrapper>
            <NavBar />
            <Title>Update Book</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={name}
                onChange={event => {
                    const { value } = event.target
                    setName(value)
                }}
            />

            <Label>Author: </Label>
            <InputText
                type="text"
                value={author}
                onChange={event => {
                    const { value } = event.target
                    setAuthor(value)
                }}
            />

            <Label>Description: </Label>
            <InputText
                type="text"
                value={description}
                onChange={event => {
                    const { value } = event.target
                    setDescription(value)
                }}
            />

            <Label>Category: </Label>
            <InputText
                type="text"
                value={category}
                onChange={event => {
                    const { value } = event.target
                    setCategory(value.split(" "))
                }}
            />

            <Label>File: </Label>
            <InputText
                type="file"
                onChange={event => {
                    const file = event.target.files[0];
                    setImg(file)
                }}
                accept=".jpg"
            />

            <Button onClick={handleUpdateBook}>Update Book</Button>
            <CancelButton href={'/admin/books/list'}>Cancel</CancelButton>
        </Wrapper>
        )
}