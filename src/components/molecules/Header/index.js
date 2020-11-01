import React from 'react';
import {Link} from 'react-router-dom'

function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor :'#121212'}}>
            <div className="container mt-3">
                <Link className="navbar-brand" to="/"><h4> <span  style={{color :'#F7D603'}}>Cari</span><span className="font-weight-bold">FILM</span> </h4></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto" >
                        <Link className="nav-item nav-link active" to="/">Home</Link>
                        <Link className="nav-item nav-link" to="/">menu1</Link>
                        <Link className="nav-item nav-link" to="/">menu2</Link>
                        <Link className="nav-item nav-link" to="/">menu3</Link>
                    </div>
                </div>
            </div>
        </nav>

    );
}

export default Header;