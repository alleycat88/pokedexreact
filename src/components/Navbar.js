/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React from 'react';
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';

const styleNavbar = css({
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100vw',
    backgroundColor: 'white',
    height: '60px',
    zIndex: '10',
    display: 'flex',
    justifyContent: 'space-around',
    boxShadow: '0px 0px 30px #d9d9d9',
    padding: '10px 0px',
})

const styleNavbarIcon = css({
    textAlign: 'center',
    img:{
        maxHeight: '43px',
    },
    p:{
        fontSize: '13px',
        margin: 0,
        color: 'grey'
    },
})

const styleNavbarIconActive = css({
    textAlign: 'center',
    img:{
        maxHeight: '43px',
    },
    p:{
        fontSize: '13px',
        margin: 0,
    },
})

export default function NavBar(){
    return(
        <React.Fragment>
            <Outlet/>
            <div css={styleNavbar}>
                <Link to={'/'} css={styleNavbarIcon}>
                    <img src="http://via.placeholder.com/100x100"/>
                    <p>Pokedex</p>
                </Link>
                <Link to={'/MyPokemon'} css={styleNavbarIcon}>
                    <img src="http://via.placeholder.com/100x100"/>
                    <p>My Pokemon</p>
                </Link>
            </div>
        </React.Fragment>
    );
} 