import type { ExplorerFileType } from '@/lib/models/file.model'
import type { KeywordType } from '@/lib/models/keyword.model'

export interface ExplorerFile {
    id: number
    name: string
    tags: number[]
    type: 'jpg' | 'png' | 'pdf'
    owner: string
    size: number
}

export interface FilterAreaProps {
    id: number
    keyword?: KeywordType
    tagId?: string
}

export interface FilterAreaDraggableProps {
    id: number
    keyword: KeywordType
    tagId?: string
}

export interface KeywordDraggableProps {
    keyword: KeywordType
}

export type KeywordFilterDraggableProps = {
    filterAreaId: number
    onRemoveClicked: () => void
} & KeywordDraggableProps

export interface FilterAreaDroppableProps {
    id: number
}

export interface TagFilterProps {
    tag: Tag
    onSelected: (tag: Tag) => void
    onUnselected: (tag: Tag) => void
}

export interface FileAreaResultProps {
    files: ExplorerFileType[]
}

export interface FileContainerProps {
    file: ExplorerFileType
}
