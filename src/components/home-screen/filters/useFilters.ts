import {useState} from 'react';
import {GetTasksParams} from '../../domain/types';

export const useFilters = () => {
  const [filters, setFilters] = useState<GetTasksParams>({
    sort_direction: undefined,
    sort_field: undefined,
    page: 1,
  });

  const onPageClick = (page: number) => {
    if (filters.page !== page) {
      setFilters(oldFilters => ({...oldFilters, page}));
    }
  };

  const onFilterClick = (field: GetTasksParams['sort_field']) => {
    if (filters.sort_field !== field) {
      setFilters({page: 1, sort_field: field, sort_direction: 'asc'});
    } else {
      setFilters(oldFilters => ({
        page: 1,
        sort_field: field,
        sort_direction: oldFilters.sort_direction === 'asc' ? 'desc' : 'asc',
      }));
    }
  };

  return {
    filters,
    onPageClick,
    onFilterClick,
  };
};
