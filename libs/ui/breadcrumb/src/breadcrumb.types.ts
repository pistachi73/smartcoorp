export type BreadcrumbProps = {
  /** Home url */
  homeUrl: string;
  /** Breadcrumb items */
  breadcrumbs: BreadcrumbItem[];

  style?: React.CSSProperties;
};

export type BreadcrumbItem = {
  label: string;
  href: string;
};
