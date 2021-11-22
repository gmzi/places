import React from 'react';
import ReactSlider from 'react-slider'
import homeStyles from '../styles/Home.module.css'
import SearchForm from './SearchForm';


export default function Dashboard({ search, changeRanges, changeChecks, searchTerm, veggie, vegan }) {

    const handleSearch = (term) => {
        search(term)
    }

    const handleRanges = (value) => {
        changeRanges(value)
    }

    const handleCheckBoxes = event => {
        changeChecks(event.target.id, event.currentTarget.checked)
    }

    return (
        <div className={homeStyles.dashboardInner}>
            <SearchForm key="search-form" handleSearch={handleSearch} searchTerm={searchTerm} />
            <div className={homeStyles.levelsContainer}>
                <div className={homeStyles.sliderContainer}>
                    <label className={homeStyles.sliderLabel}>
                        distance
                    </label>
                    <ReactSlider
                        id="slider-radius"
                        max={4000}
                        min={200}
                        defaultValue={40000}
                        ariaLabelledby={homeStyles.sliderLabel}
                        className={homeStyles.slider}
                        trackClassName={homeStyles.track}
                        thumbClassName={homeStyles.thumb}
                        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        onAfterChange={handleRanges}
                    />
                </div>
                <div className={homeStyles.sliderContainer}>
                    <label className={homeStyles.sliderLabel}>
                        budget
                    </label>
                    <ReactSlider
                        max={3}
                        min={0}
                        defaultValue={3}
                        ariaLabelledby={homeStyles.sliderLabel}
                        className={homeStyles.slider}
                        trackClassName={homeStyles.track}
                        thumbClassName={homeStyles.thumb}
                        // renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        onAfterChange={handleRanges}
                    />
                </div>
            </div>
            <div className={homeStyles.switchContainer}>
                <div className={homeStyles.switchAndLabel}>
                    <input onChange={handleCheckBoxes} type="checkbox" id="veggie" checked={veggie} />
                    <label className="check-label" htmlFor="veggie">Veggie</label>
                </div>
                <div className={homeStyles.switchAndLabel}>
                    <input onChange={handleCheckBoxes} type="checkbox" id="vegan" checked={vegan} />
                    <label className="check-label" htmlFor="vegan">Vegan</label>
                </div>
            </div>
        </div>

    )
}
