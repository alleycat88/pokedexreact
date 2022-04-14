/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import icPokeball from '../assets/pokeball.png';

const stylePokeItem = css({
    // border: 'solid 1px black',
    flex: '0 0 180px',
    height: '180px',
    borderRadius: '10px',
    position: 'relative',
    background: '#ffffff',
    boxShadow:  '5px 5px 12px #999999, -5px -5px 12px #ffffff',
})

const stylePokeItemId = css({
    margin: 0,
    position: 'absolute',
    left: '8px',
    top: '8px',
    background: '#ffffff',
    color: 'black',
    borderRadius: '18px',
    padding: '2px 6px',
    fontSize: '.7em',
    boxShadow: 'inset 3px 3px 6px #999999, inset -3px -3px 6px #ffffff',
    zIndex: 2
})

const stylePokeItemOwned = css({
    margin: 0,
    position: 'absolute',
    right: '8px',
    top: '8px',
    background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    color: 'black',
    borderRadius: '18px',
    padding: '2px 6px',
    fontSize: '.7em',
    boxShadow: '3px 3px 6px #999999, -3px -3px 6px #ffffff',
    zIndex: 2
})

const stylePokeItemImg = css({
    width: '120px',
    minHeight: '120px',
    margin: '0 auto',
    display: 'block',
    marginTop: '10px',
    zIndex: 0
})

const stylePokeItemName = css({
    fontWeight: '700',
    textTransform: 'capitalize',
    textAlign: 'center',
    margin: 0,
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
})

const imageFallback = (target, img, height = null, width = null) => {
    target.src = img;
    if (height) target.style.setProperty('height', height);
    if (width) target.style.setProperty('width', width);
};

function PokeItemList(props){
    return(
        <div css={stylePokeItem}>
            <p css={stylePokeItemId}>#{props.poke.id}</p>
            <p css={stylePokeItemOwned}>3 Owned</p>
            <img css={stylePokeItemImg} src={props.poke.image} onError={(e) => imageFallback(e.target, icPokeball)} />
            <p css={stylePokeItemName}>{props.poke.name}</p>
        </div>
    )
}

export default PokeItemList;