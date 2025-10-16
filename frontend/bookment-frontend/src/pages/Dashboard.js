import React, { useEffect, useState } from "react";
import { fetchBooks, borrowBook } from "../services/books";
import BookForm from "../components/BookForm";
import { myBorrows } from "../services/books";

export default function Dashboard(){
  const [books, setBooks] = useState([]);
  const [borrows, setBorrows] = useState([]);

  useEffect(()=> load(), []);

  const load = async () => {
    const b = await fetchBooks();
    setBooks(b);
    try { const mb = await myBorrows(); setBorrows(mb); } catch(e) { setBorrows([]); }
  };

  const handleBorrow = async (id) => {
    try {
      await borrowBook(id);
      alert("Borrowed!");
      load();
    } catch (err) {
      alert(err?.response?.data || "Error borrowing");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{display:"flex", gap:16}}>
        <div style={{flex:2}}>
          <div className="card">
            <h3>Books</h3>
            <div className="grid">
              {books.map(b=> (
                <div className="card" key={b.id}>
                  <h4>{b.title}</h4>
                  <div className="small">{b.author} • {b.year}</div>
                  <div style={{marginTop:8}}>{b.description}</div>
                  <div style={{marginTop:8, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                    <div className="small">Available: {b.copiesAvailable}</div>
                    <button className="btn btn-primary" disabled={b.copiesAvailable<=0} onClick={()=>handleBorrow(b.id)}>Borrow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{flex:1}}>
          <div className="card">
            <h3>Add Book</h3>
            <BookForm onCreated={load} />
          </div>

          <div style={{marginTop:12}} className="card">
            <h3>My Borrows</h3>
            {borrows.length === 0 ? <div className="small">No borrows</div> :
              borrows.map(b => (
                <div key={b.id} style={{marginBottom:8}}>
                  <div><strong>{b.book?.title}</strong></div>
                  <div className="small">Borrowed: {new Date(b.borrowedAt).toLocaleDateString()}</div>
                  <div className="small">Due: {new Date(b.dueAt).toLocaleDateString()}</div>
                  <div className="small">Returned: {b.returnedAt ? new Date(b.returnedAt).toLocaleDateString() : "No"}</div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
