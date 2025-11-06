import type { CollectionConfig } from 'payload'

// Categories Collection
export const Categories: CollectionConfig = {
  slug: 'categories',
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
      name: 'metaDescription',
      type: 'textarea',
    },
    {
      name: 'webflowId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'categoriesTagline',
      type: 'text',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      label: 'Thumbnail',
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
