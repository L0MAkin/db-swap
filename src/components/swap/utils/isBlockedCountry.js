import getUserCountry from 'js-user-country'

export const userCountry = () => {
    const bloced_contry = ['US', 'USA']

    return bloced_contry.includes(getUserCountry().id)
}