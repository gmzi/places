# Description

Live demo: https://places-alpha.vercel.app

On mounting, app asks for location permission, if granted, app detects browser latlong and displays a list with places open at current time, sorted by closest to current location. If permission to access location is denied, app displays a form to enter location manually (by full address, street name only, or city name only). User can change location at any time with button displayed on top. At bottom of page there's a dashboard where user can filter list by search term, distance, budget, and veggie or vegan options. Filters remain applied when changing location of the search.  


## Tooling

- React
- Next.js 

## API

Yelp fusion (https://fusion.yelp.com)

### contribute

1. Clone repo, 
2. `npm install` dependencies 
3. `npm run dev` 
4. go to `http://localhost:3000/` in local browser.


### TODOS

- [] detect scroll direction with useScrollDirection and fix places count message on top of navbar.
- [] save places upon register/login.
- [] implement useScrollDirection hook (already drafted) to: 
    - close ImageDisplay when swipping down. 
    - position places count and search term fixed at top of page.
- [] implement suggestions on search form, and flexible matching results. 
