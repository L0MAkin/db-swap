import DefaultTokenIcon from "../../assets/svg/DefaultTokenIcon";
import DefaultUsnIcon from "../../assets/svg/DefaultUsnIcon";

function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}
isDataURL.regex = /^(data:)([\w\/\+-]*)(;charset=[\w-]+|;base64){0,1},(.*)/gi;


const TokenIcon = ({ symbol = 'Token', icon }) => {
    if (icon && isDataURL(icon) && symbol !== 'USN') {
        return <img src={icon} alt={symbol}/>;
        // return <DefaultUsnIcon/>;
    } else if (symbol === 'USN') {
        return <DefaultUsnIcon/>;
    } else {
        return <DefaultTokenIcon/>;
    }
};

export default TokenIcon;