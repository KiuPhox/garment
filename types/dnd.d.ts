import type { KeywordSchema, KeywordType } from '@/lib/models/keyword.model'

namespace Dnd {
    const DndTypes = {
        KeywordContainer: 'keyword-container',
        KeywordFromContainer: 'keyword-from-container',
        KeywordFromFilter: 'keyword-from-filter',
        FilterArea: 'filter-area',
    }
    type DndType = keyof typeof DndTypes

    type DragEndData = {
        type: DndType
    }

    type KeywordData = {
        keyword: KeywordType
    } & DragEndData

    type KeywordFromFilterData = {
        filterAreaId: number
    } & KeywordData

    type FilterAreaData = {
        filterAreaId: number
        keyword?: KeywordType
    } & DragEndData
}
