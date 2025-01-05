import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import React, { useContext } from 'react'
import KeywordContainer from './keyword-container/KeywordContainer'
import { ExplorerDispatchContext } from '@/contexts/ExplorerContext'
import type { Dnd } from '@/types/dnd'
import FilterAreaContainer from './filter-area/FilterAreaContainer'

const ExplorerContainer = () => {
    const { handleDragEnd } = useContext(ExplorerDispatchContext)

    const onDragEnd = (e: DragEndEvent) => {
        if (!e.over) return

        const activeData = e.active.data.current as Dnd.DragEndData
        const overData = e.over.data.current as Dnd.DragEndData

        handleDragEnd(activeData, overData)
    }

    return (
        <DndContext onDragEnd={onDragEnd} autoScroll={false}>
            <KeywordContainer />
            <FilterAreaContainer />
        </DndContext>
    )
}

export default ExplorerContainer
