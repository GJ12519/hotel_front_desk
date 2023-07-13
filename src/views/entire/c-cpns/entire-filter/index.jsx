import React, { memo, useState } from 'react'
import { FilterWrapper } from './style'
import filterData from "@/assests/data/filter_data.json"
import classNames from 'classnames'

const EntireFilter = memo(() => {
    const [selectItem, setSelectItem] = useState([])

    function itemClickHandle(item) {
        const newItems = [...selectItem]
        if (newItems.includes(item)) {
            const itemIndex = newItems.findIndex(filterData => filterData === item)
            newItems.splice(itemIndex, 1)
        } else {
            newItems.push(item)
        }
        setSelectItem(newItems)
    }

    return (
        <FilterWrapper>
            <div className='filter'>
                {
                    filterData.map((item, index) => {
                        return (
                            <div className={classNames("item", { active: selectItem.includes(item) })}
                                key={item}
                                onClick={e => itemClickHandle(item)}>
                                {item}
                            </div>
                        )
                    })
                }
            </div>
        </FilterWrapper>
    )
})

export default EntireFilter