import type { FileAreaResultProps } from '@/types/explorer'
import React from 'react'
import FileContainer from './FileContainer'

const FileAreaResult = ({ files }: FileAreaResultProps) => {
    return (
        <div>
            <div className="m-3 flex flex-col gap-3">
                <div className="text-gray-500 text-14">File(s)</div>
                <div className="flex flex-col gap-2">
                    {files.map((file) => (
                        <FileContainer key={file.id} file={file} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default FileAreaResult
