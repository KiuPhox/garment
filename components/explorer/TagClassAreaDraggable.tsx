import { getAllTagsByTagClass, getTagClassById } from '@/lib/explorer'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import Image from 'next/image'
import React from 'react'

const TagClassAreaDraggable = ({
    id,
    tagClassId,
    onRemoveTagClass,
}: TagClassAreaDraggableProps) => {
    const tagClass = getTagClassById(tagClassId)!
    const tags = getAllTagsByTagClass(tagClassId)!

    const {
        attributes,
        listeners,
        setNodeRef: setDraggableNodeRef,
        transform,
    } = useDraggable({
        id: `tag-class-area-draggable-${id}`,
        data: {
            type: Dnd.Type.TagClassArea,
            tagAreaId: id,
            tagClass,
        } as Dnd.TagClassAreaData,
    })

    const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id: `tag-class-area-droppable-${id}`,
        data: {
            type: Dnd.Type.TagClassArea,
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
        onRemoveTagClass(tagClassId)
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
                    <div className="flex justify-between bg-gray-200 px-3 py-2 rounded-md ">
                        {tagClass.name}
                        <Image
                            className="cursor-pointer"
                            src="/icons/cross.svg"
                            alt=""
                            width={12}
                            height={12}
                            onClick={onRemoveClicked}
                        />
                    </div>
                </div>
                <div className="h-[1px] bg-gray-300"></div>
                <div className="flex flex-col gap-2">
                    <p className="text-gray-500 text-14 mb-3">Tag(s)</p>
                    {tags.map((tag) => (
                        <div
                            key={tag.id}
                            className="bg-gray-200 px-3 py-2 rounded-md"
                        >
                            {tag.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TagClassAreaDraggable
