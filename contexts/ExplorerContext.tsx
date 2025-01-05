import { getFilesWithTags } from '@/lib/actions/file.actions'
import { getAllKeywords } from '@/lib/actions/keyword.actions'
import type { ExplorerFileType } from '@/lib/models/file.model'
import type { KeywordType } from '@/lib/models/keyword.model'
import type { TagType } from '@/lib/models/tag.model'
import type { Dnd } from '@/types/dnd'
import type { FilterAreaProps } from '@/types/explorer'
import { createContext, useEffect, useState } from 'react'

type FilterArea = Omit<FilterAreaProps, 'id'> | undefined

const ExplorerContext = createContext({
    keywords: [] as KeywordType[],
    visibleKeywords: [] as KeywordType[],
    filterAreas: [] as FilterArea[],
    files: [] as ExplorerFileType[],
})

const ExplorerDispatchContext = createContext({
    handleDragEnd: (activeData: Dnd.DragEndData, overData: Dnd.DragEndData) => {},
    selectTagFromFilterArea: (tag: TagType, filterAreaId: number) => {},
    deleteTagFromFilterArea: (filterAreaId: number) => {},
    deleteKeywordFromFilterArea: (keyword: KeywordType) => {},
    fetchFiles: async () => {},
})

export const ExplorerProvider = ({ children }: any) => {
    const [keywords, setKeywords] = useState<KeywordType[]>([])
    const [visibleKeywords, setVisibleKeywords] = useState<KeywordType[]>([])
    const [filterAreas, setFilterAreas] = useState<FilterArea[]>([undefined, undefined, undefined])
    const [files, setFiles] = useState<ExplorerFileType[]>([])

    useEffect(() => {
        const fetchKeywords = async () => {
            const keywords = await getAllKeywords()
            setKeywords(keywords)
            updateVisibleKeywords({ keywords })
        }
        fetchKeywords()
    }, [])

    useEffect(() => {
        fetchFiles()
    }, [filterAreas])

    const handleDragEnd = (activeData: Dnd.DragEndData, overData: Dnd.DragEndData) => {
        if (activeData.type === 'KeywordFromContainer' && overData.type === 'FilterArea') {
            const { keyword } = activeData as Dnd.KeywordData
            const { filterAreaId } = overData as Dnd.FilterAreaData

            addKeywordToFilterArea(keyword, filterAreaId)
        } else if (activeData.type === 'FilterArea' && overData.type === 'FilterArea') {
            const sourceFilterAreaId = (activeData as Dnd.FilterAreaData).filterAreaId
            const targetFilterAreaId = (overData as Dnd.FilterAreaData).filterAreaId

            switchFilterArea(sourceFilterAreaId, targetFilterAreaId)
        } else if (activeData.type === 'KeywordFromFilter' && overData.type === 'FilterArea') {
            const sourceFilterAreaId = (activeData as Dnd.KeywordFromFilterData).filterAreaId
            const targetFilterAreaId = (overData as Dnd.FilterAreaData).filterAreaId

            switchFilterArea(sourceFilterAreaId, targetFilterAreaId)
        } else if (activeData.type === 'KeywordFromFilter' && overData.type === 'KeywordContainer') {
            const { keyword } = activeData as Dnd.KeywordFromFilterData
            deleteKeywordFromFilterArea(keyword)
        }
    }

    const addKeywordToFilterArea = (keyword: KeywordType, filterAreaId: number) => {
        const selectedKeyword = keywords.find((k) => k.id === keyword.id)
        if (!selectedKeyword) return

        const updatedFilterAreas = [...filterAreas]
        updatedFilterAreas[filterAreaId] = {
            keyword: keyword,
            tagId: undefined,
        }

        setFilterAreas(updatedFilterAreas)
        updateVisibleKeywords({ filterArea: updatedFilterAreas })
    }

    const deleteKeywordFromFilterArea = (keyword: KeywordType) => {
        const updatedFilterAreas = filterAreas.map((filterArea) => {
            if (filterArea?.keyword?.id === keyword.id) {
                return undefined
            }
            return filterArea
        })
        const notEmptyAreas = updatedFilterAreas.filter((filterArea) => filterArea)

        //? Add empty tag class area if there are less than 3 tag classes
        if (notEmptyAreas.length < 3) {
            notEmptyAreas.push(undefined)
        }

        setFilterAreas(notEmptyAreas)
        updateVisibleKeywords({ filterArea: notEmptyAreas })
    }

    const selectTagFromFilterArea = (tag: TagType, areaId: number) => {
        const updatedFilterAreas = [...filterAreas]

        updatedFilterAreas[areaId] = {
            keyword: updatedFilterAreas[areaId]?.keyword,
            tagId: tag.id,
        }

        setFilterAreas(updatedFilterAreas)
    }

    const deleteTagFromFilterArea = (filterAreaId: number) => {
        const updatedFilterAreas = [...filterAreas]
        const filterArea = updatedFilterAreas[filterAreaId]
        if (!filterArea) return

        updatedFilterAreas[filterAreaId] = {
            keyword: filterArea.keyword,
            tagId: undefined,
        }

        setFilterAreas(updatedFilterAreas)
    }

    const switchFilterArea = (sourceFilterAreaId: number, targetFilterAreaId: number) => {
        const sourceTagArea = filterAreas[sourceFilterAreaId]
        const targetTagArea = filterAreas[targetFilterAreaId]

        if (!sourceTagArea?.keyword || !targetTagArea?.keyword) return

        const updatedFilterAreas = [...filterAreas]
        updatedFilterAreas[sourceFilterAreaId] = targetTagArea
        updatedFilterAreas[targetFilterAreaId] = sourceTagArea

        setFilterAreas(updatedFilterAreas)
    }

    const updateVisibleKeywords = (payload: { keywords?: KeywordType[]; filterArea?: FilterArea[] }) => {
        const correctKeywords = payload?.keywords || keywords
        const correctFilterAreas = payload?.filterArea || filterAreas

        const visibleKeywords = correctKeywords.filter((keyword) => {
            return !correctFilterAreas.find((filterArea) => filterArea?.keyword?.id === keyword.id)
        })

        setVisibleKeywords(visibleKeywords)
    }

    const fetchFiles = async () => {
        const tags: string[] = []

        for (const filterArea of filterAreas) {
            if (filterArea && filterArea.tagId !== undefined) {
                tags.push(filterArea.tagId)
            }
        }

        const fileResults = await getFilesWithTags(tags)
        setFiles(fileResults)
    }

    return (
        <ExplorerContext.Provider
            value={{
                filterAreas,
                keywords,
                visibleKeywords,
                files,
            }}>
            <ExplorerDispatchContext.Provider
                value={{
                    handleDragEnd,
                    selectTagFromFilterArea,
                    deleteTagFromFilterArea,
                    deleteKeywordFromFilterArea,
                    fetchFiles,
                }}>
                {children}
            </ExplorerDispatchContext.Provider>
        </ExplorerContext.Provider>
    )
}

export default ExplorerContext
export { ExplorerDispatchContext }
