import clsx, { type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

const func = (...inputs: ClassValue[]): string => {
    return twMerge(clsx(inputs))
}
export default func

