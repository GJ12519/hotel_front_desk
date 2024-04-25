import PropTypes from 'prop-types'
import React, { memo, useRef, useState } from 'react'
import { Carousel, message } from 'antd';
import { Rating } from '@mui/material'

import { ItemWrapper } from './style'
import IconArrowLeft from '@/assests/svg/icon-arrow-left';
import IconArrowRight from '@/assests/svg/icon-arrow-right';
import Indicator from '@/base-ui/indicator';
import classNames from 'classnames';
import { stringToImageArray } from '@/utils';
import tools from '@/utils/tools';
import { useNavigate } from 'react-router-dom'

const RoomItem = memo((props) => {
    const { itemData, itemmsg, itemwidth = "25%", itemClick } = props
    const [selectIndex, setSelectIndex] = useState(0)
    const sliderRef = useRef()
    const navigate = useNavigate();

    // 存在session中的客户数据
    let Suserinfo = null
    if (sessionStorage.getItem('userinfo')) {
        Suserinfo = JSON.parse(
            tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
        )
    }

    let picture_urls = stringToImageArray(itemmsg.picture_urls)

    /** 事件处理的逻辑 */
    function controlClickHandle(isNext = true, event) {
        // 上一个面板/下一个面板
        isNext ? sliderRef.current.next() : sliderRef.current.prev()

        // 最新的索引
        let newIndex = isNext ? selectIndex + 1 : selectIndex - 1
        const length = picture_urls.length
        if (newIndex < 0) newIndex = length - 1
        if (newIndex > length - 1) newIndex = 0
        setSelectIndex(newIndex)

        // 阻止事件冒泡
        event.stopPropagation()
    }

    function itemClickHandle() {
        console.log(itemmsg);
        if (itemClick) itemClick(itemmsg)
    }

    function clickHandle() {
        console.log('预订', itemmsg);
        if (Suserinfo) {
            if (itemClick) itemClick(itemmsg)
        } else {
            message.info('请先进行登录')
            navigate('/login')
        }
    }

    /** 子元素的赋值 */
    const pictureElement = (
        <div className='cover'>
            <img src={itemmsg.picture_url} alt="" />
        </div>
    )

    const sliderElement = (
        <div className='slider'>
            <div className='control'>
                <div className='btn left' onClick={e => controlClickHandle(false, e)}>
                    <IconArrowLeft width="30" height="30" />
                </div>
                <div className='btn right' onClick={e => controlClickHandle(true, e)}>
                    <IconArrowRight width="30" height="30" />
                </div>
            </div>
            <div className='indicator'>
                <Indicator selectIndex={selectIndex}>
                    {
                        picture_urls?.map((item, index) => {
                            return (
                                <div className="item" key={item}>
                                    <span className={classNames("dot", { active: selectIndex === index })}></span>
                                </div>
                            )
                        })
                    }
                </Indicator>
            </div>
            <Carousel dots={false} ref={sliderRef}>
                {
                    picture_urls?.map(item => {
                        return (
                            <div className='cover' key={item}>
                                <img src={item} alt="" />
                            </div>
                        )
                    })
                }
            </Carousel>
        </div>
    )

    return (
        <ItemWrapper
            itemwidth={itemwidth}
        // onClick={itemClickHandle}
        >
            <div className='inner'>
                {!picture_urls.length ? pictureElement : sliderElement}
                {/* {sliderElement} */}
                <div className='bottomm'>
                    <div className='bbbb'>
                        <div className='typen'>{itemmsg.type_name}</div>
                        <div className='mainbox'>
                            <div className='area'>{`面积：${itemmsg.area} 平方米`}</div>
                            <div className='price'>{`最低房价由￥${itemmsg.price}每晚起`}</div>
                        </div>
                        <div className='btnreverse' onClick={clickHandle}>
                            预订
                        </div>
                    </div>
                </div>

                {/* <div className='desc'>
                    {itemData.verify_info.messages.join(" · ")}
                </div>
                <div className='name'>{itemData.name}</div>
                <div className='price'>¥{itemData.price}/晚</div>

                <div className='bottom'>
                    <Rating
                        value={itemData.star_rating ?? 5}
                        precision={0.1}
                        readOnly
                        sx={{ fontSize: "12px", color: "#00848A", marginRight: "-1px" }}
                    />
                    <span className='count'>{itemData.reviews_count}</span>
                    {
                        itemData.bottom_info && <span className='extra'>·{itemData.bottom_info?.content}</span>
                    }
                </div> */}
            </div>
        </ItemWrapper>
    )
})

RoomItem.propTypes = {
    itemData: PropTypes.object,
    itemmsg: PropTypes.object,
}

export default RoomItem