/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import React, { useContext, useEffect } from 'react';
import PokeMyPokeItemList from '../components/PokeMyPokeItemList';
import MyPokeContext from '../contexts/ContextMyPoke';
import iconEmpty from '../assets/empty.png';

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

const styleEmpty = css({
    marginTop: '150px',
    textAlign: 'center',
    img:{
        maxWidth: '180px' 
    },
    p:{
        color: 'gray',
        marginTop: '3px',
        fontSize: '.8em'
    },
    h4:{
        color: 'gray',
        marginBottom: '3px'
    }
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
                    myPoke.length < 1 ?
                        <div css={styleEmpty}>
                            <img src={iconEmpty} alt=''/>
                            <h4>You don't have Pokemons yet</h4>
                            <p>Catch one in the Pokemon Detail page</p>
                        </div> 
                        :
                        myPoke.map( poke => (
                            <PokeMyPokeItemList poke={poke} key={poke.nickname} />
                        ))
                }
            </div>
        </React.Fragment>
    );
}