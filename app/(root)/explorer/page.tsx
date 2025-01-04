'use client'

import ExplorerContainer from '@/components/explorer/ExplorerContainer'
import { ExplorerProvider } from '@/contexts/ExplorerContext'
import React from 'react'

const Explorer = () => {
    return (
        <section className="explorer gap-5">
            <h1 className="page-label">Explorer</h1>
            <ExplorerProvider>
                <ExplorerContainer />
            </ExplorerProvider>
        </section>
    )
}

export default Explorer
