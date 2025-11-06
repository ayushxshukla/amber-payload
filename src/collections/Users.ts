import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',

  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'content-writer',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Content Writer',
          value: 'content-writer',
        },
      ],
      access: {
        // Only admins can change roles
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
  access: {
    // Admins can read all users, content writers can only read themselves
    read: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Only admins can create users
    create: ({ req: { user } }) => user?.role === 'admin',
    // Admins can update all users, content writers can only update themselves
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    // Only admins can delete users
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
}