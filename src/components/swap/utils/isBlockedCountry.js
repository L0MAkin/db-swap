import getUserCountry from 'js-user-country'
import { useEffect, useState } from 'react'

const bloced_contry = ['US', 'USA']

const getInfo = async () => {
    const result = await  fetch('https://ipapi.co/json')
    const data = result.json()
    
    return data
 }

export const userCountry = () => {

    return bloced_contry.includes(getUserCountry().id)
}

export const useCountryAPI = () => {
    const [geoInfo, setGeoInfo] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getGeoInfo = async () => {
            try {
                setIsLoading(true) 
                const geo = await getInfo()
                setGeoInfo(geo.country)
                setIsLoading(false) 
            } catch (error) {
                console.error(error)
            }
        }

        getGeoInfo()
    },[])

    return { isLoading, geoInfo: bloced_contry.includes(geoInfo) ? true : userCountry()}
}