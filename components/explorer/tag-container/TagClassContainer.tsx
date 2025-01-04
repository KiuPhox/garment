'use client'

import { useContext, useState } from 'react'
import Image from 'next/image'
import TagClassDraggable from './TagClassDraggable'
import { useDroppable } from '@dnd-kit/core'
import type { Dnd } from '@/types/dnd'
import TagsContext from '@/contexts/TagsContext'
import { cn } from '@/lib/utils'

const TagClassContainer = () => {
    const [expanded, setExpanded] = useState(false)
    const { tagClasses } = useContext(TagsContext)

    const { setNodeRef } = useDroppable({
        id: 'tag-class-container-droppable',
        data: {
            type: 'TagClassContainer',
        } as Dnd.DragEndData,
    })

    const handleExpandClick = () => {
        setExpanded((prev) => !prev)
    }

    return (
        <section ref={setNodeRef} className="flex flex-col gap-2">
            <div className="flex gap-2">
                <h2 className="text-gray-600 font-medium">Tag class</h2>
                <Image
                    src="/icons/expand.svg"
                    width={16}
                    height={16}
                    alt="Add tag class"
                    className="cursor-pointer"
                    onClick={handleExpandClick}
                />
            </div>
            <div
                className={cn(
                    'bg-[#353a46] w-full rounded-md transition-all overflow-hidden h-full',
                    { 'max-h-[500px]': expanded },
                    { 'max-h-[120px]': !expanded },
                )}>
                <div className="flex flex-wrap gap-2 m-2">
                    {tagClasses.map((tagClass) => (
                        <TagClassDraggable key={tagClass.id} tagClass={tagClass} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TagClassContainer
