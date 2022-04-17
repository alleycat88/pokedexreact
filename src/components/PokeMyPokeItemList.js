/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

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
})

export default function PokeMyPokeItemList(props){
    return(
        <div css={styleMyPoke}>
            <img css={styleMyPokeImg} src={props.poke.sprites.front_default}/>
            <div css={styleMyPokeDet}>
                <p css={styleMyPokeDetNickname}>{props.poke.nickname}</p>
                <p css={styleMyPokeDetSpecies}>Species : <span style={{fontWeight: '700', textTransform: 'capitalize'}}>{props.poke.name}</span></p>
            </div>
        </div>
    )
}