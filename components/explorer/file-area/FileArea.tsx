import React, { useContext } from 'react'
import FileAreaDroppable from './FileAreaDroppable'
import ExplorerContext from '@/contexts/ExplorerContext'
import FileAreaResult from './FileAreaResult'

const FileArea = () => {
    const { files } = useContext(ExplorerContext)

    return (
        <div className="bg-[#353a46] rounded-2xl flex-1">
            {files.length === 0 ? <FileAreaDroppable /> : <FileAreaResult files={files} />}
        </div>
    )
}

export default FileArea
