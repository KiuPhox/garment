import type { TagFilterProps } from '@/types/explorer'
import React, { useContext } from 'react'
import Utils from '@/utils'
import TagsContext from '@/contexts/TagsContext'

const { String: S } = Utils

const TagFilter = ({
    tag,
    onSelected: handleOnSelected,
    onUnselected: handleOnUnselected,
}: TagFilterProps) => {
    const { tagClassAreas } = useContext(TagsContext)

    const isSelected =
        tagClassAreas.find((t) => t?.tagId === tag.id) !== undefined

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
            )}
            onClick={handleOnClicked}
        >
            {tag.name.length > 28
                ? S.getShortName(tag.name, 28).concat('...')
                : tag.name}
        </div>
    )
}

export default TagFilter
