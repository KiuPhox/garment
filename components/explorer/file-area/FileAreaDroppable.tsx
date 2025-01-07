import { Card, CardContent, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const FileAreaDroppable = () => {
    return (
        <Card className="flex w-full h-full flex-col items-center justify-center gap-4">
            <CardContent className="flex flex-col items-center justify-center gap-4">
                <Image src="./icons/drawer-empty.svg" width={60} height={60} alt={''} />
                <Typography>No items to display yet</Typography>
            </CardContent>
        </Card>
    )
}

export default FileAreaDroppable
