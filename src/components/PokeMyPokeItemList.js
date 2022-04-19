/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useContext, useState } from 'react';
import iconTrash from '../assets/trash.png';
import MyPokeContext from '../contexts/ContextMyPoke';
import Popup from './Popup';

const styleMyPoke = css({
    borderRadius: '12px',
    background: 'white',
    boxShadow: '11px 11px 22px #d9d9d9, -11px -11px 22px #ffffff',
    width: '300px',
    height: '100px',
    border: 'solid 0.1px #f1f1f1',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
})

const styleMyPokeImg = css({
    boxShadow: '8px 8px 16px #d9d9d9, -8px -8px 16px #ffffff',
    borderRadius: '12px',
    width: '100px',
    height: '100px',
})

const styleMyPokeDet = css({
    width: '170px'
})

const styleMyPokeDetNickname = css({
    fontWeight: '700',
    marginTop: 0,
    marginBottom: '5px',
})

const styleMyPokeDetSpecies = css({
    marginTop: 0,
    marginBottom: '5px',
    color: 'grey',
    fontSize: '.9em',
    span:{
        fontWeight: '700', textTransform: 'capitalize'
    }
})

const styleReleaseBtn = css({
    position: 'absolute',
    top: '7px',
    right: '7px',
    borderRadius: '180px',
    background: 'white',
    boxShadow:  '4px 4px 8px #d9d9d9, -4px -4px 8px #ffffff',
    border: 'none',
    padding: '0px',
    height: '32px',
    width: '32px'
})

const stylePopupDelete = css({
    textAlign: 'center',
    img: {
        width: '150px',
        borderRadius: '180px',
        background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
        boxShadow:  '15px 15px 30px #d9d9d9, -15px -15px 30px #ffffff',
        border: 'solid .1px #f1f1f1',
        padding: '10px'
    },
    h3:{
        textTransform: 'capitalize',
        margin: '10px'
    },
    div:{
        display: 'flex',
        marginTop: '20px',
        justifyContent: 'space-evenly',
        button: {
            minWidth: '100px',
            padding: '10px 27px',
            borderRadius: '10px',
            boxShadow: '5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff',
            background: '#ffffff',
            border: 'none',
        }
    }
})

export default function PokeMyPokeItemList(props){
    const {deleteMyPoke} = useContext(MyPokeContext);

    const [showPopupDelete, setshowPopupDelete] = useState(false);

    return(
        <React.Fragment>
            <div css={styleMyPoke}>
                <img css={styleMyPokeImg} src={props.poke.sprites.front_default}/>
                <div css={styleMyPokeDet}>
                    <p css={styleMyPokeDetNickname}>{props.poke.nickname}</p>
                    <p css={styleMyPokeDetSpecies}>Species : <span>{props.poke.name}</span></p>
                </div>
                <button onClick={() => {setshowPopupDelete(true)}} css={styleReleaseBtn}><img src={iconTrash} alt='' /></button>
            </div>
            {
                showPopupDelete ?
                <Popup>
                    <div css={stylePopupDelete}>
                        <h4>Release this Pokemon?</h4>
                        <img src={props.poke.sprites.front_default} alt={props.poke.nickname}/>
                        <h3>{props.poke.nickname}</h3>
                        <div>
                            <button onClick={() => {setshowPopupDelete(false)}}>Cancel</button>
                            <button onClick={() => {deleteMyPoke(props.poke.nickname)}}>Yes</button>
                        </div>
                    </div>
                </Popup> : null
            }
        </React.Fragment>
    )
}