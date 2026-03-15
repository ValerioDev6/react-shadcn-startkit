import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"
import { useState } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  limit: number
  total?: number
  onPageChange: (page: number) => void
  onLimitChange: (limit: number) => void
}

const LIMIT_OPTIONS = [10, 25, 50, 100]

export function Pagination({
  currentPage,
  totalPages,
  limit,
  total,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const [goToPage, setGoToPage] = useState("")

  if (totalPages <= 0) return null

  const handleGoToPage = () => {
    const pageNum = parseInt(goToPage, 10)
    if (pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum)
      setGoToPage("")
    }
  }

  const renderPages = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)

      if (currentPage > 3) {
        pages.push("...")
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push("...")
      }

      pages.push(totalPages)
    }

    return pages.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="flex w-9 items-center justify-center"
          >
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </span>
        )
      }

      const pageNum = page as number
      return (
        <Button
          key={pageNum}
          variant={pageNum === currentPage ? "default" : "outline"}
          size="sm"
          className="w-9"
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </Button>
      )
    })
  }

  return (
    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Mostrar</span>
        <Select
          value={limit.toString()}
          onValueChange={(value) => onLimitChange(parseInt(value, 10))}
        >
          <SelectTrigger className="h-8 w-20">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {LIMIT_OPTIONS.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>por pagina</span>
        {total !== undefined && (
          <span className="ml-2">({total} registros)</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        {renderPages()}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min={1}
          max={totalPages}
          value={goToPage}
          onChange={(e) => setGoToPage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleGoToPage()}
          className="h-8 w-16 text-center"
          placeholder="#"
        />
        <Button variant="secondary" size="sm" onClick={handleGoToPage}>
          Ir
        </Button>
      </div>
    </div>
  )
}
