'use client'

import FilterArea from '@/components/explorer/FilterArea'
import TagClassContainer from '@/components/explorer/TagClassContainer'
import { TagsDispatchContext, TagsProvider } from '@/contexts/TagsContext'
import type { Dnd } from '@/types/dnd'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import React, { useContext } from 'react'

const Explorer = () => {
    const { handleDragEnd } = useContext(TagsDispatchContext)

    const onDragEnd = (e: DragEndEvent) => {
        if (!e.over) return

        const activeData = e.active.data.current as Dnd.DragEndData
        const overData = e.over.data.current as Dnd.DragEndData

        handleDragEnd(activeData, overData)
    }

    return (
        <section className="explorer gap-5">
            <h1 className="page-label">Explorer</h1>
            <TagsProvider>
                <DndContext onDragEnd={onDragEnd} autoScroll={false}>
                    <TagClassContainer />
                    <FilterArea />
                </DndContext>
            </TagsProvider>
        </section>
    )
}

export default Explorer
