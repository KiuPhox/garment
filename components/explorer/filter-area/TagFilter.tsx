import type { TagFilterProps } from '@/types/explorer'
import React, { useContext } from 'react'
import Utils from '@/utils'
import ExplorerContext from '@/contexts/ExplorerContext'

const { String: S } = Utils

const TagFilter = ({ tag, onSelected: handleOnSelected, onUnselected: handleOnUnselected }: TagFilterProps) => {
    const { filterAreas } = useContext(ExplorerContext)

    const isSelected = filterAreas.find((filterArea) => filterArea?.tagId === tag.id) !== undefined

    //? TODO: get files from tag
    const files = []

    const handleOnClicked = () => {
        if (isSelected) {
            handleOnUnselected(tag)
        } else {
            handleOnSelected(tag)
        }
    }

    return (
        <div
            className={S.className(
                { 'bg-[#404451]': !isSelected },
                { 'bg-[#2b3541]': isSelected },
                { 'text-[#67bdd5]': isSelected },
                'px-3',
                'py-2',
                'rounded-md',
                'cursor-pointer',
                'flex',
                'justify-between',
                'items-center',
            )}
            onClick={handleOnClicked}>
            <div>{tag.name.length > 28 ? S.getShortName(tag.name, 28).concat('...') : tag.name}</div>
            <div className="text-12">({files.length})</div>
        </div>
    )
}

export default TagFilter
