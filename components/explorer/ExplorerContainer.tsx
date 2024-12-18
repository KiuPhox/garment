import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import React, { useContext } from 'react'
import FilterArea from './FilterArea'
import TagClassContainer from './TagClassContainer'
import { TagsDispatchContext } from '@/contexts/TagsContext'
import type { Dnd } from '@/types/dnd'

const ExplorerContainer = () => {
    const { handleDragEnd } = useContext(TagsDispatchContext)

    const onDragEnd = (e: DragEndEvent) => {
        if (!e.over) return

        const activeData = e.active.data.current as Dnd.DragEndData
        const overData = e.over.data.current as Dnd.DragEndData

        handleDragEnd(activeData, overData)
    }

    return (
        <DndContext onDragEnd={onDragEnd} autoScroll={false}>
            <TagClassContainer />
            <FilterArea />
        </DndContext>
    )
}

export default ExplorerContainer

