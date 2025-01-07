import type { TagFilterProps } from '@/types/explorer'
import React, { useContext } from 'react'
import Utils from '@/utils'
import ExplorerContext from '@/contexts/ExplorerContext'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import style from 'styled-jsx/style'

const { String: S } = Utils

const TagFilter = ({ tag, onSelected: handleOnSelected, onUnselected: handleOnUnselected }: TagFilterProps) => {
    const { filterAreas } = useContext(ExplorerContext)

    const isSelected = filterAreas.find((filterArea) => filterArea?.tagId === tag.id) !== undefined

    const handleOnClicked = () => {
        if (isSelected) {
            handleOnUnselected(tag)
        } else {
            handleOnSelected(tag)
        }
    }

    return (
        <Card>
            <CardActionArea
                onClick={handleOnClicked}
                data-active={isSelected ? '' : undefined}
                sx={{
                    '&[data-active]': {
                        backgroundColor: 'action.selected',
                        '&:hover': {
                            backgroundColor: 'action.selectedHover',
                        },
                    },
                }}>
                <CardContent sx={{ display: 'flex', flex: 1 }}>
                    <Typography>{tag.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default TagFilter
