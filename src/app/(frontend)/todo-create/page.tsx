import { createTodo } from '@/app/actions/createTodDoAction'
import Link from 'next/link'

export default function ToDoCreatePage() {
  return (
    <div
      style={{ margin: '40px', display: 'flex', flexDirection: 'column', gap: 20, width: '33%' }}
    >
      <h1>Create a To Do</h1>
      <form action={createTodo}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            style={{ display: 'block', width: '100%', padding: '8px', minHeight: '100px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="media">Media</label>
          <input
            type="file"
            id="media"
            name="media"
            style={{ display: 'block', width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
          <button
            type="submit"
            style={{
              padding: '8px 16px',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Create
          </button>
          <Link href="/">
            <button
              type="button"
              style={{
                padding: '8px 16px',
                backgroundColor: '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  )
}
