import { useState } from 'react';
import { sortable } from '@patternfly/react-table';
import { orderArrayByProp, orderByArray, uniq } from 'Utilities/helpers';

const isSortable = (column) => column.sortByProp || column.sortByFunction;

const addSortableTransform = (columns) =>
  columns.map((column) => ({
    ...column,
    ...(isSortable(column)
      ? {
          transforms: uniq([...(column?.transforms || []), sortable]),
        }
      : {}),
  }));

const columnOffset = (options = {}) =>
  (typeof options.onSelect === 'function') +
  (typeof options.detailsComponent !== 'undefined');

const useTableSort = (columns, options = {}) => {
  const [sortBy, setSortBy] = useState(
    options.sortBy || {
      index: 0,
      direction: 'asc',
    }
  );
  const onSort = (_, index, direction) =>
    setSortBy({
      index,
      direction,
    });
  const currentSortableColumn = columns[sortBy.index - columnOffset(options)];
  const sorter = (items) =>
    currentSortableColumn?.sortByArray
      ? orderByArray(
          items,
          currentSortableColumn?.sortByProp,
          currentSortableColumn?.sortByArray,
          sortBy.direction
        )
      : orderArrayByProp(
          currentSortableColumn?.sortByProp ||
            currentSortableColumn?.sortByFunction,
          items,
          sortBy.direction
        );

  return {
    sorter,
    tableProps: {
      onSort,
      sortBy,
      cells: addSortableTransform(columns),
    },
  };
};

export default useTableSort;
