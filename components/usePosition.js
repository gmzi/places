import {useState, useEffect} from 'react'

export default function usePosition(){
    const [position, setPosition] = useState();
    const [error, setError] = useState(false);

    

    const onChange = ({coords}) => {
        setPosition({
            lat: coords.latitude,
            long: coords.longitude
        })
    }

    const onError = (showError) => {
        setError(showError)
    }

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo){
            setError(true)
            return;
        }
        const watcher = geo.getCurrentPosition(onChange, onError)
        // eslint-disable-next-line consistent-return
        return () => watcher
    }, [])
    return {...position, error}
}


// import {useState, useEffect} from 'react'

// export default function usePosition(){
//     const [position, setPosition] = useState({});
//     const [error, setError] = useState(false);

    

//     const onChange = ({coords}) => {
//         setPosition({
//             lat: coords.latitude,
//             long: coords.longitude
//         })
//     }

//     const onError = (showError) => {
//         setError(showError)
//     }

//     useEffect(() => {
//         const geo = navigator.geolocation;
//         if (!geo){
//             setError(true)
//             return;
//         }
//         const watcher = geo.watchPosition(onChange, onError)
//         // eslint-disable-next-line consistent-return
//         return () => geo.clearWatch(watcher)
//     }, [])
//     return {...position, error}
// }