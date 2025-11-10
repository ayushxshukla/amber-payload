// payload/collections/Redirects.ts

import type { CollectionConfig } from 'payload'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    useAsTitle: 'from',
    defaultColumns: ['from', 'to', 'type'],
  },
  access: {
    read: () => true, // Public read access
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      label: 'Old Path',
      admin: {
        description: 'The old URL path (e.g., /post/old-slug)',
      },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      label: 'New Path',
      admin: {
        description: 'The new URL path (e.g., /blog/post/new-slug)',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: '301',
      options: [
        { label: '301 (Permanent)', value: '301' },
        { label: '302 (Temporary)', value: '302' },
      ],
    },
  ],
}
