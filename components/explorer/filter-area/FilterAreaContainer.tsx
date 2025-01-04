import React, { useContext } from 'react'
import ExplorerContext from '@/contexts/ExplorerContext'
import FileArea from '../file-area/FileArea'
import FilterArea from './FilterArea'

const FilterAreaContainer = () => {
    const { filterAreas } = useContext(ExplorerContext)

    const notEmptyFilterAreas = filterAreas.filter((filterArea) => filterArea !== undefined)

    return (
        <section className="flex flex-col gap-2 h-full">
            <h2 className="text-gray-600 font-medium">Filter area</h2>
            <div className="h-full flex flex-row gap-5">
                {notEmptyFilterAreas.map((filterArea, index) => {
                    return <FilterArea key={index} id={index} keyword={filterArea.keyword} />
                })}
                {notEmptyFilterAreas.length < 3 && (
                    <FilterArea
                        id={notEmptyFilterAreas.length}
                        keyword={filterAreas[notEmptyFilterAreas.length]?.keyword}
                    />
                )}

                <FileArea />
            </div>
        </section>
    )
}

export default FilterAreaContainer
