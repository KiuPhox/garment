'use client'

import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const Sidebar = ({ user }: SidebarProps) => {
    const pathname = usePathname()

    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-2">
                <Link
                    href="/"
                    className="mb-4 cursor-pointer gap-2 flex justify-center"
                >
                    <Image
                        src="/icons/logo.png"
                        width={160}
                        height={30}
                        alt="Garment Logo"
                    />
                </Link>
                {sidebarLinks.map((item) => {
                    const isActive =
                        pathname === item.route ||
                        pathname.startsWith(`${item.route}/`)

                    return (
                        <Link
                            href={item.route}
                            key={item.label}
                            className={cn('sidebar-link', {
                                'sidebar-link-active': isActive,
                            })}
                        >
                            <div className="relative size-6">
                                <Image
                                    src={item.imgURL}
                                    alt={item.label}
                                    fill
                                />
                            </div>
                            <p className="sidebar-label">{item.label}</p>
                        </Link>
                    )
                })}
            </nav>
        </section>
    )
}

export default Sidebar
