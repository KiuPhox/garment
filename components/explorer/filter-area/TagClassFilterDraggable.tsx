import type { Dnd } from '@/types/dnd'
import type { TagClassFilterDraggableProps } from '@/types/explorer'
import Utils from '@/utils'
import { useDraggable } from '@dnd-kit/core'
import Image from 'next/image'
import React from 'react'

const { String: S } = Utils

const TagClassFilterDraggable = ({ tagClass, tagAreaId, onRemoveClicked }: TagClassFilterDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `tag-class-${tagClass.id}`,
        data: {
            tagClass,
            tagAreaId,
            type: 'TagClassFromFilter',
        } as Dnd.TagClassFilterData,
    })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              overflow: 'visible',
          }
        : undefined

    const tagClassName = tagClass.name.length > 28 ? S.getShortName(tagClass.name, 28).concat('...') : tagClass.name

    return (
        <div ref={setNodeRef} style={style} className="flex justify-between bg-[#404451] px-3 py-2 rounded-md ">
            <div {...attributes} {...listeners} className="w-full">
                {tagClassName}
            </div>
            <div className="flex justify-center w-8 cursor-pointer" onClick={onRemoveClicked}>
                <Image src="/icons/cross.svg" alt="" width={12} height={12} />
            </div>
        </div>
    )
}

export default TagClassFilterDraggable
