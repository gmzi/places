import React from "react"
import Head from "next/head"
import styles from './layout.module.css'
import homeStyles from '../styles/Home.module.css'
import Navbar from "./Navbar"

export const siteTitle = 'places'
export const siteDescription = 'where to go at every hour'

export default function Layout({ children }) {

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <title>{siteTitle}</title>
            </Head>
            <Navbar siteTitle={siteTitle} siteDescription={siteDescription} />
            <main className={homeStyles.main}>{children}</main>
        </div >
    )
}