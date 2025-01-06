'use client'

import { useContext, useState } from 'react'
import Image from 'next/image'
import KeywordDraggable from './KeywordDraggable'
import { useDroppable } from '@dnd-kit/core'
import type { Dnd } from '@/types/dnd'
import ExplorerContext from '@/contexts/ExplorerContext'
import { cn } from '@/lib/utils'
import { Skeleton } from '@mui/material'

const seededRandom = (seed: number) => {
    let value = seed % 2147483647
    return () => {
        value = (value * 16807) % 2147483647
        return (value - 1) / 2147483646
    }
}

const KeywordContainer = () => {
    const [expanded, setExpanded] = useState(false)
    const { visibleKeywords, keywords } = useContext(ExplorerContext)

    const { setNodeRef } = useDroppable({
        id: 'keyword-container-droppable',
        data: {
            type: 'KeywordContainer',
        } as Dnd.DragEndData,
    })

    const random = seededRandom(1208461)

    const getRandomWidth = () => {
        return Math.floor(random() * 100) + 100
    }

    const handleExpandClick = () => {
        setExpanded((prev) => !prev)
    }

    return (
        <section ref={setNodeRef} className="flex flex-col gap-2">
            <div className="flex gap-2">
                <h2 className="text-gray-600 font-medium">Tag class</h2>
                <Image
                    src="/icons/expand.svg"
                    width={16}
                    height={16}
                    alt="Add keyword"
                    className="cursor-pointer"
                    onClick={handleExpandClick}
                />
            </div>
            <div
                className={cn(
                    'bg-[#353a46] w-full rounded-md transition-all overflow-hidden h-full min-h-[120px]',
                    { 'max-h-[500px]': expanded },
                    { 'max-h-[120px]': !expanded },
                )}>
                <div className="flex flex-wrap gap-2 m-2">
                    {visibleKeywords.map((keyword) => (
                        <KeywordDraggable key={keyword.id} keyword={keyword} />
                    ))}
                    {keywords.length === 0 &&
                        Array.from({ length: 28 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                width={`${getRandomWidth()}px`}
                                height="40px"
                                animation="wave"
                            />
                        ))}
                </div>
            </div>
        </section>
    )
}

export default KeywordContainer
