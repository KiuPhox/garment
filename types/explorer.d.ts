export interface TagClass {
    id: number
    name: string
}

export interface Tag {
    id: number
    tagClassId: number
    name: string
}

export interface ExplorerFile {
    id: number
    name: string
    tags: number[]
}

export interface TagClassAreaProps {
    id: number
    tagClassId?: number
}

export interface TagClassAreaDraggableProps {
    id: number
    tagClassId: number
}

export interface TagClassDraggableProps {
    tagClass: TagClass
}

export type TagClassFilterDraggableProps = {
    tagAreaId: number
    onRemoveClicked: () => void
} & TagClassDraggableProps

export interface TagClassAreaDroppableProps {
    id: number
}
