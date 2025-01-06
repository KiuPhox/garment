'use server'

import Tag, { type TagType } from '../models/tag.model'
import { connectToDB } from '../mongoose'
import type { KeywordType } from '../models/keyword.model'

const processTagExec = (tagExec: any[]): TagType[] => {
    const tags = tagExec.map((tag) => {
        return {
            id: tag._id.toString(),
            name: tag.name,
            keywordId: tag.toJSON().keywordId.toString(),
        } as TagType
    })

    return tags
}

export const getAllTags = async (): Promise<TagType[]> => {
    try {
        await connectToDB()
        const tagQuery = Tag.find()

        return processTagExec(await tagQuery.exec())
    } catch (error) {
        console.log('Error getting tags:', error)
        return []
    }
}

export const getTagsByKeyword = async (keyword: KeywordType): Promise<TagType[]> => {
    try {
        await connectToDB()
        const tagQuery = Tag.find({ keywordId: keyword.id })

        return processTagExec(await tagQuery.exec())
    } catch (error) {
        console.log('Error getting tags:', error)
        return []
    }
}
