import PropTypes from 'prop-types'
import React, { memo } from 'react'
import SectionHeader from '@/components/section-header'
import SectionRooms from '@/components/section-rooms'

import { SectionV1Wrapper } from './style'
import SectionFooter from '@/components/section-footer'

const HomeSectionV1 = memo((props) => {
    const { infoData } = props
    return (
        <SectionV1Wrapper>
            <div className='good-price'>
                <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
                <SectionRooms roomList={infoData.list} itemwidth="25%"></SectionRooms>
                <SectionFooter />
            </div>
        </SectionV1Wrapper>
    )
})

HomeSectionV1.propTypes = {
    infoData: PropTypes.object
}

export default HomeSectionV1