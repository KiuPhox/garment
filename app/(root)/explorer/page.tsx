'use client'

import FilterArea from '@/components/explorer/FilterArea'
import TagClassContainer from '@/components/explorer/TagClassContainer'
import { getAllTagClasses, getTagClassById } from '@/lib/explorer'
import { DndContext, type DragEndEvent } from '@dnd-kit/core'
import React, { useState } from 'react'

const Explorer = () => {
    const [filterTagClasses, setFilterTagClasses] = useState<
        (TagClass | undefined)[]
    >([undefined, undefined, undefined])

    const [tagClasses, setTagClasses] = useState<TagClass[]>(getAllTagClasses())

    const handleDragEnd = (e: DragEndEvent) => {
        if (!e.over) return

        if (e.active.data.current?.type === 'tagClassAreaSwitch') {
            const { tagClass: sourceTagClass, tagAreaId: sourceTagAreaId } = e
                .active.data.current as {
                tagClass: TagClass
                tagAreaId: number
            }
            const { tagClass: targetTagClass, tagAreaId: targetTagAreaId } = e
                .over.data.current as { tagClass: TagClass; tagAreaId: number }

            switchTagClasses(
                sourceTagClass,
                sourceTagAreaId,
                targetTagClass,
                targetTagAreaId,
            )

            return
        }

        const tagClass = e.active.data.current?.tagClass as TagClass
        const filterId = e.over.data.current?.id as number
        if (!tagClass || typeof filterId !== 'number') return

        moveTagClassToFilter(tagClass.id, filterId)
    }

    const moveTagClassToFilter = (tagClassId: number, filterId: number) => {
        const selectedTagClass = tagClasses.find(
            (tagClass) => tagClass.id === tagClassId,
        )
        if (!selectedTagClass) return

        const updatedFilterTagClasses = [...filterTagClasses]
        updatedFilterTagClasses[filterId] = selectedTagClass
        setFilterTagClasses(updatedFilterTagClasses)

        const updatedTagClasses = tagClasses.filter(
            (tagClass) => !updatedFilterTagClasses.includes(tagClass),
        )
        setTagClasses(updatedTagClasses)
    }

    const removeTagClassFromFilter = (tagClassId: number) => {
        const updatedFilterTagClasses = filterTagClasses.map((tagClass) =>
            tagClass?.id === tagClassId ? undefined : tagClass,
        )
        const notEmptyTagClasses = updatedFilterTagClasses.filter(
            (tagClass) => tagClass,
        )

        //? Add empty tag class area if there are less than 3 tag classes
        if (notEmptyTagClasses.length < 3) {
            notEmptyTagClasses.push(undefined)
        }

        setFilterTagClasses(notEmptyTagClasses)

        const tagClass = getTagClassById(tagClassId)!
        setTagClasses([...tagClasses, tagClass])

        return updatedFilterTagClasses
    }

    const switchTagClasses = (
        sourceTagClass: TagClass,
        sourceTagAreaId: number,
        targetTagClass: TagClass,
        targetTagAreaId: number,
    ) => {
        if (!targetTagClass || !sourceTagClass) return

        const updatedFilterTagClasses = [...filterTagClasses]
        updatedFilterTagClasses[sourceTagAreaId] = targetTagClass
        updatedFilterTagClasses[targetTagAreaId] = sourceTagClass

        setFilterTagClasses(updatedFilterTagClasses)
    }

    return (
        <section className="explorer gap-5">
            <h1 className="page-label">Explorer</h1>
            <DndContext onDragEnd={handleDragEnd} autoScroll={false}>
                <TagClassContainer tagClasses={tagClasses} />
                <FilterArea
                    tagClasses={filterTagClasses}
                    onRemoveTagClass={removeTagClassFromFilter}
                />
            </DndContext>
        </section>
    )
}

export default Explorer
