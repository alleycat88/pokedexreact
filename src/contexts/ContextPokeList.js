import { gql, useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";

const PokeListContext = createContext();

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
        dreamworld
        id
      }
    }
  }`;

export function PokeListProvider({children}){
    const [pokeList, setPokeList] = useState([]);

    // const [isFirstGetDone, setisFirstGetDone] = useState(false);

    const [limit, setLimit] = useState(20);
    const [offset, setOffset] = useState(0);
    const { isLoading, isError, data } = useQuery(pokeFetchQuery, {
        variables: {
            limit: limit,
            offset: offset
        }
    })

    useEffect(() => {
        if(data?.pokemons.results) setPokeList([...new Set([...pokeList, ...data?.pokemons.results])]);
    }, [data?.pokemons.results]);
    
    const getNextPage = () => {
        // console.log(`getting offset ${offset} and limit ${limit}`)
        setOffset(offset+limit);
    }

    return(
        <PokeListContext.Provider value={{
            pokeList,
            limit,
            offset,
            getNextPage,

        }}>
            {children}
        </PokeListContext.Provider>
    )
}

export default PokeListContext;