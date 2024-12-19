import { getAllTagsByTagClass, getTagClassById } from '@/lib/explorer'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import Image from 'next/image'
import React, { useContext } from 'react'
import TagClassFilterDraggable from './TagClassFilterDraggable'
import type { TagClassAreaDraggableProps } from '@/types/explorer'
import type { Dnd } from '@/types/dnd'
import { TagsDispatchContext } from '@/contexts/TagsContext'
import Utils from '@/utils'

const { String: S } = Utils

const TagClassAreaDraggable = ({
    id,
    tagClassId,
}: TagClassAreaDraggableProps) => {
    const tagClass = getTagClassById(tagClassId)!
    const tags = getAllTagsByTagClass(tagClassId)!
    const { deleteTagClassFromFilter: handleRemoveTagClass } =
        useContext(TagsDispatchContext)

    const {
        attributes,
        listeners,
        setNodeRef: setDraggableNodeRef,
        transform,
    } = useDraggable({
        id: `tag-class-area-draggable-${id}`,
        data: {
            type: 'TagClassArea',
            tagAreaId: id,
            tagClass,
        } as Dnd.TagClassAreaData,
    })

    const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id: `tag-class-area-droppable-${id}`,
        data: {
            type: 'TagClassArea',
            tagAreaId: id,
            tagClass,
        } as Dnd.TagClassAreaData,
    })

    const style = transform
        ? {
              transform: `translateX(${transform.x}px)`,
              overflow: 'visible',
          }
        : undefined

    const onRemoveClicked = () => {
        handleRemoveTagClass(tagClassId)
    }

    return (
        <div
            ref={setDraggableNodeRef}
            className="flex h-full bg-white rounded-lg"
            style={style}
        >
            <div
                ref={setDroppableNodeRef}
                className="flex flex-1 flex-col mx-2 my-4 gap-3"
            >
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center mb-5">
                        <p className="text-gray-500 text-14">Tag class</p>
                        <Image
                            src="/icons/dots.svg"
                            alt=""
                            width={16}
                            height={16}
                            {...listeners}
                            {...attributes}
                        />
                    </div>
                    <TagClassFilterDraggable
                        tagClass={tagClass}
                        tagAreaId={id}
                        onRemoveClicked={onRemoveClicked}
                    />
                </div>
                <div className="h-[1px] bg-gray-300"></div>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-500 text-14 mb-3">Tag(s)</p>
                    {tags.map((tag) => (
                        <div
                            key={tag.id}
                            className="bg-gray-200 px-3 py-2 rounded-md"
                        >
                            {tag.name.length > 28
                                ? S.getShortName(tagClass.name, 28).concat(
                                      '...',
                                  )
                                : tag.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TagClassAreaDraggable