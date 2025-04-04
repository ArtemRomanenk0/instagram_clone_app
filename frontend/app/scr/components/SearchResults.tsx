'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Feed from './Feed'

export default function SearchResults() {
  const [query, setQuery] = useState('')
  const searchParams = useSearchParams()

  useEffect(() => {
    setQuery(searchParams.get('q') || '')
  }, [searchParams])

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Результаты поиска: {query}</h1>
      <Feed endpoint={`/api/v1/search/posts?query=${encodeURIComponent(query)}`} searchMode={true}/>
    </div>
  )
}