import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    //El uso de useRef soluciona el problema de que el usuario decida abortar la consulta
    //en mitad de un proceso de peticion http

    const isMounted = useRef(true);//Este useRef mantiene la referencia de cuando este hook esta vivo o 
    //el componente que lo usa sigue montado

    useEffect(() => {
        //El return nos dice que pasa cuando el componente se desmonta
        return () => {
            //decidiremos que hacer cuando el componente se demonte
            isMounted.current = false;

        }
    }, []);

    const [state, setstate] = useState({
        datos:null,
        loading:true,
        error:null,
    });
    useEffect(() =>{

        setstate({
            datos:null,
            loading:true,
            error:null,
        });

        fetch(url)
        .then(resp => resp.json())
        .then( datos => {

                if (isMounted.current) {
                    setstate({
                        loading:false,
                        error:null,
                        datos,
                    });  
                } 
        }).catch( ()=>{
            setstate( {
                loading: false,
                datos: null,
                error: 'No se pudo cargar la info',
            })
        });
    }, [url])
    return state;
}
