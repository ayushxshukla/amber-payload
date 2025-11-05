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
    read: () => true,
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
