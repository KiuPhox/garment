import { useDraggable, useDroppable } from '@dnd-kit/core'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import KeywordFilterDraggable from './KeywordFilterDraggable'
import type { FilterAreaDraggableProps } from '@/types/explorer'
import type { Dnd } from '@/types/dnd'
import { ExplorerDispatchContext } from '@/contexts/ExplorerContext'
import TagFilter from './TagFilter'
import type { TagType } from '@/lib/models/tag.model'
import { getTagsByKeyword } from '@/lib/actions/tag.actions'

const FilterAreaDraggable = ({ id, keyword }: FilterAreaDraggableProps) => {
    const [tags, setTags] = useState<TagType[]>([])

    useEffect(() => {
        const fetchTags = async () => {
            const tags = await getTagsByKeyword(keyword)
            setTags(tags)
        }
        fetchTags()
    }, [keyword])

    const {
        deleteKeywordFromFilterArea: handleRemoveKeyword,
        selectTagFromFilterArea,
        deleteTagFromFilterArea,
    } = useContext(ExplorerDispatchContext)

    const {
        attributes,
        listeners,
        setNodeRef: setDraggableNodeRef,
        transform,
    } = useDraggable({
        id: `filter-area-draggable-${id}`,
        data: {
            type: 'FilterArea',
            filterAreaId: id,
            keyword,
        } as Dnd.FilterAreaData,
    })

    const { setNodeRef: setDroppableNodeRef } = useDroppable({
        id: `tag-class-area-droppable-${id}`,
        data: {
            type: 'FilterArea',
            filterAreaId: id,
            keyword,
        } as Dnd.FilterAreaData,
    })

    const style = transform
        ? {
              transform: `translateX(${transform.x}px)`,
              overflow: 'visible',
          }
        : undefined

    const onKeywordRemoveClicked = () => {
        handleRemoveKeyword(keyword)
    }

    const onTagSelected = (tag: TagType) => {
        selectTagFromFilterArea(tag, id)
    }

    const onTagUnselected = (tag: TagType) => {
        deleteTagFromFilterArea(id)
    }

    return (
        <div ref={setDraggableNodeRef} className="flex h-full bg-[#353a46] rounded-lg" style={style}>
            <div ref={setDroppableNodeRef} className="flex flex-1 flex-col mx-2 my-4 gap-3">
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center mb-5">
                        <p className="text-gray-500 text-14">Tag class</p>
                        <Image src="/icons/dots.svg" alt="" width={16} height={16} {...listeners} {...attributes} />
                    </div>
                    <KeywordFilterDraggable
                        keyword={keyword}
                        filterAreaId={id}
                        onRemoveClicked={onKeywordRemoveClicked}
                    />
                </div>
                <div className="h-[1px] bg-gray-300" />
                <div className="flex flex-col gap-2">
                    <p className="text-gray-500 text-14 mb-3">Tag(s)</p>
                    {tags.map((tag) => (
                        <TagFilter tag={tag} key={tag.id} onSelected={onTagSelected} onUnselected={onTagUnselected} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FilterAreaDraggable
