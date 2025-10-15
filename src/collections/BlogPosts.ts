import type { CollectionConfig } from 'payload'

export const BlogPosts = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'date', 'featured'],
  },
  access: {
    read: () => true,
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
      name: 'thumbnailImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Thumbnail Image',
    },
    {
      name: 'altText',
      type: 'text',
      required: true,
      label: 'Alt Text',
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
      relationTo: 'country-tags',
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
      name: 'readTime',
      type: 'text',
      required: true,
      label: 'Read Time',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'serialNumber',
      type: 'number',
      label: 'Serial Number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'postBody',
      type: 'richText',
      required: true,
      label: 'Post Body',
    },
    {
      name: 'taglines',
      type: 'text',
      label: 'Taglines',
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
    {
      name: 'storyLink',
      type: 'richText',
      label: 'Story Link',
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
                  name: 'answer',
                  type: 'text',
                  label: 'Answer (Plain Text)',
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

        // Podcast Schema Tab
        {
          label: 'Podcast Schema',
          fields: [
            {
              name: 'isPodcastEpisodeSchema',
              type: 'select',
              label: 'Is PodcastEpisode Schema?',
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              name: 'askAmberUrl',
              type: 'text',
              label: 'Ask Amber URL',
            },
            {
              name: 'spotifyLink',
              type: 'text',
              label: 'Spotify Link',
            },
            {
              name: 'podcastPublishedDate',
              type: 'text',
              label: 'Podcast Published Date',
            },
            {
              name: 'podcastDuration',
              type: 'text',
              label: 'Podcast Duration',
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

    // Webflow Migration ID
    {
      name: 'webflowId',
      type: 'text',
      label: 'Webflow ID',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Original Webflow item ID for migration tracking',
      },
    },
  ],
} as CollectionConfig