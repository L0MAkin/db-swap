import getUserCountry from 'js-user-country'

export const userCountry = () => {
    const bloced_contry = ['UA']

    return bloced_contry.includes(getUserCountry().id)
}