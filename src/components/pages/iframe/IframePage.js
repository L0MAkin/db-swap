import React from 'react'
import PageLayout from '../../layout/PageLayout'

export const IframePage = () => {
  return (
    <PageLayout>
    {(geoInfo, isLoading) => (
         <>
             <div className="text-center flex justify-center items-center mt-5 min-h-full">
                 <>
                    <iframe src='https://decentralbank.banxa.com/?buyMode&coinType=USN&blockchain=near' scrolling='no' allowFullScreen='yes' style={{height: '970px', width: '650px', objectFit: 'cover'}}></iframe>
                 </>
             </div>
         </>
     )}
 </PageLayout>
  )
}