import React, { memo, useEffect } from 'react'
import { EntireWrapper } from './style'

import EntireFilter from './c-cpns/entire-filter'
import EntirePagination from './c-cpns/entire-pagination'
import EntireRooms from './c-cpns/entire-rooms'
import { useDispatch } from 'react-redux'
import { fetchRoomListAction } from '@/store/modules/entire/actionCreators'

const Entrie = memo(() => {

    const dispath = useDispatch()

    useEffect(() => {
        dispath(fetchRoomListAction())
    }, [dispath])

    return (
        <EntireWrapper>
            {/* <EntireFilter /> */}
            <EntireRooms />
            <EntirePagination />
        </EntireWrapper>
    )
})

export default Entrie