/** @jsxImportSource @emotion/react */

import { useQuery, gql } from '@apollo/client';
import { css } from '@emotion/react';
import React, { useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import icBack from '../assets/back.png';
import { useNavigate } from 'react-router-dom';
import PokeType from '../components/PokeType';
import PokeInfo from '../components/PokeInfo';
import PokeStat from '../components/PokeStat';
import MyPokeContext from '../contexts/ContextMyPoke';
import CatchPokemonButton from '../components/CatchPokemonButton';

const pokedetailFetchQuery = gql`query pokemon($name: String!) {
    pokemon(name: $name) {
        name
        id
        weight
        height
        base_experience
        sprites{
            front_default
        }
        types{
            type{
                name
            }
        }
        moves{
            move{
                name
            }
        }
        stats{
            base_stat
            stat{
                name
            }
        }
    }
  }`;

const stylePokeDetailHead = css({
    padding: '10px 25px',
    display: 'flex',
    gap: '20px',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    h2: {
        margin: 0,
        textTransform: 'capitalize'
    }
})

const stylePokeDetailHeadBack = css({
    height: '32px'
})

const stylePokeDetailBodyWrap = css({
    overflowX: 'hidden',
    width: '100vw',
    paddingBottom: '100px'
})

const stylePokeImg = css({
    width: '100vw',
    borderBottomLeftRadius: '180px',
    borderBottomRightRadius: '180px',
    background: '#ffffff',
    boxShadow: '15px 15px 30px #d9d9d9, -15px -15px 30px #ffffff',
    padding: '150px 0px 50px 0px',
    marginTop: '-120px',
    marginBottom: '30px',
    textAlign: 'center',
    img:{
        width: '80vw',
    },
    div:{
        backgroundColor: '#f0f0f0',
        borderRadius: '180px',
        width: '70vw',
        height: '70vw',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center'
    }
})

const stylePokeName = css({
    fontSize: '1.7em',
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'capitalize',
    marginBottom: '10px'
})

const stylePokeOwned = css ({
    textAlign: 'center',
    color: 'grey',
    marginTop: '5px',
    marginBottom: '30px'
})

const stylePokeType = css({
    margin: '20px 0px',
    minHeight: '40px',
    display: 'flex',
    justifyContent: 'space-around',
})

const stylePokeInfos = css({
    display: 'flex',
    justifyContent: 'space-around',
})

const stylePokeStats = css({
    textAlign: 'center',
})

const stylePokeMoves = css({
    textAlign: 'center'
})

const stylePokeMove = css({
    padding: '8px 16px',
    borderRadius: '180px',
    backgroundColor: 'black',
    color: 'white',
    display: 'inline-block'
})

const stylePokeMovesWrap = css({
    height: '100px',
    overflowX: 'scroll',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    padding: '0px 10px',
    p:{
        textTransform: 'capitalize',
        marginRight: '10px',
        boxShadow: '8px 8px 16px #d6d6d6,-8px -8px 16px #ffffff'
    },
})

export default function PokeDetail(props){
    const {myPoke} = useContext(MyPokeContext);

    let { name } = useParams();
    const navigate = useNavigate();
    const querystring = useSearchParams();

    const { isLoading, isError, data } = useQuery(pokedetailFetchQuery, {
        variables: {
            name: name
        }
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    var howManyOwned = myPoke.filter(a => a.name === name).length;

    return(
        <React.Fragment>
            <div css={stylePokeDetailHead}>
                <img src={icBack} css={stylePokeDetailHeadBack} onClick={() => navigate(-1)} alt=''/>
                <h2>{data? `#${data.pokemon.id}` : ''}</h2>
            </div>
            <div css={stylePokeDetailBodyWrap}>
                <div css={stylePokeImg}>
                    <div>
                        <img src={decodeURI(querystring[0].get("img"))} alt={name}/>
                    </div>
                </div>
                <p css={stylePokeName}>{name}</p>
                {
                    howManyOwned > 0 ? <p css={stylePokeOwned}>{howManyOwned} Owned</p> : null
                }
                <div css={stylePokeType}>
                    {
                        data?.pokemon.types.map( type => ( 
                            <PokeType key={type.type.name} type={type.type}/>
                        ))
                    }
                </div>
                <div css={stylePokeInfos}>
                    <PokeInfo title='Weight' data={data? `${data?.pokemon.weight/10} KG` : '... KG'}/>
                    <PokeInfo title='Height' data={data? `${data?.pokemon.height/10} M` : '... M'}/>
                    <PokeInfo title='Base Exp.' data={data? `${data?.pokemon.base_experience} XP` : '... XP'}/>
                </div>
                <div css={stylePokeMoves}>
                    <h2>Moves</h2>
                    <div css={stylePokeMovesWrap}>
                        {
                            data?.pokemon.moves.map(move => (
                                <p css={stylePokeMove} key={move.move.name}>{move.move.name.replaceAll('-', ' ')}</p>
                            ))
                        }
                    </div>
                </div>
                <div css={stylePokeStats}>
                    <h2>Base Stats</h2>
                    {
                        data?.pokemon.stats.map(stat => (
                            <PokeStat key={stat.stat.name} title={stat.stat.name} val={stat.base_stat} max={100}/>
                        ))
                    }
                </div>
                <CatchPokemonButton pokemon={data?.pokemon}/>
            </div>
        </React.Fragment>
    )
}