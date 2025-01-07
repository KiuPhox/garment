import type { FileAreaResultProps } from '@/types/explorer'
import React from 'react'
import FileCard from './FileCard'
import { Card, CardContent } from '@mui/material'

const FileAreaResult = ({ files }: FileAreaResultProps) => {
    return (
        <Card className="w-full h-full">
            <CardContent className="flex flex-col gap-3">
                <div className="text-gray-500 text-14">File(s)</div>
                <div className="flex flex-col gap-2">
                    {files.map((file) => (
                        <FileCard key={file.id} file={file} />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default FileAreaResult
