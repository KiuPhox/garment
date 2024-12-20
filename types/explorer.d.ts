import type exp from 'constants'

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
    type: 'jpg' | 'png' | 'pdf'
    owner: string
    size: number
}

export interface TagClassAreaProps {
    id: number
    tagClassId?: number
    tagId?: number
}

export interface TagClassAreaDraggableProps {
    id: number
    tagClassId: number
    tagId?: number
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

export interface TagFilterProps {
    tag: Tag
    onSelected: (tag: Tag) => void
    onUnselected: (tag: Tag) => void
}

export interface FileAreaResultProps {
    files: ExplorerFile[]
}

export interface FileContainerProps {
    file: ExplorerFile
}
