/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import icPokeball from '../assets/pokeball.png';
import MyPokeContext from '../contexts/ContextMyPoke';

const stylePokeItem = css({
    // border: 'solid 1px black',
    flex: '0 0 180px',
    height: '180px',
    borderRadius: '10px',
    position: 'relative',
    background: '#ffffff',
    boxShadow:  '5px 5px 12px #999999, -5px -5px 12px #ffffff',
    '&:hover, &:focus':{
        boxShadow:  'inset 5px 5px 12px #999999, inset -5px -5px 12px #ffffff'
    }
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
    const {myPoke} = useContext(MyPokeContext);
    const [ownedCount, setOwnedCount] = useState(0);
    const [ownedCountFetched, setownedCountFetched] = useState(false);

    const getOwnedSpeciesCount = () => {
        setOwnedCount(myPoke.filter(a => a.name == props.poke.name).length);
        setownedCountFetched(true);
    }

    if(!ownedCountFetched) getOwnedSpeciesCount();

    return(
        <Link css={stylePokeItem} to={`/poke/${props.poke.name}?img=${encodeURI(props.poke.dreamworld)}`}>
            <p css={stylePokeItemId}>#{props.poke.id}</p>
            {
                ownedCount < 1 ? null : <p css={stylePokeItemOwned}>{ownedCount} Owned</p>
            }
            <img css={stylePokeItemImg} src={props.poke.image} onError={(e) => imageFallback(e.target, icPokeball)} />
            <p css={stylePokeItemName}>{props.poke.name}</p>
        </Link>
    )
}

export default PokeItemList;