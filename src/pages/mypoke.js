/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useContext, useEffect } from 'react';
import PokeMyPokeItemList from '../components/PokeMyPokeItemList';
import MyPokeContext from '../contexts/ContextMyPoke';

const styleMyPokeHead = css({
    padding: '10px 25px',
    display: 'flex',
    justifyContent: 'space-between',
    h2: {
        margin: 0
    }
})

const styleMyPokeBody = css({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    rowGap: '40px',
    padding: '25px 0px',
    paddingBottom: '100px',
})

export default function MyPoke(){
    const {myPoke} = useContext(MyPokeContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return(
        <React.Fragment>
            <div css={styleMyPokeHead}>
                <h2>My Pok&#233;mon</h2>
            </div>
            <div css={styleMyPokeBody}>
                {
                    myPoke.map( poke => (
                        <PokeMyPokeItemList poke={poke} key={poke.nickname} />
                    ))
                }
            </div>
        </React.Fragment>
    );
}