import { files, tagClasses, tags } from '@/constants/explorer'
import type { ExplorerFile, Tag, TagClass } from '@/types/explorer'

export function getAllTagClasses(): TagClass[] {
    return tagClasses
}

export function getTagClassById(id: number): TagClass | undefined {
    return tagClasses.find((tagClass) => tagClass.id === id)
}

export function getAllTagsByTagClass(tagClassId: number): Tag[] {
    return tags.filter((tag) => tag.tagClassId === tagClassId)
}

export function getTagById(id: number): Tag | undefined {
    return tags.find((tag) => tag.id === id)
}

export function getAllFilesByTags(tagIds: number[]): ExplorerFile[] {
    if (tagIds.length === 0) return []
    return files.filter((file) =>
        tagIds.every((tagId) => file.tags.includes(tagId)),
    )
}
