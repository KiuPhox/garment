import React from 'react'
import TagClassAreaDraggable from './TagClassAreaDraggable'
import TagClassAreaDroppable from './TagClassAreaDroppable'
import type { TagClassAreaProps } from '@/types/explorer'

const TagClassArea = ({ tagClassId, id }: TagClassAreaProps) => {
    return (
        <div className="flex-1 max-w-72">
            {tagClassId ? <TagClassAreaDraggable id={id} tagClassId={tagClassId} /> : <TagClassAreaDroppable id={id} />}
        </div>
    )
}

export default TagClassArea
