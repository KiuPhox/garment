import Image from 'next/image'
import React from 'react'

const FileAreaDroppable = () => {
    return (
        <div className="flex w-full h-full flex-col items-center justify-center gap-4">
            <Image
                src="./icons/drawer-empty.svg"
                width={60}
                height={60}
                alt={''}
            />
            <p className="text-gray-400 font-medium">No items to display yet</p>
        </div>
    )
}

export default FileAreaDroppable

