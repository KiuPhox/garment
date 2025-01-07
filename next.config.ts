import type { NextConfig } from 'next'
import dotenv from 'dotenv'
import path from 'node:path'
import fs from 'node:fs'

const loadEnv = () => {
    const envPath = 'env'

    dotenv.config({ override: true, path: path.join(envPath, '.env') })
    dotenv.config({ override: true, path: path.join(envPath, '.env.local') })

    if (!fs.existsSync(path.join(envPath, '.env.local'))) {
        fs.writeFileSync(path.join(envPath, '.env.local'), '')
    }
}

loadEnv()

const nextConfig: NextConfig = {
    /* config options here */
}

export default nextConfig
