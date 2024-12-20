import type { Dnd } from '@/types/dnd'
import type { TagClassDraggableProps } from '@/types/explorer'
import { useDraggable } from '@dnd-kit/core'
import React from 'react'

const TagClassDraggable = ({ tagClass }: TagClassDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `tag-class-${tagClass.id}`,
        data: {
            tagClass,
            type: 'TagClassFromContainer',
        } as Dnd.TagClassData,
    })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              overflow: 'visible',
          }
        : undefined

    return (
        <div
            ref={setNodeRef}
            className="flex flex-wrap"
            style={style}
            {...attributes}
            {...listeners}
        >
            <div
                key={tagClass.id}
                className="bg-gray-200  px-3 py-2 rounded-md"
            >
                {tagClass.name}
            </div>
        </div>
    )
}

export default TagClassDraggable
