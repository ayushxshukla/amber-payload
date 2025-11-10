import type { CollectionConfig } from 'payload'

export const HomeFeatured = {
    slug: 'home-featured',
    admin: {
        description: 'Manage featured blogs on the homepage (1-10 blogs)',
        useAsTitle: 'updatedAt',
    },
    access: {
        // Public can read
        read: () => true,
        // Only admins can create, update, delete
        create: async ({ req: { user, payload } }) => {
            if (user?.role !== 'admin') return false
            // Check if a document already exists
            const existingDocs = await payload.find({
                collection: 'home-featured',
                limit: 1,
            })
            // Only allow creation if no documents exist
            return existingDocs.docs.length === 0
        },
        update: ({ req: { user } }) => user?.role === 'admin',
        delete: ({ req: { user } }) => user?.role === 'admin',
    },
    fields: [
        {
            name: 'featuredBlogs',
            type: 'array',
            required: true,
            minRows: 1,
            maxRows: 10,
            fields: [
                {
                    name: 'blog',
                    type: 'relationship',
                    relationTo: 'blog-posts',
                    required: true,
                    filterOptions: {
                        // Only show published, non-archived posts
                        isArchived: { equals: false },
                    },
                },
            ],
            admin: {
                description:
                    'Add 1-10 featured blogs. Drag to reorder. The order here determines the display order on the homepage.',
                components: {
                    RowLabel: ({ data, index }: { data: any; index: number }) => {
                        return data?.blog
                            ? `${index + 1}. ${typeof data.blog === 'object' ? data.blog.name || 'Untitled' : 'Blog Post'}`
                            : `${index + 1}. Empty Slot`
                    },
                },
            },
        },
        {
            name: 'updatedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                readOnly: true,
            },
        },
    ],
    hooks: {
        beforeChange: [
            ({ data }) => {
                // Automatically update the timestamp
                data.updatedAt = new Date().toISOString()
                return data
            },
        ],
    },
} as CollectionConfig
