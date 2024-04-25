import React, { memo, useCallback } from 'react'
import { RoomsWrapper } from './style'
import { useDispatch, useSelector } from 'react-redux'
import RoomItem from '@/components/room-item'
import { useNavigate } from 'react-router-dom'
import { changeDetailInfoAction } from '@/store/modules/detail'

const EntireRooms = memo((props) => {
    const { roomList, totalCount, isLoading } = useSelector((state) => ({
        roomList: state.entire.roomList,
        totalCount: state.entire.totalCount,
        isLoading: state.entire.isLoading
    }))

    const navigate = useNavigate()
    const dispath = useDispatch()
    const itemClickHandle = useCallback((item) => {
        dispath(changeDetailInfoAction(item))
        navigate("/detail")
    }, [navigate, dispath])

    return (
        <RoomsWrapper>
            <h2 className='title'>{totalCount}多处住所</h2>
            {/* <div className='list'></div> */}
            <div className='list'>
                {
                    roomList?.map((item) => {
                        console.log(item);
                        return (
                            <RoomItem itemData={item} itemwidth="0%" key={item._id} itemClick={itemClickHandle} />
                        )
                    })
                }
            </div>
            {isLoading && <div className='cover'></div>}
        </RoomsWrapper>
    )
})

export default EntireRooms