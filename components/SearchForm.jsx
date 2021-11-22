import React, { useState } from 'react'
import homeStyles from '../styles/Home.module.css'

export default function SearchForm({ handleSearch, searchTerm }) {

    const initialState = {
        search: searchTerm
    }

    const [formData, setFormData] = useState(initialState)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }))
        // handleSearch(formData.search)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // const { search } = formData
        handleSearch(formData.search)
    }

    const handleClearSearch = () => {
        setFormData(() => ({ search: '' }))
    }

    return (
        <form onSubmit={handleSubmit} className={homeStyles.searchForm}>
            <label htmlFor="search" />
            <input id="search" type="text" name="search" placeholder="search" value={formData.search} onChange={handleChange} />
            {!formData.search ? (
                <button type="submit" style={{ display: "none" }}>go</button>
            ) : (
                <button type="button" onClick={handleClearSearch}>X</button>
            )
            }
        </form >
    )
}