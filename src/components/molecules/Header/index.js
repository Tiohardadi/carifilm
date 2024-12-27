import React from 'react';
import { Link } from 'react-router-dom';
import Search from '../Search';

function Header() {
  return (
    <nav className="navbar navbar-dark fixed-top" style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <h4 className="mb-0">
            <span style={{ color: '#FCA311' }}>Cari</span>
            <span style={{ color: '#FFFFFF' }}>FILM</span>
          </h4>
        </Link>
        
        <Search />
      </div>
    </nav>
  );
}

export default Header;

