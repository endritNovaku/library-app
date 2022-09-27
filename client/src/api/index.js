import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5000',
})

//Books Api
export const InsertBook = payload => api.post(`/api/book`, payload)
export const getAllBooks = () => api.get(`/api/books`)
export const updateBookById = (id, payload) => api.put(`/api/book/${id}`, payload)
export const deleteBookById = id => api.delete(`/api/book/${id}`)
export const getBookById = id => api.get(`/api/book/${id}`)

// Category api
export const InsertCategory = payload => api.post(`/api/category`, payload)
export const getAllCategories = () => api.get(`/api/category`)
export const updateCategoryById = (id, payload) => api.put(`/api/category/${id}`, payload)
export const deleteCategoryById = id => api.delete(`/api/category/${id}`)
export const getCategoryById = id => api.get(`/api/category/${id}`)

// Author api
export const InsertAuthor = payload => api.post(`/api/author`, payload)
export const getAllAuthors = () => api.get(`/api/author`)
export const updateAuthorById = (id, payload) => api.put(`/api/author/${id}`, payload)
export const deleteAuthorById = id => api.delete(`/api/author/${id}`)
export const getAuthorById = id => api.get(`/api/author/${id}`)

const apis = {
    InsertBook,
    getAllBooks,
    updateBookById,
    deleteBookById,
    getBookById,
    InsertCategory,
    getAllCategories,
    updateCategoryById,
    deleteCategoryById,
    getCategoryById,
    InsertAuthor,
    getAllAuthors,
    updateAuthorById,
    deleteAuthorById,
    getAuthorById,
}

export default apis