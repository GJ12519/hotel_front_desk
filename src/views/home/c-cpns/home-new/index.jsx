import React, { memo } from 'react'
import { HomeNewWrapper } from './style'
import NewFrontPage from '@/components/new-frontpage'
import util from './util'

const HomeNew = memo(props => {
    return (
        <HomeNewWrapper>
            {util.map(item=>{
                return <NewFrontPage key={item.id} util={item}/>
            })}

        </HomeNewWrapper>
    )
})

export default HomeNew