import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Public can read
    read: () => true,
    // Both admin and content writers can create/upload
    create: ({ req: { user } }) => Boolean(user),
    // Both admin and content writers can update
    update: ({ req: { user } }) => Boolean(user),
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  upload: {
    disableLocalStorage: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
