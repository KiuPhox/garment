import React from 'react'
import FilterAreaDraggable from './FilterAreaDraggable'
import FilterAreaDroppable from './FilterAreaDroppable'
import type { FilterAreaProps } from '@/types/explorer'

const FilterArea = ({ keyword, id }: FilterAreaProps) => {
    return (
        <div className="flex-1 max-w-72">
            {keyword ? <FilterAreaDraggable id={id} keyword={keyword} /> : <FilterAreaDroppable id={id} />}
        </div>
    )
}

export default FilterArea
