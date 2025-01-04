import React, { useContext, useEffect, useState } from 'react'
import FileAreaDroppable from './FileAreaDroppable'
import ExplorerContext from '@/contexts/ExplorerContext'
import FileAreaResult from './FileAreaResult'
import { getFilesWithTags } from '@/lib/actions/file.actions'
import type { ExplorerFileType } from '@/lib/models/file.model'

const FileArea = () => {
    const { filterAreas } = useContext(ExplorerContext)
    const [files, setFiles] = useState<ExplorerFileType[]>([])

    useEffect(() => {
        const fetchFiles = async () => {
            const tags: string[] = []

            for (const filterArea of filterAreas) {
                if (filterArea && filterArea.tagId !== undefined) {
                    tags.push(filterArea.tagId)
                }
            }

            const fileResults = await getFilesWithTags(tags)
            setFiles(fileResults)
        }

        fetchFiles()
    }, [filterAreas])

    return (
        <div className="bg-[#353a46] rounded-2xl flex-1">
            {files.length === 0 ? <FileAreaDroppable /> : <FileAreaResult files={files} />}
        </div>
    )
}

export default FileArea
