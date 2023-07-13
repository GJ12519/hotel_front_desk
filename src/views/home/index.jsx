import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HomeWrapper } from './style'
import HomeBanner from './c-cpns/home-banner'
import { fetchHomeDataAction } from '@/store/modules/home'
import { isEmptyO } from '@/utils'
import HomeLongfor from './c-cpns/home-longfor'
import HomeSectionV1 from './c-cpns/home-section-v1'
import HomeSectionV2 from './c-cpns/HomeSectionV2'
import HomeSectionV3 from './c-cpns/home-sextionV3'


const Home = memo(() => {
    const { goodPriceInfo, highScoreInfo, discountInfo, recommendInfo, longforInfo, plusInfo } = useSelector((state) => ({
        goodPriceInfo: state.home.goodPriceInfo,
        highScoreInfo: state.home.highScoreInfo,
        discountInfo: state.home.discountInfo,
        recommendInfo: state.home.recommendInfo,
        longforInfo: state.home.longforInfo,
        plusInfo: state.home.plusInfo
    }), shallowEqual)

    const dispath = useDispatch()

    useEffect(() => {
        dispath(fetchHomeDataAction())
    }, [dispath])

    return (
        <HomeWrapper>
            <HomeBanner />
            <div className='content'>
                {isEmptyO(discountInfo) && <HomeSectionV2 infoData={discountInfo} />}
                {isEmptyO(recommendInfo) && <HomeSectionV2 infoData={recommendInfo} />}
                {isEmptyO(longforInfo) && <HomeLongfor infoData={longforInfo} />}
                {isEmptyO(goodPriceInfo) && <HomeSectionV1 infoData={goodPriceInfo} />}
                {isEmptyO(highScoreInfo) && <HomeSectionV1 infoData={highScoreInfo} />}
                {isEmptyO(plusInfo) && <HomeSectionV3 infoData={plusInfo} />}
            </div>
        </HomeWrapper>
    )
})

export default Home