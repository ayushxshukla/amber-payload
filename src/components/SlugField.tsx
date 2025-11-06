'use client'

import { useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { TextInput } from '@payloadcms/ui'
import React from 'react'

// Helper function to generate slug from title
const formatSlug = (val: string): string => {
  return val
    .toLowerCase()
    .replace(/[^a-z\s-]/g, '') // Remove numbers and special characters, keep letters, spaces, and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
}

export const SlugFieldComponent: TextFieldClientComponent = ({ field, path }) => {
  const { value, setValue } = useField({ path })

  const titleField = useFormFields(([fields]) => fields.name)
  const title = titleField?.value as string

  const handleGenerateSlug = () => {
    if (title) {
      const newSlug = formatSlug(title)
      setValue(newSlug)
    }
  }

  return (
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          alignItems: 'flex-end',
          width: '100%',
        }}
      >
        <div style={{ flex: 1 }}>
          <TextInput
            path={path}
            label={field.label}
            required={field.required}
            value={value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
        </div>
        <button
          type="button"
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--theme-elevation-500)',
            color: 'var(--theme-text)',
            border: '1px solid var(--theme-elevation-700)',
            borderRadius: '4px',
            cursor: title ? 'pointer' : 'not-allowed',
            fontSize: '0.875rem',
            fontWeight: '500',
            whiteSpace: 'nowrap',
            height: 'calc(var(--base) * 2)',
            opacity: title ? 1 : 0.5,
          }}
          onClick={handleGenerateSlug}
          disabled={!title}
          onMouseOver={(e) => {
            if (title) {
              e.currentTarget.style.backgroundColor = 'var(--theme-elevation-600)'
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--theme-elevation-500)'
          }}
        >
          Generate from Title
        </button>
      </div>
      {!title && (
        <p
          style={{
            marginTop: '0.5rem',
            fontSize: '0.875rem',
            color: 'var(--theme-elevation-800)',
            fontStyle: 'italic',
          }}
        >
          Enter a title first to auto-generate slug
        </p>
      )}
    </div>
  )
}
