import type { TagClass } from './explorer'

namespace Dnd {
    const DndTypes = {
        TagClassContainer = 'tag-class-container',
        TagClassFromContainer = 'tag-class-from-container',
        TagClassFromFilter = 'tag-class-from-filter',
        TagClassArea = 'tag-class-area',
    }
    type DndType = keyof typeof DndTypes

    type DragEndData = {
        type: DndType
    }

    type TagClassData = {
        tagClass: TagClass
    } & DragEndData

    type TagClassFilterData = {
        tagAreaId: number
    } & TagClassData

    type TagClassAreaData = {
        tagAreaId: number
        tagClass?: TagClass
    } & DragEndData
}
