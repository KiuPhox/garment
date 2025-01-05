import type { FileAreaResultProps } from '@/types/explorer'
import React from 'react'
import FileCard from './FileCard'

const FileAreaResult = ({ files }: FileAreaResultProps) => {
    return (
        <div>
            <div className="m-3 flex flex-col gap-3">
                <div className="text-gray-500 text-14">File(s)</div>
                <div className="flex flex-col gap-2">
                    {files.map((file) => (
                        <FileCard key={file.id} file={file} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FileAreaResult
