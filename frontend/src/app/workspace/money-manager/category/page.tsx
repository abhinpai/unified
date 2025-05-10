'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { PageHeader } from '@/components/ui/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { useAuth } from '@/hooks/useAuth'
import { useCreateCategory } from '@/services/categories/use-create-category'
import { useDeleteCategory } from '@/services/categories/use-delete-category'
import { useGetCategories } from '@/services/categories/use-get-categories'
import { useUpdateCategory } from '@/services/categories/use-update-category'
import { CreateCategoryDTO } from '@/types/category'
import { ICategory } from '@/types/ICategory'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { CategoryDialog } from './_components/category-dialog'

export const getColumns = (
  setDeleteId: Dispatch<SetStateAction<number | null>>,
  handleEdit: (category: ICategory) => void
): ColumnDef<ICategory>[] => {
  return [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const color = row.original.indicatorColor
        return (
          <div className='capitalize flex flex-row gap-2 items-center'>
            <span
              className='w-3 h-3 rounded-full'
              style={{ backgroundColor: color }}
            />
            {row.getValue('name')}
          </div>
        )
      }
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => (
        <div className='lowercase'>
          {row.getValue('description') ? row.getValue('description') : 'N/A'}
        </div>
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      header: 'Actions',
      cell: ({ row }) => {
        const category = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem onClick={() => handleEdit(category)}>
                <Pencil className='mr-2 h-4 w-4' />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-destructive hover:bg-red-500 !hover:text-destructive'
                onClick={() => setDeleteId(category.id)}
              >
                <Trash2 className='mr-2 h-4 w-4 text-destructive' />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]
}

export default function CategoryPage() {
  const { user } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<
    ICategory | undefined
  >()

  const [deleteId, setDeleteId] = useState<number | null>(null)

  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategories(user?.id || '')
  const createCategory = useCreateCategory()
  const updateCategory = useUpdateCategory()
  const deleteCategory = useDeleteCategory()

  useEffect(() => {
    if (updateCategory.isSuccess || createCategory.isSuccess) {
      setDialogOpen(false)
      setSelectedCategory(undefined)
    }
  }, [updateCategory.isSuccess, createCategory.isSuccess])

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setSelectedCategory(undefined)
      setDialogOpen(false)
    } else {
      setDialogOpen(true)
    }
  }

  const handleCreateCategory = async (data: CreateCategoryDTO) => {
    try {
      if (selectedCategory) {
        updateCategory.mutateAsync({
          id: selectedCategory.id,
          payload: {
            ...data
          }
        })
      } else {
        createCategory.mutateAsync({ ...data })
      }
    } catch (error) {
      console.error('Error adding category:', error)
    }
  }

  const handleEdit = (category: ICategory) => {
    setSelectedCategory(category)
    setDialogOpen(true)
  }

  const table = useReactTable({
    data: categories,
    columns: getColumns(setDeleteId, handleEdit),
    getCoreRowModel: getCoreRowModel()
  })

  const handleDelete = async () => {
    if (deleteId) {
      await deleteCategory.mutateAsync(deleteId)
      setDeleteId(null)
    }
  }

  return (
    <div>
      <PageHeader title='Categories'>
        <Button onClick={() => setDialogOpen(true)}>Add</Button>
      </PageHeader>
      <div className='rounded-md border  my-4'>
        <Table>
          <TableHeader className='bg-muted'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoadingCategories ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    {Array(3)
                      .fill(0)
                      .map((_, cellIndex) => (
                        <TableCell key={cellIndex}>
                          <Skeleton className='h-5 w-full' />
                        </TableCell>
                      ))}
                  </TableRow>
                ))
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className='text-center py-6 text-muted-foreground'
                >
                  No categories found. Create one by clicking &quot;Add &quot;.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className='!bg-red-800' onClick={handleDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        category={selectedCategory}
        onSubmit={handleCreateCategory}
        isLoading={updateCategory.isPending || createCategory.isPending}
      />
    </div>
  )
}
