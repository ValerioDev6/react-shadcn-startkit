import { useState } from "react"

interface UsePaginationOptions {
  initialPage?: number
  initialLimit?: number
}

interface UsePaginationReturn {
  page: number
  limit: number
  setPage: (page: number) => void
  setLimit: (limit: number) => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number, totalPages: number) => void
}

export function usePagination(
  options: UsePaginationOptions = {}
): UsePaginationReturn {
  const [page, setPage] = useState(options.initialPage || 1)
  const [limit, setLimit] = useState(options.initialLimit || 10)

  const nextPage = () => {
    setPage((p) => p + 1)
  }

  const prevPage = () => {
    setPage((p) => Math.max(1, p - 1))
  }

  const goToPage = (pageNum: number, totalPages: number) => {
    const validPage = Math.max(1, Math.min(pageNum, totalPages))
    setPage(validPage)
  }

  const handleSetLimit = (newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }

  return {
    page,
    limit,
    setPage,
    setLimit: handleSetLimit,
    nextPage,
    prevPage,
    goToPage,
  }
}
