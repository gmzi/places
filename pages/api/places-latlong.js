const axios = require('axios')


export default async function handler(req, res){
    try {
        const API_KEY = process.env.API_KEY;
        const API_URL = "https://api.yelp.com/v3/businesses/search"
        const allParams = {
                "open_now": req.query.open_now,
                "sort_by": req.query.sort_by,
                "limit": req.query.limit,
                "offset": req.query.offset,
                "attributes": req.query.attributes,
                "locale": req.query.locale,
                "radius": req.query.radius,
                "price": req.query.price,
                "term": req.query.term,
                "categories": req.query.categories,
                "latitude": req.query.latitude,
                "longitude":req.query.longitude,
        }
    
            const call = await axios.get(API_URL, {
                headers: {
                        Authorization: `Bearer ${API_KEY}`,
                },
                params: allParams
            })
            const data = await call.data
            return res.status(200).json(data)
    } catch(e){
        console.log('server error at places-latlong', e)
    }
}