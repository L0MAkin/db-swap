import DefaultTokenIcon from "../../assets/svg/DefaultTokenIcon";
import DefaultTokenIconBlack from "../../assets/svg/DefaultTokenIconBlack";
import DefaultUsnIcon from "../../assets/svg/DefaultUsnIcon";

function isDataURL(s) {
    return !!s.match(isDataURL.regex);
}
isDataURL.regex = /^(data:)([\w\/\+-]*)(;charset=[\w-]+|;base64){0,1},(.*)/gi;




const TokenIcon = ({ symbol = 'Token', icon }) => {
    if (icon && isDataURL(icon)) {
        // return <img src={icon} alt={symbol}/>;
        return <DefaultUsnIcon/>;
    } else if (symbol === 'NEAR') {
        return <DefaultTokenIconBlack/>;
    } else if (symbol === 'Token' || symbol === 'USN') {
        return <DefaultUsnIcon/>;
    } else {
        return <DefaultTokenIcon/>;
    }
};

export default TokenIcon;
