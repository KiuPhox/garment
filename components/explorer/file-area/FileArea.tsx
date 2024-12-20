import React, { useContext, useMemo } from 'react'
import FileAreaDroppable from './FileAreaDroppable'
import TagsContext from '@/contexts/TagsContext'
import { getAllFilesByTags } from '@/lib/explorer'
import FileAreaResult from './FileAreaResult'

const FileArea = () => {
    const { tagClassAreas } = useContext(TagsContext)
    const files = useMemo(() => {
        const tagIds = []
        for (const tagClassArea of tagClassAreas) {
            if (tagClassArea && tagClassArea.tagId !== undefined) {
                tagIds.push(tagClassArea.tagId)
            }
        }

        return getAllFilesByTags(tagIds)
    }, [tagClassAreas])

    return (
        <div className="bg-white rounded-2xl flex-1">
            {files.length === 0 ? (
                <FileAreaDroppable />
            ) : (
                <FileAreaResult files={files} />
            )}
        </div>
    )
}

export default FileArea
