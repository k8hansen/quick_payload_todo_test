import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div style={{ margin: '40px', display: 'flex', flexDirection: 'column', gap: 20 }}>
      <h1>Payload To Do List{user ? `, ${user.email}` : ''}</h1>
      <button style={{ margin: '10px' }}>
        <Link href="/todo-create">Create a To Do</Link>
      </button>
      <h1>To Do</h1>
      <div className="todo">
        {todos.docs.map((todo) => (
          <Link key={todo.id} href={`/todos/${todo.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
              <h3>{todo.title}</h3>
              <p>{todo.description}</p>
              <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
              <p>{todo.createdAt}</p>
              <p>{todo.updatedAt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
