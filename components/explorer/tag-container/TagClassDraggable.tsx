import { cn } from '@/lib/utils'
import type { Dnd } from '@/types/dnd'
import type { TagClassDraggableProps } from '@/types/explorer'
import { useDraggable } from '@dnd-kit/core'
import React from 'react'

const TagClassDraggable = ({ tagClass }: TagClassDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `tag-class-${tagClass.id}`,
        data: {
            tagClass,
            type: 'TagClassFromContainer',
        } as Dnd.TagClassData,
    })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined

    return (
        <div className="flex flex-wrap" {...attributes} {...listeners}>
            <div key={tagClass.id} className={cn('bg-[#404451] px-3 py-2 rounded-md', { 'opacity-0': isDragging })}>
                {tagClass.name}
            </div>

            <div ref={setNodeRef} className="flex flex-wrap absolute" style={style}>
                <div className={cn('bg-[#404451] px-3 py-2 rounded-md', { 'opacity-0': !isDragging })}>
                    {tagClass.name}
                </div>
            </div>
        </div>
    )
}

export default TagClassDraggable
