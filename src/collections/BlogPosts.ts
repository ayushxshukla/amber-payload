import { CodeBlockFeature } from '@/fields/features/CodeBlock/CodeBlockFeature'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const BlogPosts = {
  slug: 'blog-posts',
  versions: {
    drafts: true,
    maxPerDoc: 50,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'date', 'featured'],
  },
  access: {
    // Public can read published posts
    read: () => true,
    // Both admin and content writers can create
    create: ({ req: { user } }) => Boolean(user),
    // Both admin and content writers can update
    update: ({ req: { user } }) => Boolean(user),
    // Only admins can delete
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // Basic Info
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        position: 'sidebar',
      },
    },

    // Main Content
    {
      name: 'mainImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Main Image',
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      label: 'Category',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      required: true,
      label: 'Tags',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'countryTag',
      type: 'relationship',
      relationTo: 'countries',
      required: false,
      label: 'Country Tag',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      label: 'Date',
      admin: {
        position: 'sidebar',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'webflowlastPublished',
      type: 'date',
      label: 'Webflow Last Published',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'readTime',
      type: 'text',
      required: true,
      label: 'Read Time',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'taglines',
      type: 'text',
      label: 'Taglines',
    },
    {
      name: 'postBody',
      type: 'richText',
      required: true,
      label: 'Post Body',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          CodeBlockFeature(),
        ],
      }),
    },
    {
      name: 'tocBasedOn',
      type: 'text',
      label: 'TOC Based On',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured?',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },

    // Video Fields
    {
      name: 'video',
      type: 'text',
      label: 'Video Link',
    },
    // SEO Fields
    {
      type: 'tabs',
      tabs: [
        {
          label: 'SEO',
          fields: [
            {
              name: 'metaTitle',
              type: 'text',
              required: true,
              label: 'Meta Title',
            },
            {
              name: 'metaDescription',
              type: 'text',
              required: true,
              label: 'Meta Description',
            },
            {
              name: 'metaKeywords',
              type: 'text',
              required: true,
              label: 'Meta Keywords',
            },
          ],
        },

        // FAQ Schema Tab
        {
          label: 'FAQ Schema',
          fields: [
            {
              name: 'isFaqSchema',
              type: 'select',
              label: 'Is FAQ Schema?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'faqItems',
              type: 'array',
              label: 'FAQ Items',
              maxRows: 7,
              fields: [
                {
                  name: 'question',
                  type: 'text',
                  label: 'Question',
                },
                {
                  name: 'answerRichText',
                  type: 'richText',
                  label: 'Answer (Rich Text)',
                },
              ],
            },
          ],
        },

        // Video Schema Tab
        {
          label: 'Video Schema',
          fields: [
            {
              name: 'isVideoObjectSchema',
              type: 'select',
              label: 'Is VideoObject Schema?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'videoThumbnailUrl',
              type: 'text',
              label: 'Video Thumbnail URL',
            },
            {
              name: 'videoContentUrl',
              type: 'text',
              label: 'Video Content URL',
            },
            {
              name: 'videoEmbedUrl',
              type: 'text',
              label: 'Video Embed URL',
            },
            {
              name: 'videoPublishedDate',
              type: 'text',
              label: 'Video Published Date',
            },
            {
              name: 'videoDuration',
              type: 'text',
              label: 'Video Duration',
            },
          ],
        },

        // HowTo Schema Tab
        {
          label: 'HowTo Schema',
          fields: [
            {
              name: 'isHowToSchema',
              type: 'select',
              label: 'Is HowTo Schema?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'scriptForHowToSchema',
              type: 'textarea',
              label: 'Script for HowTo Schema',
            },
          ],
        },

        // ItemList Schema Tab
        {
          label: 'ItemList Schema',
          fields: [
            {
              name: 'isItemListSchema',
              type: 'select',
              label: 'Is ItemList Schema?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'scriptForItemListSchema',
              type: 'textarea',
              label: 'Script for ItemList Schema',
            },
          ],
        },
      ],
    },
    {
      name: 'webflowId',
      type: 'text',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
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
} as CollectionConfig
