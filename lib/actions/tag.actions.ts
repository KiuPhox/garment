'use server'

import Tag, { type TagType } from '../models/tag.model'
import { connectToDB } from '../mongoose'
import type { KeywordType } from '../models/keyword.model'

export const getAllTags = async (): Promise<TagType[]> => {
    try {
        await connectToDB()
        const tagQuery = Tag.find()
        const tags = await tagQuery.exec()

        return tags
    } catch (error) {
        console.log('Error getting tags:', error)
        return []
    }
}

export const getTagsByKeyword = async (keyword: KeywordType): Promise<TagType[]> => {
    try {
        await connectToDB()
        const tagQuery = Tag.find({ keywords: keyword.id })

        const tags = (await tagQuery.exec()).map((tag) => {
            return {
                id: tag._id.toString(),
                name: tag.name,
                keywordId: tag.toJSON().keywordId.toString(),
            } as TagType
        })

        return tags
    } catch (error) {
        console.log('Error getting tags:', error)
        return []
    }
}
