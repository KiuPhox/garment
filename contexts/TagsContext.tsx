import { getAllFiles, getAllTagClasses, getAllTagsByTagClass, getTagById, getTagClassById } from '@/lib/explorer'
import type { Dnd } from '@/types/dnd'
import type { ExplorerFile, Tag, TagClass, TagClassAreaProps } from '@/types/explorer'
import { createContext, useState } from 'react'

type TagClassArea = Omit<TagClassAreaProps, 'id'> | undefined

const TagsContext = createContext({
    tagClasses: [] as TagClass[],
    tagClassAreas: [] as TagClassArea[],

    setTagClasses: (tagClasses: TagClass[]) => {},
    setTagClassAreas: (tagClassAreas: TagClassArea[]) => {},
})

const TagsDispatchContext = createContext({
    handleDragEnd: (activeData: Dnd.DragEndData, overData: Dnd.DragEndData) => {},
    selectTagFromArea: (tag: Tag, areaId: number) => {},
    deleteTagFromArea: (areaId: number) => {},
    deleteTagClassFromArea: (tagClassId: number) => {},
})

export const TagsProvider = ({ children }: any) => {
    const [tagClasses, setTagClasses] = useState<TagClass[]>(getAllTagClasses())

    const [tagClassAreas, setTagClassAreas] = useState<TagClassArea[]>([undefined, undefined, undefined])

    const handleDragEnd = (activeData: Dnd.DragEndData, overData: Dnd.DragEndData) => {
        if (activeData.type === 'TagClassFromContainer' && overData.type === 'TagClassArea') {
            const tagClassId = (activeData as Dnd.TagClassData).tagClass.id
            const tagClassAreaId = (overData as Dnd.TagClassAreaData).tagAreaId

            addTagClassToArea(tagClassId, tagClassAreaId)
        } else if (activeData.type === 'TagClassArea' && overData.type === 'TagClassArea') {
            const sourceTagAreaId = (activeData as Dnd.TagClassAreaData).tagAreaId

            const targetTagAreaId = (overData as Dnd.TagClassAreaData).tagAreaId

            switchTagClassArea(sourceTagAreaId, targetTagAreaId)
        } else if (activeData.type === 'TagClassFromFilter' && overData.type === 'TagClassArea') {
            const sourceTagAreaId = (activeData as Dnd.TagClassFilterData).tagAreaId
            const targetTagAreaId = (overData as Dnd.TagClassAreaData).tagAreaId

            switchTagClassArea(sourceTagAreaId, targetTagAreaId)
        } else if (activeData.type === 'TagClassFromFilter' && overData.type === 'TagClassContainer') {
            const tagClassId = (activeData as Dnd.TagClassFilterData).tagClass.id
            deleteTagClassFromArea(tagClassId)
        }
    }

    const addTagClassToArea = (tagClassId: number, tagAreaId: number) => {
        const selectedTagClass = tagClasses.find((tagClass) => tagClass.id === tagClassId)
        if (!selectedTagClass) return

        const updatedTagClassAreas = [...tagClassAreas]
        updatedTagClassAreas[tagAreaId] = {
            tagClassId,
            tagId: undefined,
        }

        setTagClassAreas(updatedTagClassAreas)
        updateTagClassContainer(updatedTagClassAreas)
    }

    const deleteTagClassFromArea = (tagClassId: number) => {
        const updatedTagClassAreas = tagClassAreas.map((tagClassArea) => {
            if (tagClassArea?.tagClassId === tagClassId) {
                return undefined
            }
            return tagClassArea
        })
        const notEmptyAreas = updatedTagClassAreas.filter((tagClassArea) => tagClassArea)

        //? Add empty tag class area if there are less than 3 tag classes
        if (notEmptyAreas.length < 3) {
            notEmptyAreas.push(undefined)
        }

        setTagClassAreas(notEmptyAreas)
        updateTagClassContainer(notEmptyAreas)
    }

    const selectTagFromArea = (tag: Tag, areaId: number) => {
        const updatedTagClassAreas = [...tagClassAreas]
        updatedTagClassAreas[areaId] = {
            tagClassId: tag.tagClassId,
            tagId: tag.id,
        }

        setTagClassAreas(updatedTagClassAreas)
    }

    const deleteTagFromArea = (areaId: number) => {
        const updatedTagClassAreas = [...tagClassAreas]
        const tagArea = updatedTagClassAreas[areaId]
        if (!tagArea) return

        updatedTagClassAreas[areaId] = {
            tagClassId: tagArea.tagClassId,
            tagId: undefined,
        }

        setTagClassAreas(updatedTagClassAreas)
    }

    const switchTagClassArea = (sourceTagAreaId: number, targetTagAreaId: number) => {
        const sourceTagArea = tagClassAreas[sourceTagAreaId]
        const targetTagArea = tagClassAreas[targetTagAreaId]

        if (!sourceTagArea?.tagClassId || !targetTagArea?.tagClassId) return

        const updatedTagClassAreas = [...tagClassAreas]
        updatedTagClassAreas[sourceTagAreaId] = targetTagArea
        updatedTagClassAreas[targetTagAreaId] = sourceTagArea

        setTagClassAreas(updatedTagClassAreas)
    }

    const updateTagClassContainer = (tagClassAreas: TagClassArea[]) => {
        const tagClassAreaIds = tagClassAreas
            .map((tagClassArea) => tagClassArea?.tagClassId)
            .filter((id) => id !== undefined)
        const allTagClasses = getAllTagClasses()

        if (tagClassAreaIds.length === 0) {
            setTagClasses(allTagClasses)
            return
        }
        const tagsInTagClassAreas: Tag[] = []

        for (const tagClassId of tagClassAreaIds) {
            const tags = getAllTagsByTagClass(tagClassId)
            tagsInTagClassAreas.push(...tags)
        }

        const allFiles = getAllFiles()

        const filesWithTagClassesInArea: ExplorerFile[] = []

        for (const file of allFiles) {
            if (file.tags.some((tagId) => tagsInTagClassAreas.find((tag) => tag.id === tagId))) {
                filesWithTagClassesInArea.push(file)
            }
        }

        const allTagsWithFiles = filesWithTagClassesInArea
            .flatMap((file) => file.tags)
            .map((tagId) => getTagById(tagId))
            .filter((tag) => tag !== undefined) as Tag[]

        const allTagClassesWithFiles = Array.from(
            new Set(allTagsWithFiles.map((tag) => getTagClassById(tag?.tagClassId))),
        ).filter((tagClass) => tagClass !== undefined && !tagClassAreaIds.includes(tagClass.id)) as TagClass[]

        setTagClasses(allTagClassesWithFiles)
    }

    return (
        <TagsContext.Provider
            value={{
                tagClasses,
                tagClassAreas,
                setTagClasses,
                setTagClassAreas,
            }}>
            <TagsDispatchContext.Provider
                value={{
                    handleDragEnd,
                    selectTagFromArea,
                    deleteTagFromArea,
                    deleteTagClassFromArea,
                }}>
                {children}
            </TagsDispatchContext.Provider>
        </TagsContext.Provider>
    )
}

export default TagsContext
export { TagsDispatchContext }
