'use client'

import ExplorerContainer from '@/components/explorer/ExplorerContainer'
import { TagsProvider } from '@/contexts/TagsContext'
import React from 'react'

const Explorer = () => {
    return (
        <section className="explorer gap-5">
            <h1 className="page-label">Explorer</h1>
            <TagsProvider>
                <ExplorerContainer />
            </TagsProvider>
        </section>
    )
}

export default Explorer
