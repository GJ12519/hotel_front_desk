import React, { memo } from 'react'
import { LeftWrapper } from './style'
import IconLogo from '@/assests/img/hotellogo.png'
import { useNavigate } from 'react-router-dom'

const HeaderLeft = memo(() => {

    const navigate = useNavigate()
    function logoClickHandle() {
        navigate("/home")
    }
    return (
        <LeftWrapper>
            <div className='logo' onClick={logoClickHandle}>
                {/* <IconLogo /> */}
                <img src={IconLogo} alt="" />
                <span>XingWang</span>
            </div>
        </LeftWrapper>
    )
})

export default HeaderLeft