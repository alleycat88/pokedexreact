/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';

const stylePokeStat = css({
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 30px',
    margin: '10px',
    label: {
        textTransform: 'capitalize'
    }
})

export default function PokeStat(props){
    return(
        <div css={stylePokeStat}>
            <label htmlFor={`bsstat${props.title}`}>{props.title}</label>
            <progress id={`bsstat${props.title}`} value={props.val} max={props.max}> {props.val}% </progress>
            {/* <p>{props.val} / {props.max}</p> */}
        </div>
    )
}