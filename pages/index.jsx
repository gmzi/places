import React, { useState } from 'react';
import { priceDisplay } from '../components/helpers'
import homeStyles from '../styles/Home.module.css';
import usePosition from '../components/usePosition';
import useLocation from '../components/useLocation';
import List from '../components/List';
import Layout from '../components/layout'
import Dashboard from '../components/Dashboard';
import LocationForm from '../components/LocationForm';

export default function Index() {
  const { lat, long, error } = usePosition()
  const [location, changeLocation] = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [radius, setRadius] = useState('35000')
  const [price, setPrice] = useState('1,2,3,4')
  const [veggie, setVeggie] = useState(false)
  const [vegan, setVegan] = useState(false)
  const [manualLocation, setManualLocation] = useState()

  function enterLocation(address) {
    changeLocation(address)
  }

  function search(term) {
    setSearchTerm(term)
  }

  function changeRanges(newValue) {
    if (newValue > 3) {
      setRadius(newValue)
      return
    }
    const newPrice = priceDisplay(newValue)
    setPrice(newPrice)
  }

  function changeChecks(state, newValue) {
    if (state === 'veggie') {
      setVeggie(newValue)
    }
    if (state === 'vegan') {
      setVegan(newValue)
    }
  }

  function hide(event) {
    const element = event.target.parentElement;
    element.classList.toggle(homeStyles.hide)
  }

  // const dashBoard = useRef('dashboard')

  return (
    <Layout home>
      {/* <Head>
        <title>{siteTitle}</title>
      </Head> */}
      <section className={homeStyles.section}>
        {error && (!location) || manualLocation && (!location) ? (
          <div>
            <LocationForm enterLocation={enterLocation} />
          </div>
        ) : (
          <>
            <div className={homeStyles.grid}>
              <List
                location={location}
                lat={lat}
                long={long}
                searchTerm={searchTerm}
                radius={radius}
                price={price}
                veggie={veggie}
                vegan={vegan}
                setManualLocation={setManualLocation}
                changeLocation={changeLocation}
              />
            </div>
            <div className={homeStyles.dashboard} >
              {/* eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role */}
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button type="button" className={homeStyles.barButton} onClick={hide} draggable="true" onDragEnd={hide} />
              <Dashboard
                // ref={dashBoard}
                search={search}
                changeRanges={changeRanges}
                changeChecks={changeChecks}
                searchTerm={searchTerm}
                veggie={veggie}
                vegan={vegan}
              />
            </div>
          </>
        )}
      </section>
    </Layout >
  );
}


