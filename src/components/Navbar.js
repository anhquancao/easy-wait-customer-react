import React, {Component} from 'react';
import {Link} from "react-router-dom";
import style from "../styles/Navbar.css";
import {observer} from 'mobx-react';

@observer
class Navbar extends Component {
    authStore = this.props.authStore;

    signOut = () => {
        this.authStore.signOut();
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className={"collapse navbar-collapse " + style.NavbarButtons} id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                    </ul>
                    {
                        this.authStore.isSignedIn ? (
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                       data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {this.authStore.user.name}
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="#">Action</a>
                                        <a className="dropdown-item" href="#">Another action</a>
                                        <div className="dropdown-divider"/>
                                        <a className="dropdown-item" onClick={this.signOut}>Sign out</a>
                                    </div>
                                </li>
                            </ul>
                        ) : (
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sign-in">Sign in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/sign-up">Sign up</Link>
                                </li>
                            </ul>
                        )
                    }

                </div>
            </nav>
        );
    }
}

export default Navbar;
