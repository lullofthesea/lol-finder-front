import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { setLoadStateTrue, setLoadStateFalse } from '../redux/app';
import Kindred_pixel from '../assets/custom/Kindred_pixel.png';
import Kindred_sf_pixel from '../assets/custom/Kindred_sf_pixel.png';

import './styles/NavBar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.location = props.location;
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.hideNav = this.hideNav.bind(this);
        this.updateNav = this.updateNav.bind(this);

        // Not sure if I really want to use redux for these
        this.nav = null;
        this.body = null;
        this.navbar = null;
        this.footer = null;
        this.button = null;
    }

    componentDidMount() {
        const nav = document.getElementById('mobile-nav');
        const body = document.querySelector('.body-content');
        const navbar = document.querySelector('.mobile-nav-container');
        const footer = document.getElementById('footer-container');
        const button = document.querySelector('.mobile-button-nav');

        if (nav && body && navbar && footer && button) {
            this.nav = nav;
            this.body = body;
            this.navbar = navbar;
            this.footer = footer;
            this.button = button;
        }

        document.addEventListener('mousedown', this.hideNav);
        window.addEventListener('orientationchange', () => {
            if (this.button.classList.contains('mobile-button-nav-active')) {
                this.updateNav();
            }
        })
    }

    componentDidUpdate() {
        // wait for elements to load
        const body = document.querySelector('.body-content');

        if (body !== this.body) this.body = body;

        window.addEventListener('resize', () => {
            if (window.innerWidth > 960) {
                this.nav.style.width = '0';
                this.body.style.right = '0';
                this.navbar.style.marginRight = '0';
                this.footer.style.right = '0';
                return;
            }
        })
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.hideNav);
        window.removeEventListener('resize', this.hideNav);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    hideNav(event) {
        if (this.button) {
            if (
                (
                    this.wrapperRef &&
                    !this.wrapperRef.contains(event.target) &&
                    this.button.classList.contains('mobile-button-nav-active')
                ) ||
                event.target.classList.contains('mobile-button-home')
            ) {
                this.button.classList.remove('mobile-button-nav-active');
                this.nav.style.width = '0';
                this.body.style.right = '0';
                this.navbar.style.marginRight = '0';
                this.footer.style.right = '0';
                return;
            }
        }
    }

    updateNav() {
        if (!this.button.classList.contains('mobile-button-nav-active')) { // Show nav
            this.button.classList.add('mobile-button-nav-active');
            if (window.matchMedia("(orientation: landscape)").matches) {
                this.nav.style.width = '35%';
                this.body.style.right = '35%';
                this.navbar.style.marginRight = '35%';
                this.footer.style.right = '35%';
                console.log(this.body)
                return;
            }
            this.nav.style.width = '50%';
            this.body.style.right = '50%';
            this.navbar.style.marginRight = '50%';
            this.footer.style.right = '50%';
            return;
        } else { // Hide Nav
            this.button.classList.remove('mobile-button-nav-active');
            this.nav.style.width = '0';
            this.body.style.right = '0';
            this.navbar.style.marginRight = '0';
            this.footer.style.right = '0';
            return;
        }
    }

    render() {
        return (
            <>
                <div className='navbar-container' ref={this.setWrapperRef}>
                    <nav className='navbar'>
                        <NavLink exact to='/'
                            className='nav-link-home'
                            activeClassName='nav-link-active'>
                            LoL Finder
                        </NavLink>
                        <div className='nav-link-seperator'></div>
                        <img src={Kindred_sf_pixel} className='logo-kindred' alt='hi' />
                        <NavLink to='/search'
                            className='nav-link-search'
                            activeClassName='nav-link-active'>
                            Search
                        </NavLink>
                        <NavLink to='/rotation'
                            className='nav-link-rotation'
                            activeClassName='nav-link-active'>
                            Rotation
                        </NavLink>
                        <NavLink exact to='/about'
                            className='nav-link-about'
                            activeClassName='nav-link-active'>
                            About
                        </NavLink>
                    </nav>
                    <div className='mobile-nav-container'>
                        <nav id='mobile-nav'>
                            <img src={Kindred_pixel} className='logo-mobile-kindred' alt='hi' />
                            <NavLink exact to='/'
                                className='nav-link-home'
                                activeClassName='nav-link-active'
                                onClick={this.updateNav}
                            >
                                Home
                            </NavLink>
                            <NavLink to='/search'
                                className='nav-link-search'
                                activeClassName='nav-link-active'
                                onClick={this.updateNav}
                            >
                                Search
                            </NavLink>
                            <NavLink to='/rotation'
                                className='nav-link-rotation'
                                activeClassName='nav-link-active'
                                onClick={this.updateNav}
                            >
                                Rotation
                            </NavLink>
                            <NavLink exact to='/about'
                                className='nav-link-about'
                                activeClassName='nav-link-active'
                                onClick={this.updateNav}
                            >
                                About
                            </NavLink>
                        </nav>
                        <div className='mobile-nav-bar'>
                            <NavLink exact to='/'
                                className='mobile-button-home'
                                activeClassName='nav-link-active'
                                onClick={this.hideNav}
                            >
                                LoL Finder
                            </NavLink>
                            <button className='mobile-button-nav' onClick={this.updateNav}>
                                <i className='fa fa-bars'></i>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.app.loading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setLoadStateFalse: () => dispatch(setLoadStateFalse()),
        setLoadStateTrue: () => dispatch(setLoadStateTrue())
    };
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(
    NavBar
));