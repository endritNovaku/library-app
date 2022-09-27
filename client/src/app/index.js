import React from 'react'
import { BrowserRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components'
import { BooksList, BooksInsert, BooksUpdate, CategoryList, CategoryInsert, CategoryUpdate, AuthorList, AuthorInsert, AuthorUpdate } from '../pages'
import { Home } from '../style/index'
import {Category} from '../style/category'
import Login from './Login'
import Protected from './Protected'
import Book from '../style/Book';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  let token = document.cookie.split(" ")
  function auth() {
    if (token[0]=== "admin" && token[1] === "password") {
      return true;
    }
  return false
  }

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/admin" exact element={<Protected isLoggedIn={auth()}><NavBar /></Protected>} />
          <Route path="/admin/books/list" exact element={<Protected isLoggedIn={auth()}><BooksList /></Protected>} />
          <Route path="/admin/books/create" exact element={<Protected isLoggedIn={auth()}><BooksInsert /></Protected>} />
          <Route path="/admin/books/update/:id" exact element={<Protected isLoggedIn={auth()}><BooksUpdate/></Protected>} />
          <Route path="/admin/category/list" exact element={<Protected isLoggedIn={auth()}><CategoryList /></Protected>} />
          <Route path="/admin/category/create" exact element={<Protected isLoggedIn={auth()}><CategoryInsert /></Protected>} />
          <Route path="admin/category/update/:id" exact element={<Protected isLoggedIn={auth()}><CategoryUpdate /></Protected>} />
          <Route path="/admin/author/list" exact element={<Protected isLoggedIn={auth()}><AuthorList /></Protected>} />
          <Route path="/admin/author/create" exact element={<Protected isLoggedIn={auth()}><AuthorInsert /></Protected>} />
          <Route path="/admin/author/update/:id" exact element={<Protected isLoggedIn={auth()}><AuthorUpdate /></Protected>} />
          <Route path="/" exact element={<Home />} />
          <Route path="/category/:category" exact element={<Category />} />
          <Route path="/:book" exact element={<Book />} />
          <Route path="/:id"  element={<Book /> } />
          <Route path="/login" exact element={<Login />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App