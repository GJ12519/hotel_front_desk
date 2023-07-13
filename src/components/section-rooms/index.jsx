import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { RoomWrapper } from './style'
import RoomItem from '../room-item'

const SectionRooms = memo((props) => {

    const { roomList = [], itemwidth } = props
    return (
        <RoomWrapper className='room-list'>
            {
                roomList?.slice(0, 8)?.map(item => {
                    return <RoomItem itemData={item} key={item.id} itemwidth={itemwidth}></RoomItem>
                })
            }
        </RoomWrapper>
    )
})

SectionRooms.propTypes = {
    roomList: PropTypes.array
}

export default SectionRooms