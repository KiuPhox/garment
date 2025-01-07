'use client'

import Sidebar from '@/components/Sidebar'
import { createTheme, ThemeProvider } from '@mui/material/styles'

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const theme = createTheme({
        colorSchemes: {
            dark: true,
            light: true,
        },
    })
    const loggedIn = { firstName: 'Tuan', lastName: 'Nguyen' }
    return (
        <ThemeProvider theme={theme} defaultMode="dark">
            <main className="flex h-screen w-full font-inter">
                <Sidebar user={loggedIn} />
                {children}
            </main>
        </ThemeProvider>
    )
}
