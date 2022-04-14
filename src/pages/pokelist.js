/** @jsxImportSource @emotion/react */

import { useQuery, gql } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import PokeItemList from '../components/PokeItemList';
import { css } from '@emotion/react';
import icSearch from '../assets/search.png';
import { initializeScrollToBottomListener, removeScollToBottomListener } from '../helpers/ScrollToBottomLoader';

const pokeFetchQuery = gql`query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
        id
      }
    }
  }`;

const stylePokeListBody = css({
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    rowGap: '20px',
    padding: '25px 0px',
    minHeight: '110vh',
})

const stylePokeListHead = css({
    padding: '10px 25px',
    // marginBottom: '25px',
    display: 'flex',
    justifyContent: 'space-between',
    h2: {
        margin: 0
    }
})

const stylePokeListHeadSearch = css({
    backgroundColor: 'transparent',
    border: 'none',
    height: '32px',
    img : {
        maxHeight: '27px',
        padding: '5px'
    }
})

function PokeList(){
    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const [totalData, setTotalData] = useState([]);
    const [canFetch, setCanFetch] = useState(true);
    const { isLoading, isError, data } = useQuery(pokeFetchQuery, {
        variables: {
            limit: limit,
            offset: offset
        }
    })

    useEffect(() => {
        if(data?.pokemons.results) setTotalData([...new Set([...totalData, ...data?.pokemons.results])]);
    }, [data?.pokemons.results]); 

    // var canFetch = true;
    useEffect(() => {
        initializeScrollToBottomListener('pokeListBody', () => {
            if (canFetch) {
                setCanFetch(false);
                setTimeout(() => {
                    setOffset(offset+limit);
                    setCanFetch(true);
                }, 2000);
            }
        });
        return () => removeScollToBottomListener();
    });

    return(
        <React.Fragment>
            <div css={stylePokeListHead}>
                <h2>Pok&#233;dex</h2>
                <button css={stylePokeListHeadSearch}><img src={icSearch}/></button>
            </div>
            <div css={stylePokeListBody} id='pokeListBody'>
                {
                    totalData.map( poke => (
                        <PokeItemList poke={poke} key={poke.id} />
                    ))
                }
            </div>
        </React.Fragment>
    )
}

export default PokeList;