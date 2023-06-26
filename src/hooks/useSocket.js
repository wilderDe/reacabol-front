import { useCallback, useEffect, useState } from "react"
import io from "socket.io-client"

export const useSocket = ( serverPath ) => {

    //const { socket, online } = useSelector( state => state.socket )
    const [socket, setSocket] = useState(null)
    const [ online, setOnline ] = useState(false);
   
    const conectarSocket = useCallback( () => {
        console.log("Callback")
        //TODO: obtener el token
        const socketTemp = io.io.connect( serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,  //va destrozar su conexion
        } )

        // dispatch( addSocket( socketTemp ) )
        setSocket(socketTemp)
    }, [ serverPath ] );
  
    const desconectarSocket = useCallback( () => {

        socket?.disconnect();
    
    }, [socket])


    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline(true) )
    }, [ socket ])
    
    useEffect(() => {
        socket?.on( 'disconnect', () => setOnline(false) )
    }, [socket])

    return{
        //Propiedades
        socket,
        online,


        //Metodos
        conectarSocket,
        desconectarSocket

    }


}