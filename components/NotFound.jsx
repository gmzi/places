import React from 'react';
import homeStyles from '../styles/Home.module.css'
import Navbar from './Navbar';
import { siteTitle } from './layout';
import usePlaceId from './usePlaceId';



export default function NotFound() {

    return (
        <>
            <Navbar siteTitle={siteTitle} />
            <div className={homeStyles.notFoundContainer}>
                <h3>Sorry, that's not found</h3>
                <a href='/'>put me back on track</a>
            </div>
        </>
    )
}