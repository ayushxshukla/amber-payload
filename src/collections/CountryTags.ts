import type { CollectionConfig } from 'payload'

// Country Tags Collection
export const CountryTags: CollectionConfig = {
  slug: 'country-tags',
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
  ],
}