'use server'

import { connectToDB } from '../mongoose'
import Keyword, { type KeywordType } from '../models/keyword.model'

export const getAllKeywords = async (): Promise<KeywordType[]> => {
    try {
        await connectToDB()
        const keywordQuery = Keyword.find()
        const keywords = (await keywordQuery.exec()).map((keyword) => {
            return {
                id: keyword._id.toString(),
                name: keyword.name,
            }
        })

        return keywords
    } catch (error) {
        console.log('Error getting tags:', error)
        return []
    }
}
