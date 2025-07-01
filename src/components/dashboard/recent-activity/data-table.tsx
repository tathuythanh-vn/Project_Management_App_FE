"use client"

import { useState } from "react" // Add this import

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
    ColumnFiltersState,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                         }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            pagination,
        },
    })

    return (
        <div className="rounded-md border-0">

            {/*Filter*/}
            <div className={'mb-4 p-2 border rounded-md shadow-xs w-fit flex justify-end bg-white'}>
                <input
                    type="text"
                    placeholder="Filter by user name..."
                    value={(table.getColumn("user")?.getFilterValue() as string) ?? ""}
                    onChange={(e) =>
                        table.getColumn("user")?.setFilterValue(e.target.value)
                    }
                    className="w-fit focus:outline-none text-base"
                />
            </div>

            <Table className={'bg-white rounded-md border-0 shadow-sm'}>
                <TableHeader className={'p-4 font-semibold text-xl'}>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id} className={'p-4 font-semibold text-base'}>
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
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={'border-0'}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id} className={'p-4 text-base'}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/*/!*Pagination*!/*/}
            {/*<div className="flex items-center justify-between px-4 py-2 mt-4 bg-white rounded-md shadow-sm">*/}
            {/*    <div className="text-sm text-muted-foreground">*/}
            {/*        Page {table.getState().pagination.pageIndex + 1} of{" "}*/}
            {/*        {table.getPageCount()}*/}
            {/*    </div>*/}
            {/*    <div className="space-x-2">*/}
            {/*        <button*/}
            {/*            className="px-3 py-1 border rounded disabled:opacity-50"*/}
            {/*            onClick={() => table.previousPage()}*/}
            {/*            disabled={!table.getCanPreviousPage()}*/}
            {/*        >*/}
            {/*            Previous*/}
            {/*        </button>*/}
            {/*        <button*/}
            {/*            className="px-3 py-1 border rounded disabled:opacity-50"*/}
            {/*            onClick={() => table.nextPage()}*/}
            {/*            disabled={!table.getCanNextPage()}*/}
            {/*        >*/}
            {/*            Next*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}