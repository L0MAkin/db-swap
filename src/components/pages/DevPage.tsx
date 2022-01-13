import { useWhitelistedContext } from '../../contracts/nearcrowd/WhitelistedContext';

function DevPage() {
    const { whitelisted } = useWhitelistedContext();

    console.log({ whitelisted: whitelisted });

    return <div>whitelisted: {whitelisted}</div>;
}

export default DevPage;
