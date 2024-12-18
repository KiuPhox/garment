import { useDraggable } from '@dnd-kit/core'
import React from 'react'

const TagClassDraggable = ({ tagClass }: TagClassDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `tag-class-${tagClass.id}`,
        data: { tagClass },
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
            className="m-1 flex flex-wrap"
            style={style}
            {...attributes}
            {...listeners}
        >
            <div
                key={tagClass.id}
                className="bg-gray-200 m-1 px-3 py-2 rounded-md"
            >
                {tagClass.name}
            </div>
        </div>
    )
}

export default TagClassDraggable
