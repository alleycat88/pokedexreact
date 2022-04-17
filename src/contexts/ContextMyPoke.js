import { createContext, useState } from "react";

const MyPokeContext = createContext();

export function MyPokeProvider({children}) {
    const [myPoke, setMyPoke] = useState([]);

    const [isFirstGetDone, setisFirstGetDone] = useState(false);

    const readPokeLS = () => {
        var mypokedata = localStorage.getItem("myPoke");
        if(mypokedata) mypokedata = JSON.parse(mypokedata);
        else mypokedata = [];
        return mypokedata;
    }

    const updatePokeLS = (data) => {
        localStorage.setItem("myPoke", JSON.stringify(data));
        return data;
    }

    const getMyPoke = () => {
        setMyPoke(readPokeLS());
    }

    const addMyPoke = (poke, nickname) => {
        var mypokedata = readPokeLS();

        poke = JSON.parse(JSON.stringify(poke));
        poke.nickname = nickname;
        mypokedata.push(poke);

        setMyPoke(mypokedata);
        updatePokeLS(mypokedata);
        return mypokedata;
    }

    const deleteMyPoke = (nickname) => {
        var mypokedata = readPokeLS();
        
        setMyPoke(mypokedata.filter(a => a.nickname.toLowerCase() != nickname.toLowerCase()));
        updatePokeLS(mypokedata);
        return mypokedata;
    }

    if(!isFirstGetDone){
        getMyPoke();
        setisFirstGetDone(true);
    }

    return(
        <MyPokeContext.Provider value={{
            myPoke,
            getMyPoke,
            addMyPoke,
            deleteMyPoke
        }}>
            {children}
        </MyPokeContext.Provider>
    );
}

export default MyPokeContext;