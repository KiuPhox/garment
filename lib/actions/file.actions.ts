'use server'

import { connectToDB } from '../mongoose'
import ExplorerFile, { type ExplorerFileType } from '../models/file.model'

export const getFilesWithTags = async (tags: string[]): Promise<ExplorerFileType[]> => {
    try {
        await connectToDB()
        const files = (await ExplorerFile.find({ tags: { $all: tags } })).map((file) => {
            return {
                id: file._id.toString(),
                name: file.name,
                tags: file.tags.map((tag: any) => tag.toString()),
                size: file.size,
                owner: file.owner,
                type: file.type,
            } as ExplorerFileType
        })
        return files
    } catch (error) {
        return []
    }
}

export const updateFile = async (id: string, name: string): Promise<void> => {
    try {
        await connectToDB()
        await ExplorerFile.updateOne({ _id: id }, { name })
    } catch (error) {
        return
    }
}
