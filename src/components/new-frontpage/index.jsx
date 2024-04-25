import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { NewFrontWrapper } from './style'

const NewFrontPage = memo((props) => {
    const { util } = props

    return (
        <NewFrontWrapper main={util.main} color={util.color}>
            <div className='box1'>
                <div className='inner'>
                    <div className='title'>
                        <p className='title-f'>{util.title1}</p>
                        <div>{util.title2}</div>
                    </div>
                    <div className='main-card'>
                        <div className='section-text'>
                            <img src={util.img} alt="" />
                        </div>
                        <div className='icon-item'>
                            <div className='title-t'>
                                <span>{util.title3}</span>
                                <div>{util.title4}</div>
                            </div>
                            <a href='#' className='atitle'>了解更多</a>
                        </div>
                    </div>
                </div>
            </div>
        </NewFrontWrapper>
    )
})

// LongforItem.propTypes = {
//     itemData: PropTypes.object
// }

export default NewFrontPage