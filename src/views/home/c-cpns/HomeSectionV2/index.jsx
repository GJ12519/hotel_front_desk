import PropTypes from 'prop-types'
import React, { memo, useCallback, useState } from 'react'

import { SectionV2Wrapper } from './style'
import SectionHeader from '@/components/section-header'
import SectionRooms from '@/components/section-rooms'
import SectionTabs from '@/components/section-tabs'
import SectionFooter from '@/components/section-footer'

const HomeSectionV2 = memo((props) => {
    // props的数据
    const { infoData } = props

    // 内部的state
    /* 这里由于第一次渲染拿到的数据是underfind，而第二次渲染的时候传入的值无效，所以需要在action进行判断是否为空 */
    const initialName = Object.keys(infoData.dest_list ?? {})[0]
    const [name, setName] = useState(initialName)
    const tabNames = infoData.dest_address?.map(item => item.name)

    // 事件处理函数
    const tabClickHandle = useCallback(
        function (index, name) {
            setName(name)
        }, []
    )

    /*   这里可以对infodata进行监听，如果有变化则进行修改，但这样对整个组件渲染了三次
         useEffect(() => {
            setName("xxxx")
        }, [infoData]) */

    return (
        <SectionV2Wrapper>
            <SectionHeader title={infoData.title} subtitle={infoData.subtitle} />
            <SectionTabs tabNames={tabNames} tabClick={tabClickHandle} />
            <SectionRooms roomList={infoData.dest_list?.[name]} itemwidth="33.33%" />
            <SectionFooter name={name} />
        </SectionV2Wrapper>
    )
})

HomeSectionV2.propTypes = {
    infoData: PropTypes.object
}

export default HomeSectionV2