import PageLayout from '../../layout/PageLayout';
// import LoginButton from '../../login/LoginButton';
import { useNearWallet } from 'react-near';
import SwapContainerWrapper from '../../swap/SwapContainerWrapper';

function HomePage() {
    const { accountId } = useNearWallet()!.account();
   
  


    return (
        <PageLayout>
            <div className="text-center">
                    <>
                        <SwapContainerWrapper accountId={accountId}/>
                    </>
            </div>
        </PageLayout>
    );
}

export default HomePage;
