import { cn } from '@/lib/utils'
import type { Dnd } from '@/types/dnd'
import type { KeywordDraggableProps } from '@/types/explorer'
import { useDraggable } from '@dnd-kit/core'
import React from 'react'

const KeywordDraggable = ({ keyword }: KeywordDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: `tag-class-${keyword.id}`,
        data: {
            keyword,
            type: 'KeywordFromContainer',
        } as Dnd.KeywordData,
    })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined

    return (
        <div className="flex flex-wrap" {...attributes} {...listeners}>
            <div key={keyword.id} className={cn('bg-[#404451] px-3 py-2 rounded-md', { 'opacity-0': isDragging })}>
                {keyword.name}
            </div>

            <div ref={setNodeRef} className="flex flex-wrap absolute" style={style}>
                <div className={cn('bg-[#404451] px-3 py-2 rounded-md', { 'opacity-0': !isDragging })}>
                    {keyword.name}
                </div>
            </div>
        </div>
    )
}

export default KeywordDraggable
