import { getAllTagClasses, getTagClassById } from '@/lib/explorer'
import type { Dnd } from '@/types/dnd'
import type { TagClass } from '@/types/explorer'
import { createContext, useState } from 'react'

const TagsContext = createContext({
    tagClasses: [] as TagClass[],
    filterTagClasses: [] as (TagClass | undefined)[],
    setFilterTagClasses: (tagClasses: TagClass[]) => {},
    setTagClasses: (tagClasses: TagClass[]) => {},
})

const TagsDispatchContext = createContext({
    handleDragEnd: (
        activeData: Dnd.DragEndData,
        overData: Dnd.DragEndData,
    ) => {},
    deleteTagClassFromFilter: (tagClassId: number) => {},
})

export const TagsProvider = ({ children }: any) => {
    const [filterTagClasses, setFilterTagClasses] = useState<
        (TagClass | undefined)[]
    >([undefined, undefined, undefined])

    const [tagClasses, setTagClasses] = useState<TagClass[]>(getAllTagClasses())

    const handleDragEnd = (
        activeData: Dnd.DragEndData,
        overData: Dnd.DragEndData,
    ) => {
        if (
            activeData.type === 'TagClassFromContainer' &&
            overData.type === 'TagClassArea'
        ) {
            const tagClassId = (activeData as Dnd.TagClassData).tagClass.id
            const filterTagClass = (overData as Dnd.TagClassAreaData).tagClass
            if (filterTagClass) return

            const filterId = (overData as Dnd.TagClassAreaData).tagAreaId
            addTagClassToFilter(tagClassId, filterId)
        } else if (
            activeData.type === 'TagClassArea' &&
            overData.type === 'TagClassArea'
        ) {
            const sourceTagClass = (activeData as Dnd.TagClassAreaData).tagClass
            const sourceTagAreaId = (activeData as Dnd.TagClassAreaData)
                .tagAreaId

            const targetTagClass = (overData as Dnd.TagClassAreaData).tagClass
            const targetTagAreaId = (overData as Dnd.TagClassAreaData).tagAreaId

            if (!sourceTagClass || !targetTagClass) return

            switchTagClassFilter(
                sourceTagClass,
                sourceTagAreaId,
                targetTagClass,
                targetTagAreaId,
            )
        } else if (
            activeData.type === 'TagClassFromFilter' &&
            overData.type === 'TagClassArea'
        ) {
            const sourceTagClass = (activeData as Dnd.TagClassFilterData)
                .tagClass
            const sourceTagAreaId = (activeData as Dnd.TagClassFilterData)
                .tagAreaId
            const targetTagAreaId = (overData as Dnd.TagClassAreaData).tagAreaId
            const targetTagClass = (overData as Dnd.TagClassAreaData).tagClass

            if (!sourceTagClass || !targetTagClass) return

            switchTagClassFilter(
                sourceTagClass,
                sourceTagAreaId,
                targetTagClass,
                targetTagAreaId,
            )
        } else if (
            activeData.type === 'TagClassFromFilter' &&
            overData.type === 'TagClassContainer'
        ) {
            const tagClassId = (activeData as Dnd.TagClassFilterData).tagClass
                .id
            deleteTagClassFromFilter(tagClassId)
        }
    }

    const addTagClassToFilter = (tagClassId: number, filterId: number) => {
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

    const deleteTagClassFromFilter = (tagClassId: number) => {
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

    const switchTagClassFilter = (
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
        <TagsContext.Provider
            value={{
                tagClasses,
                filterTagClasses,
                setFilterTagClasses,
                setTagClasses,
            }}
        >
            <TagsDispatchContext.Provider
                value={{
                    handleDragEnd,
                    deleteTagClassFromFilter,
                }}
            >
                {children}
            </TagsDispatchContext.Provider>
        </TagsContext.Provider>
    )
}

export default TagsContext
export { TagsDispatchContext }
