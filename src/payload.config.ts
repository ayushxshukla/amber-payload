// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { BlogPosts } from './collections/BlogPosts'
import { Categories } from './collections/Categories'
import { Tags } from './collections/Tags'
import { Countries } from './collections/Countries'
import { s3Storage } from '@payloadcms/storage-s3'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, BlogPosts, Categories, Tags, Countries],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      // connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  cors: {
    origins: ['http://localhost:3002'], // Allow your frontend origin
  },
  plugins: [
    // storage-adapter-placeholder
    // for local and staging use differnt bucket , for production use another bucket
    s3Storage({
      collections: {
        media: {
          prefix: 'blogassets/local-uploads/',
          generateFileURL: ({ filename, prefix = '' }) => {
            const encodedFilename = encodeURIComponent(filename)

            let cleanPrefix = prefix
            if (cleanPrefix.startsWith('blogassets/')) {
              cleanPrefix = cleanPrefix.replace('blogassets/', '')
            }

            if (!cleanPrefix.endsWith('/')) {
              cleanPrefix += '/'
            }

            return `https://webflow-amber-prod.gumlet.io/${cleanPrefix}${encodedFilename}` // add the cdn url to a variable
          },
        },
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
      },
    }),
  ],
})
