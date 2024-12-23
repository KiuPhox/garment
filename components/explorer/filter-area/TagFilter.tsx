import type { TagFilterProps } from '@/types/explorer'
import React, { useContext } from 'react'
import Utils from '@/utils'
import TagsContext from '@/contexts/TagsContext'
import { getAllFilesByTags } from '@/lib/explorer'

const { String: S } = Utils

const TagFilter = ({ tag, onSelected: handleOnSelected, onUnselected: handleOnUnselected }: TagFilterProps) => {
    const { tagClassAreas } = useContext(TagsContext)

    const isSelected = tagClassAreas.find((t) => t?.tagId === tag.id) !== undefined

    const files = getAllFilesByTags([tag.id])

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
                { 'bg-gray-200': !isSelected },
                { 'bg-orange-200': isSelected },
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
