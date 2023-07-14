import React, { memo } from 'react'
import { useRoutes } from 'react-router-dom'
import AppFooter from './components/app-footer'
import AppHeader from './components/app-header'
import routers from './router'


const App = memo(() => {
  return (
    <div>
      <div className='app'>
        <AppHeader />
        <div className='page'>{useRoutes(routers)}</div>
        <AppFooter />
      </div>
    </div>
  )
})

export default App