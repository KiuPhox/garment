import type { ExplorerFileType } from '@/lib/models/file.model'
import type { KeywordType } from '@/lib/models/keyword.model'
import type { TagType } from '@/lib/models/tag.model'

export interface KeywordDraggableProps {
    keyword: KeywordType
}

export type KeywordFilterDraggableProps = {
    filterAreaId: number
    onRemoveClicked: () => void
} & KeywordDraggableProps

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

export interface FilterAreaDroppableProps {
    id: number
}

export interface TagFilterProps {
    tag: TagType
    onSelected: (tag: TagType) => void
    onUnselected: (tag: TagType) => void
}

export interface FileAreaResultProps {
    files: ExplorerFileType[]
}

export interface FileContainerProps {
    file: ExplorerFileType
}

export interface FilePropertiesProps {
    isOpen: boolean
    closeModal: () => void
    file: ExplorerFileType
}
