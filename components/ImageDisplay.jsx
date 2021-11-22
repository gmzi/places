import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import homeStyles from '../styles/Home.module.css'

export default function ImageDisplay({ data, closeImages }) {
    // TODO: useScrollDirection to close image display, 

    const handleImageClose = () => {
        closeImages()
    }

    return (
        <div className={homeStyles.ImageDisplay}>
            <button className={homeStyles.btnClose} type="button" onClick={handleImageClose}>
                <svg
                    viewBox="0 0 24 24"
                    width="24px"
                    height="24px"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xLink">
                    <path fill="white" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                </svg>
            </button>
            <div className={homeStyles.carouselContainer}>
                <Carousel
                    axis="horizontal"
                    showThumbs={false}
                    showArrows
                    autoFocus
                    centerMode
                    showStatus={false}
                    centerSlidePercentage={100}
                    useKeyboardArrows
                >
                    {data.map((url) => (
                        <div>
                            <img src={url} alt="Place" />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div >
    )
}
