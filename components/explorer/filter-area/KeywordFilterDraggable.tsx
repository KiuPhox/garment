import type { Dnd } from '@/types/dnd'
import type { KeywordFilterDraggableProps } from '@/types/explorer'
import Utils from '@/utils'
import { useDraggable } from '@dnd-kit/core'
import { Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close'

const { String: S } = Utils

const KeywordFilterDraggable = ({ keyword, filterAreaId, onRemoveClicked }: KeywordFilterDraggableProps) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `keyword-${keyword.id}`,
        data: {
            keyword,
            filterAreaId,
            type: 'KeywordFromFilter',
        } as Dnd.KeywordFromFilterData,
    })

    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              overflow: 'visible',
          }
        : undefined

    const keywordName = keyword.name.length > 28 ? S.getShortName(keyword.name, 28).concat('...') : keyword.name

    return (
        <Card ref={setNodeRef} style={style}>
            <CardActionArea sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pr: 1 }}>
                <CardContent {...attributes} {...listeners} sx={{ display: 'flex', flex: 1 }}>
                    <Typography> {keywordName}</Typography>
                </CardContent>
                <IconButton onClick={onRemoveClicked} size="small">
                    <CloseIcon fontSize="small" />
                </IconButton>
            </CardActionArea>
        </Card>
    )
}

export default KeywordFilterDraggable
