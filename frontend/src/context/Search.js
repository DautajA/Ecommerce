import React, {useState, useContext,createContext, useEffect} from 'react';


export const SearchContext = createContext()

export const SearchProvider = ({children})=> {
    const [auth, setAuth]= useState({
       keyword: '',
       results:[],
    });
   

    
    return (
        <SearchContext.Provider value={[auth, setAuth]}>
            {children}
        </SearchContext.Provider>
    )
};

const useSearch = () => useContext(SearchContext);
export {useSearch};
