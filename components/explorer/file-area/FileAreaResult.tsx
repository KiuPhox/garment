import type { FileAreaResultProps } from '@/types/explorer'
import React from 'react'

const FileAreaResult = ({ files }: FileAreaResultProps) => {
    return <div>File: {files.length}</div>
}

export default FileAreaResult

