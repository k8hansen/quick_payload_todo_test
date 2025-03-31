import { CollectionConfig } from 'payload'

export const Todos: CollectionConfig = {
  slug: 'todos',
  access: {
    read: () => true,
    create: () => true,
    delete: () => true,
    update: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'completed',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'createdAt',
      type: 'date',
      defaultValue: new Date(),
    },
    {
      name: 'updatedAt',
      type: 'date',
      defaultValue: new Date(),
    },
  ],
}
