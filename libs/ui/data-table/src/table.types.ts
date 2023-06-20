import { ColumnDef } from '@tanstack/react-table';

export type TableProps<T> = {
  /** Column definition */
  columnDefs: ColumnDef<T>[];
  /** Table data */
  data: T[];
  /** Enable creating new items in the table. Prop used as url to access the edit panel */
  createUrl?: string;
  /** Enable multisorting */
  enableMultiSort?: boolean;
  /** Enable select */
  enableSelect?: boolean;
  /** Default Column visibility columns */
  defaultColumnVisibility?: Record<string, boolean>;
  /** @callback */
  onRowsDelete?: (rows: T[]) => void;
  /** Edit instance path */
  editUrl?: string;
};
