import React, { memo, useEffect, useRef, useState } from 'react'
import { RightWrapper } from './style'
import IconGlobal from '@/assests/svg/icon_global'
import IconMenu from '@/assests/svg/icon_menu'
import IconAvatar from '@/assests/svg/icon_avatar'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { isEmptyO } from '@/utils'
import { changeUserinfoAction } from '@/store/modules/home'
import tools from '@/utils/tools'
import { message } from 'antd'


const HeaderRight = memo(() => {
    const [showPanel, setShowPanel] = useState(false)
    const myDivRef = useRef(null)
    const dispatch = useDispatch()

    const userinfo = useSelector((state) => state.home.userinfo)
    console.log('userinof', userinfo);

    // 存在session中的客户数据
    let Suserinfo = null
    if (sessionStorage.getItem('userinfo')) {
        Suserinfo = JSON.parse(
            tools.uncompile(sessionStorage.getItem("userinfo") || "[]")
        )
        console.log(Suserinfo);
    }

    const handleOutsideClick = (event) => {
        if (myDivRef.current && !myDivRef.current.contains(event.target)) {
            setShowPanel(false);
        }
    };

    useEffect(() => {
        if (showPanel) {
            document.addEventListener("mousedown", handleOutsideClick, true)
        } else {
            document.removeEventListener("mousedown", handleOutsideClick, true)
        }
    }, [showPanel])

    /** 事件处理函数 */
    const profileClickHandle = (event) => {
        // 阻止事件冒泡到弹窗外部的事件监听器  
        event.stopPropagation();
        setShowPanel(!showPanel);
    };

    const navigate = useNavigate()
    // 页面跳转
    function ClickHandle(e) {
        console.log(e);
        navigate(`/${e}`);
    }

    // 退出登录
    const RemoveUserinfo = () => {
        dispatch(changeUserinfoAction())
        sessionStorage.removeItem('userinfo')
        message.info('已退出登录')
        navigate('/home')
    }
    return (
        <RightWrapper>
            <div className='btns'>
                <span className='btn' onClick={() => ClickHandle('home')}>首页</span>
                <span className='btn' onClick={() => ClickHandle('room')}>客房</span>
                {/* <span className='btn'>
                    <IconGlobal />
                </span> */}
            </div>

            <div className='profile' onClick={profileClickHandle}>
                <IconMenu />
                <IconAvatar />

                {showPanel && (
                    <div className='panel' ref={myDivRef}>
                        <div className='top'>
                            {!Suserinfo && <div className='item register' onClick={() => ClickHandle('reg')}>注册</div>}
                            {!Suserinfo && <div className='item login' onClick={() => ClickHandle('login')}>登录</div>}
                            {Suserinfo && <div className='item' onClick={() => ClickHandle('personal')}>个人中心</div>}
                            {Suserinfo && <div className='item' onClick={() => RemoveUserinfo()}>退出登录</div>}
                        </div>
                    </div>
                )}
            </div>
        </RightWrapper>
    )
})

export default HeaderRight