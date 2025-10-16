import api from "./api";

export const fetchBooks = (search = "") => api.get(`/books${search ? `?search=${encodeURIComponent(search)}` : ''}`).then(r => r.data);
export const createBook = (payload) => api.post("/books", payload).then(r => r.data);
export const updateBook = (id, payload) => api.put(`/books/${id}`, payload);
export const deleteBook = (id) => api.delete(`/books/${id}`);
export const borrowBook = (bookId) => api.post(`/borrow/borrow/${bookId}`).then(r => r.data);
export const returnBorrow = (borrowId) => api.post(`/borrow/return/${borrowId}`).then(r => r.data);
export const myBorrows = () => api.get("/borrow/myborrows").then(r => r.data);
