import { useDraggable } from '@dnd-kit/core'
import Image from 'next/image'
import React from 'react'

const TagClassFilterDraggable = ({
    tagClass,
    onRemoveClicked,
}: TagCLassFilterDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `tag-class-${tagClass.id}`,
        data: {
            tagClass,
            type: 'TagClassFromFilter',
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
            style={style}
            className="flex justify-between bg-gray-200 px-3 py-2 rounded-md "
        >
            <div {...attributes} {...listeners} className="w-full">
                {tagClass.name}
            </div>
            <div
                className="flex justify-center w-8 cursor-pointer"
                onClick={onRemoveClicked}
            >
                <Image src="/icons/cross.svg" alt="" width={12} height={12} />
            </div>
        </div>
    )
}

export default TagClassFilterDraggable

