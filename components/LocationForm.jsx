import React, { useState } from 'react'
import homeStyles from '../styles/Home.module.css'

export default function LocationForm({ enterLocation }) {

    const [banner, setBanner] = useState()


    const handleLocation = (e) => {
        e.preventDefault()
        if (e.target.city.value === '') {
            setBanner('please enter a full address, a street or a city')
            return
        }
        enterLocation(e.target.city.value)
        // changeLocation(e.target.city.value)
        e.target.city.value = '';
    }

    return (
        <div className={homeStyles.formContainer}>
            {banner ? (
                <div>
                    <p>{banner}</p>
                </div>
            ) : null}
            <form onSubmit={handleLocation} className={homeStyles.locationForm}>
                <label htmlFor="city" />
                <input id="city" name="city" type="text" autoComplete="city" placeholder="address, street name or city" />
                <button className={homeStyles.btnFind} type="submit">find</button>
            </form>
        </div >
    )
}