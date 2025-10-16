import React, { useState } from "react";
import { createBook } from "../services/books";

export default function BookForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [totalCopies, setTotalCopies] = useState(1);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createBook({
        title, author, isbn, year: year ? parseInt(year) : null,
        description, totalCopies, copiesAvailable: totalCopies
      });
      setTitle(""); setAuthor(""); setIsbn(""); setYear(""); setDescription(""); setTotalCopies(1);
      alert("Book created");
      if (onCreated) onCreated();
    } catch (err) {
      alert(err?.response?.data || "Error creating book");
    }
  };

  return (
    <form onSubmit={submit}>
      <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
      <input className="input" placeholder="Author" value={author} onChange={e=>setAuthor(e.target.value)} />
      <input className="input" placeholder="ISBN" value={isbn} onChange={e=>setIsbn(e.target.value)} />
      <input className="input" placeholder="Year" value={year} onChange={e=>setYear(e.target.value)} />
      <textarea className="input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <input className="input" type="number" min="1" value={totalCopies} onChange={e=>setTotalCopies(parseInt(e.target.value||"1"))} />
      <div style={{marginTop:8}}>
        <button className="btn btn-primary" type="submit">Create Book</button>
      </div>
    </form>
  );
}
