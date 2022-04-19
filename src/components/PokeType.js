/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const PokeTypeItem = css({
    textTransform: 'capitalize',
    border: 'solid #f0f0f0 .1px',
    padding: '8px 25px',
    background: '#ffffff',
    borderRadius: '180px',
    color: 'white',
    fontWeight: '700',
    boxShadow: '8px 8px 16px #d6d6d6,-8px -8px 16px #ffffff',
})

const pokeTypeColor = [
    {name : "normal",color: "#CCC9AA"},
    {name : "fighting",color: "#E8121A"},
    {name : "flying",color: "#5EB9B4"},
    {name : "poison",color: "#A819D7"},
    {name : "ground",color: "#E2D15B"},
    {name : "rock",color: "#A8A7AF"},
    {name : "bug",color: "#BDDD6E"},
    {name : "ghost",color: "#8F54A4"},
    {name : "steel",color: "#7B8E8A"},
    {name : "fire",color: "#F67E0D"},
    {name : "water",color: "#0A79BE"},
    {name : "grass",color: "#3F9609"},
    {name : "electric",color: "#FFFA25"},
    {name : "psychic",color: "#ED0F64"},
    {name : "ice",color: "#1A94A3"},
    {name : "dragon",color: "#8B56FE"},
    {name : "dark",color: "#604733"},
    {name : "fairy",color: "#FFA0C2"},
    {name : "unknown",color: "#54636E"},
    {name : "shadow",color: "#3E3F44"},
]

export function getPokeTypeColor(name){
    return pokeTypeColor.find(a => a.name == name).color;
}

export default function PokeType(props){
    return(
        <span css={css`${PokeTypeItem}; background-color: ${getPokeTypeColor(props.type.name)}`}>{props.type.name}</span>
    )
}