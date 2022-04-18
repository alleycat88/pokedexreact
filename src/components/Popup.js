/** @jsxImportSource @emotion/react */

import { css, keyframes } from '@emotion/react';

const styleOverlay = css({
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,.6)',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: 19
})

const stylePopup = css({
    backgroundColor: 'white',
    borderRadius: '12px',
    width: '80%',
    maxWidth: '500px',
    zIndex: 20,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    padding: '15px',
})

export default function Popup(props){
    return(
        <div css={styleOverlay}>
            <div css={stylePopup}>
                {props.children}
            </div>
        </div>
    )
}