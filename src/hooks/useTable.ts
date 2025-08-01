import { useState, useEffect } from 'react';

interface Column {
  id: string;
  label: string;
}

interface UseTableProps<T> {
  data: T[];
  columns: Column[];
  loading?: boolean;
}

export const useTable = <T extends Record<string, any>>(
  initialData: UseTableProps<T>['data'],
  columns: UseTableProps<T>['columns'],
  isLoading = false,
  defaultOrder: 'desc' | 'asc' = 'asc',
  defaultOrderBy?: any
) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [filterText, setFilterText] = useState('');
  const [order, setOrder] = useState<'asc' | 'desc'>(defaultOrder);
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy || columns[0].id);
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredData = initialData.filter(row =>
    columns.some(column =>
      row[column.id]?.toString().toLowerCase().includes(filterText.toLowerCase())
    )
  );

  const stableSort = (array: T[], comparator: (a: T, b: T) => number): T[] => {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const orderComparison = comparator(a[0], b[0]);
      if (orderComparison !== 0) return orderComparison;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  };

  const getComparator = (order: 'asc' | 'desc', orderBy: string) =>
    order === 'desc'
      ? (a: T, b: T) => descendingComparator(a, b, orderBy)
      : (a: T, b: T) => -descendingComparator(a, b, orderBy);

  const descendingComparator = (a: T, b: T, orderBy: string) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const sortedAndFilteredData = stableSort(filteredData, getComparator(order, orderBy)).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return {
    sortedAndFilteredData,
    filterText,
    handleFilterChange,
    order,
    orderBy,
    handleRequestSort,
    page,
    rowsPerPage,
    handlePageChange,
    handleRowsPerPageChange,
    totalRows: filteredData.length,
    loading,
  };
};
