import React, { memo } from 'react'
import { HeaderWrapper } from './style'
import HeaderCenter from './c-cpns/header-center'
import HeaderRight from './c-cpns/header-right'
import HeaderLeft from './c-cpns/header-left'

const AppHeader = memo(() => {
  return (
    <HeaderWrapper>
      <HeaderLeft />
      <HeaderCenter />
      <HeaderRight />
    </HeaderWrapper>
  )
})

export default AppHeader