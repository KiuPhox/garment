import type { Dnd } from '@/types/dnd'
import type { TagClassAreaDroppableProps } from '@/types/explorer'
import { useDroppable } from '@dnd-kit/core'
import React from 'react'

const TagClassAreaDroppable = ({ id }: TagClassAreaDroppableProps) => {
    const { setNodeRef } = useDroppable({
        id: `tag-class-area-droppable-${id}`,
        data: {
            tagAreaId: id,
            tagClass: undefined,
            type: 'TagClassArea',
        } as Dnd.TagClassAreaData,
    })

    return (
        <div
            ref={setNodeRef}
            className="flex h-full items-center justify-center rounded-md bg-gray-100 border-2 border-gray-300 border-dashed"
        >
            <p className="text-gray-400">
                Drag and drop<br></br>tag class here
            </p>
        </div>
    )
}

export default TagClassAreaDroppable
