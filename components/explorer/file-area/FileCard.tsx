import type { FileContainerProps as FileCardProps } from '@/types/explorer'
import Image from 'next/image'
import { useState } from 'react'
import FileProperties from './FileProperties'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { Card, CardActionArea, IconButton } from '@mui/material'

const FileCard = ({ file }: FileCardProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const FileColor: { [key: string]: string } = {
        jpg: '#f2b144',
        pdf: '#f6567b',
        png: '#49a8df',
    }

    const color = FileColor[file.type] || '#f2b144'

    return (
        <>
            <Card className="flex bg-[#414451] rounded-md gap-2 pr-4">
                <div className="w-2 rounded-l-md" style={{ backgroundColor: color }} />
                <div className="flex justify-between flex-1 py-2">
                    <div className="flex gap-4">
                        <div className="relative">
                            <Image src="/icons/file-format.png" width={36} height={36} alt="file" />
                            <div className="absolute inset-0 transform flex items-center justify-center">
                                <div
                                    className="w-11 text-10 text-white flex items-center justify-center"
                                    style={{ backgroundColor: color }}>
                                    {file.type.toUpperCase()}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="">
                                {file.name}.{file.type}
                            </div>
                            <div className="text-gray-500 text-14 ">
                                {file.size}MB · {file.owner}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center gap-1">
                        <IconButton onClick={() => setIsOpen(!isOpen)}>
                            <FileDownloadOutlinedIcon />
                        </IconButton>

                        <IconButton onClick={() => setIsOpen(!isOpen)}>
                            <EditOutlinedIcon />
                        </IconButton>
                    </div>
                </div>
            </Card>
            <FileProperties isOpen={isOpen} file={file} closeModal={() => setIsOpen(false)} />
        </>
    )
}

export default FileCard
