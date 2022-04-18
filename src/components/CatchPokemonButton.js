/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import imgPokeball from '../assets/pokeball2.png';
import MyPokeContext from '../contexts/ContextMyPoke';
import Popup from './Popup';

const styleWrap = css({
    textAlign: 'center', 
    marginTop: '20px'
})

const stylePokeball = css({
    border: 'none',
    background: 'transparent',
    position: 'relative',
    display: 'inline-block',
    img: {
        maxWidth: '80px'
    },
    span:{
        position: 'absolute',
        width: '10px',
        height: '10px',
        borderRadius: '180px',
        // backgroundColor: 'red',
        left: '0px',
        right: '0px',
        marginLeft: 'auto',
        marginRight: 'auto',
        top: '0px',
        bottom: '0px',
        marginTop: 'auto',
        marginBottom: 'auto',
    }
})

const stylePokeBtnCatch = css({
    margin: '0 auto',
    display: 'block',
    padding: '10px 27px',
    borderRadius: '10px',
    boxShadow: '11px 11px 22px #d9d9d9, -11px -11px 22px #ffffff',
    background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    border: 'solid .1px #f1f1f1',
    fontWeight: '700',
    marginTop: '10px'
})

const roll = keyframes`
    0% {
        transform: translateX(100px) rotate(360deg);
    }
    30%{
        transform: translateX(0px) rotate(0deg);
    }
    33%, 53%, 80%, to {
        transform: translate3d(0,0,0);
    }
    40%, 43% {
        transform: translate3d(-30px, 0, 0) rotate(-90deg);
    }
    70% {
        transform: translate3d(15px, 0, 0) rotate(45deg);
    }
    90% {
        transform: translate3d(-4px,0,0) rotate(-10deg);
    }
    100%{
        transform: translate3d(0,0,0) rotate(0deg);
    }
`

const blinksuccess = keyframes`
    0%{background-color: rgba(0,0,0,0)}
    30%{background-color: rgba(255,0,0,100)}
    40%{background-color: rgba(255,0,0,0)}
    50%{background-color: rgba(255,0,0,100)}
    60%{background-color: rgba(255,0,0,0)}
    70%{background-color: rgba(255,0,0,100)}
    80%{background-color: rgba(0,255,0,100)}
`

const blinkFail = keyframes`
    0%{background-color: rgba(0,0,0,0)}
    30%{background-color: rgba(255,0,0,100)}
    40%{background-color: rgba(255,0,0,0)}
    50%{background-color: rgba(255,0,0,100)}
    60%{background-color: rgba(255,0,0,0)}
    70%{background-color: rgba(255,0,0,100)}
`

export default function CatchPokemonButton(props){
    let navigate = useNavigate();

    const {addMyPoke, myPoke} = useContext(MyPokeContext);
    const [animrun, setanimrun] = useState(null);

    const [errormsg, seterrormsg] = useState();

    const [showPopup, setshowPopup] = useState(false);

    const nicknameInput = useRef();

    function catchPoke(){
        var didIGetIt = Math.random() < 0.5;
        if(didIGetIt) {
            console.log("You got it!");
            setanimrun(blinksuccess);
        }
        else {
            console.log("nope")
            setanimrun(blinkFail);
        }
        
        // animation
        setTimeout(() => {
            if(didIGetIt) setshowPopup(true);
            setanimrun(null);
        }, 6000);
    }

    function savePoke(){
        if(!nicknameInput.current.value) seterrormsg('You have to give a nickname');
        else if(myPoke.find(a => a.nickname == nicknameInput.current.value)) seterrormsg('You already have a pokemon with this nickname');
        else {
            seterrormsg(null);
            var res = addMyPoke(props.pokemon, nicknameInput.current.value);
            setshowPopup(false);
            navigate('/MyPokemon');
        }
    }

    return(
        <React.Fragment>
            <div css={styleWrap}>
                <div css={animrun? css`${stylePokeball}; animation: ${roll} 6s ease` : stylePokeball}>
                    <img src={imgPokeball} alt=''/>
                    <span css={animrun? css`animation: ${animrun} 6s ease` : ''} />
                </div>
                <button css={stylePokeBtnCatch} onClick={catchPoke} disabled={animrun? true : false}>Catch Pokemon!</button>
            </div>
            
            {
                showPopup ?
                <Popup>
                    <div style={{textAlign: 'center'}}>
                        <h4>You Caught</h4>
                        <img src={props.pokemon?.sprites.front_default} />
                        <h2>{props.pokemon?.name}</h2>
                        <p>Go give it a name!</p>
                        <input ref={nicknameInput}/>
                        <p>{errormsg}</p>
                        <button onClick={savePoke}>Save to My Collection</button>
                    </div>
                </Popup> : null
            }
        </React.Fragment>
    );
}