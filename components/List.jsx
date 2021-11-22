import React from 'react'
import useSWR from 'swr'
import fetch from 'unfetch'
import Place from './Place'
import homeStyles from '../styles/Home.module.css'
import utils from '../styles/utils.module.css'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const fetcher = url => fetch(url).then(r => r.json())

export default function List({ location, lat, long, searchTerm, radius, price, veggie, vegan, setManualLocation, changeLocation }) {

    let categoriesParam = '[]';
    if (veggie) {
        categoriesParam = ['vegetarian'];
    }
    if (vegan) {
        categoriesParam = ['vegan'];
    }
    if (veggie && vegan) {
        categoriesParam = ['vegetarian', 'vegan']
    }

    const defaultParams = {
        "open_now": true,
        "sort_by": "distance",
        "limit": 50,
        "offset": 0,
        "locale": "en_US",
    }

    const userParams = {
        "radius": radius,
        "price": price,
        "categories": categoriesParam,
        "term": searchTerm,
        "attributes": "",
    }

    function makeParameters(optionLoc, optionLat, optionLong) {
        if (!optionLoc && optionLat && optionLong) {
            // user allows location in browser, so will use lat and long in params:
            const url = new URL(`${BASE_URL}/api/places-latlong`)
            const params = {
                ...defaultParams,
                ...userParams,
                // latlong
                "latitude": optionLat,
                "longitude": optionLong,
            }
            return { url, params }
        }
        if (optionLoc && !optionLat && !optionLong) {
            // user denies location in browser, fills the form with location parameter:
            const url = new URL(`${BASE_URL}/api/places-location`)
            const params = {
                ...defaultParams,
                ...userParams,
                // NOT LATLONG USE THIS PARAM WITH CITY, STREET AND NUMBER:
                "location": optionLoc,
            }
            return { url, params }
        }
        if (optionLoc) {
            // user allows location in browser but change location in form:
            const url = new URL(`${BASE_URL}/api/places-location`)
            const params = {
                ...defaultParams,
                ...userParams,
                // USE LOCATION INSTEAD OF LATLONG:
                "location": optionLoc,
            }
            return { url, params }
        }
        return null;
    }

    const parameters = makeParameters(location, lat, long)

    const handleClick = () => {
        setManualLocation(true)
        changeLocation(null)
    }

    if (!parameters) {
        return (
            <div className={homeStyles.loadingContainer}><p className={homeStyles.loadingP}>finding city...</p></div>
        )
    }

    Object.keys(parameters.params).forEach(key => parameters.url.searchParams.append(key, parameters.params[key]))

    const { data, error } = useSWR(parameters.url, fetcher)


    if (error) return <div className={homeStyles.loadingContainer}><p className={homeStyles.loadingP}>Failed to load</p></div>
    if (!data) return <div className={homeStyles.loadingContainer}><p className={homeStyles.loadingP}>Loading places...</p></div>
    if (data.status === 400) return <div className={homeStyles.loadingContainer}><p className={homeStyles.loadingP}>Seems that city or address does not exist yet, please refresh to try again</p></div>

    const placeList = data.businesses.map((place) => (
        <Place
            key={`key-${place.id}`}
            id={place.id}
            imageUrl={place.image_url}
            name={place.name}
            categories={place.categories}
            price={place.price}
            location={place.location.address1}
            address={place.location.display_address}
            distance={place.distance}
            rating=
            {place.rating}
            reviews={place.review_count}
            transactions={place.transactions}
            phone={place.display_phone}
            url={place.url}
            alias={place.alias}
        />
    ))

    function makeMessage(loc, term) {
        if (loc && term) {
            return (
                <h1 className={utils.headingMd}><span>{data.total}</span> places for <span className={homeStyles.searchSpan}>{term}</span> at <span className={homeStyles.cityName}>{location}</span></h1>
            )
        }
        if (loc && !term) {
            return (
                <h1 className={utils.headingMd}><span>{data.total}</span> open places at <span className={homeStyles.cityName}>{location}</span></h1>
            )
        }
        if (!loc && term) {
            return (
                <h1 className={utils.headingMd}><span>{data.total}</span> open places for <span className={homeStyles.searchSpan}>{term}</span> at <span className={homeStyles.cityName}>your current location</span></h1>
            )
        }
        if (!loc && !term) {
            return (
                <h1 className={utils.headingMd}><span>{data.total}</span> open places at <span className={homeStyles.cityName}>your current location</span></h1>
            )
        }
        return null;
    }

    const message = makeMessage(location, searchTerm)

    return (

        <>
            <div className={homeStyles.placesCount}>
                {message}
                <button className={homeStyles.btnLocation} onClick={handleClick} type="button">change location</button>
            </div>
            <div className={homeStyles.placeListContainer}>
                {placeList}
            </div>
        </>
    )
}
