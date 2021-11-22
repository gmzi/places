const axios = require('axios')

export default async function details(req, res){
    // eslint-disable-next-line prefer-destructuring
    const API_KEY = process.env.API_KEY
    const {id} = req.query
    const fetchURL = `https://api.yelp.com/v3/businesses/${id}`

    try {
        const call = await axios.get(fetchURL, {
            headers: {
                Authorization: `Bearer ${API_KEY}`
            }
        })
        const data = call.data;
        return res.status(200).json(data)
    } catch(e){
        const data = {
            error: true,
        }
        return res.status(404).json(e)
    }
}



