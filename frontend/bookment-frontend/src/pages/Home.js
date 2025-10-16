import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const nav = useNavigate();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ title: true, author: false, genre: false, description: false });

  const toggle = (key) => setFilters(prev => ({ ...prev, [key]: !prev[key] }));

  const doSearch = (e) => {
    e.preventDefault();
    const fields = Object.keys(filters).filter(k => filters[k]);
    console.log('Search', { query, fields });
    alert(`Searching for "${query}" in: ${fields.join(', ')}`);
    // nav(`/search?q=${encodeURIComponent(query)}&f=${fields.join(',')}`);
  };

  return (
    <div className="container" style={{paddingTop:24}}>
      <div className="hero">
        <div className="content">
          <h1>Welcome to BookMent 📚</h1>
          <p>Your simplified book management system.</p>

          <div className="actions">
            <button className="btn btn-primary" onClick={() => nav('/login')}>Sign in</button>
            <button className="btn" onClick={() => nav('/login')}>Sign up</button>
          </div>

          <div style={{marginTop:16}} className="search-card">
            <form onSubmit={doSearch} style={{display:'flex', flexDirection:'column', gap:12}}>
              <div style={{display:'flex', gap:8}}>
                <input
                  className="search-input"
                  placeholder="Search books, e.g. 'Harry Potter'"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">Search</button>
              </div>

              <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
                <label className={`pill ${filters.title ? 'active' : ''}`} onClick={() => toggle('title')}>
                  <input type="checkbox" checked={filters.title} readOnly /> Title
                </label>
                <label className={`pill ${filters.author ? 'active' : ''}`} onClick={() => toggle('author')}>
                  <input type="checkbox" checked={filters.author} readOnly /> Author
                </label>
                <label className={`pill ${filters.genre ? 'active' : ''}`} onClick={() => toggle('genre')}>
                  <input type="checkbox" checked={filters.genre} readOnly /> Genre
                </label>
                <label className={`pill ${filters.description ? 'active' : ''}`} onClick={() => toggle('description')}>
                  <input type="checkbox" checked={filters.description} readOnly /> Description
                </label>
              </div>
            </form>
          </div>
        </div>

        <div className="hero-illustration">
          <div>
            <strong>Find. Borrow. Read.</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
