/** @jsxImportSource @emotion/react */

import { useQuery, gql } from '@apollo/client';
import { css } from '@emotion/react';
import React, { useContext } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import icBack from '../assets/back.png';
import { useNavigate } from 'react-router-dom';
import PokeType from '../components/PokeType';
import PokeInfo from '../components/PokeInfo';
import PokeStat from '../components/PokeStat';
import MyPokeContext from '../contexts/ContextMyPoke';

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

const stylePokeDetailHeadTitle = css({
    flexGrow: 1,
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
    h3:{
        marginTop: '25px'
    }
})

const stylePokeBtnCatch = css({
    margin: '0 auto',
    display: 'block',
    padding: '10px 27px',
    borderRadius: '10px',
    boxShadow: '11px 11px 22px #d9d9d9, -11px -11px 22px #ffffff',
    background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    border: 'solid .1px #f1f1f1',
    fontWeight: '700',
    marginTop: '30px'
})

export default function PokeDetail(props){
    const {addMyPoke} = useContext(MyPokeContext);

    let { name } = useParams();
    const navigate = useNavigate();
    const querystring = useSearchParams();

    const { isLoading, isError, data } = useQuery(pokedetailFetchQuery, {
        variables: {
            name: name
        }
    })

    function catchPoke(){
        var didIGetIt = Math.random() < 0.5;
        if(didIGetIt) {
            console.log("You got it!");
            addMyPoke(data.pokemon, "test nicknamee");
        }
        else console.log("nope")
    }

    return(
        <React.Fragment>
            <div css={stylePokeDetailHead}>
                <img src={icBack} css={stylePokeDetailHeadBack} onClick={() => navigate(-1)}/>
                <h2>{data? `#${data.pokemon.id}` : ''}</h2>
            </div>
            <div css={stylePokeDetailBodyWrap}>
                <div css={stylePokeImg}>
                    <div>
                        <img src={decodeURI(querystring[0].get("img"))}/>
                    </div>
                </div>
                <p css={stylePokeName}>{name}</p>
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
                {/* <hr/> */}
                <div css={stylePokeStats}>
                    <h2>Base Stats</h2>
                    {
                        data?.pokemon.stats.map(stat => (
                            <PokeStat key={stat.stat.name} title={stat.stat.name} val={stat.base_stat} max={100}/>
                        ))
                    }
                </div>
                <button css={stylePokeBtnCatch} onClick={catchPoke}>Use Pokeball</button>
            </div>
        </React.Fragment>
    )
}