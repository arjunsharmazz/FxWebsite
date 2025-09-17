import React from 'react'
import Marquee3D from '../animcomponents/Marquee3D'
import EducationResources from '../componenets/EducationResources'
import Paymentslogo from '../componenets/Paymentslogo'
import CTABanner from '../componenets/CTABanner'

function Review() {
  return (
    <div>
      <Marquee3D/>
      <EducationResources/>
      {/* <Paymentslogo/> */}
      <CTABanner/>
    </div>
  )
}

export default Review
