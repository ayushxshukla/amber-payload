import type { CollectionConfig } from 'payload'

// Countries Collection
export const Countries: CollectionConfig = {
  slug: 'countries',
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'name',
  },
  access: {
    // Public can read
    read: () => true,
    // Both admin and content writers can create
    create: ({ req: { user } }) => Boolean(user),
    // Both admin and content writers can update
    update: ({ req: { user } }) => Boolean(user),
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'countryCode',
      type: 'text',
      label: 'Country Code (e.g., US, IN, UK)',
    },
    {
      name: 'webflowId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'rankning',
      type: 'number',
      label: 'Ranking',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo',
    },
    {
      name: 'isArchived',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Archive this post to hide it from listings',
      },
    },
  ],
}
