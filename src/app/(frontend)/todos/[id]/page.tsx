import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { Todo } from '@/payload-types'
import { Media } from '@/payload-types'

interface Props {
  params: Promise<{ id: string }> | { id: string }
}

export default async function ToDoPage({ params }: Props) {
  const { id } = await params
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const todo = (await payload.findByID({
    collection: 'todos',
    id,
  })) as Todo

  if (!todo) {
    return <div>Todo not found</div>
  }

  const media = todo.media as Media | undefined

  return (
    <div style={{ margin: '40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Link href="/">
        <button>Back to Todos</button>
      </Link>
      <div>
        <h1>{todo.title}</h1>
        <p>{todo.description}</p>
        <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
        <p>{todo.createdAt}</p>
        <p>{todo.updatedAt}</p>
        {media?.url && (
          <Image src={media.url} alt={media.alt || 'Todo image'} width={400} height={300} />
        )}
      </div>
    </div>
  )
}
