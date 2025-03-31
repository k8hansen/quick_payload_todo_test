'use server'

import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import config from '@/payload.config'

export async function createTodo(formData: FormData) {
  const payload = await getPayload({
    config: await config,
  })

  try {
    // Extract form data and ensure correct types
    const title = formData.get('title')?.toString() || ''
    const description = formData.get('description')?.toString() || ''
    const mediaFile = formData.get('media') as File | null

    if (!title) {
      throw new Error('Title is required')
    }

    // Create media first if a file was uploaded
    let mediaId = undefined
    if (mediaFile && mediaFile.size > 0) {
      const buffer = Buffer.from(await mediaFile.arrayBuffer())
      const media = await payload.create({
        collection: 'media',
        data: {
          alt: `Image for todo: ${title}`,
        },
        file: {
          data: buffer,
          mimetype: mediaFile.type,
          name: mediaFile.name,
          size: mediaFile.size,
        },
      })
      mediaId = media.id
    }

    // Create the todo
    await payload.create({
      collection: 'todos',
      data: {
        title,
        description,
        completed: false,
        ...(mediaId ? { media: mediaId } : {}),
      },
    })

    redirect('/')
  } catch (error) {
    console.error('Error creating todo:', error)
    throw error
  }
}
