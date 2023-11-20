import ApiReference from '@smart-editor/components/user-dashboard/api-reference';
import './code-snippets.css';
import { type Metadata } from 'next';

import { Breadcrumb, type BreadcrumbItem } from '@smartcoorp/ui/breadcrumb';
import { spaceXL } from '@smartcoorp/ui/tokens';

export const metadata: Metadata = {
  title: 'Smarteditor API - A comprehensive guide',
  description:
    'Explore the Smarteditor API documentation to seamlessly integrate our powerful editing and content export capabilities into your applications. This comprehensive guide provides detailed insights, examples, and best practices to help you unlock the full potential of Smarteditor in your development projects.',
};

const ApiReferencePage = async () => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: 'API Reference',
      href: '/api-reference',
    },
  ];

  return (
    <>
      <Breadcrumb
        homeUrl="/posts"
        breadcrumbs={breadcrumbs}
        style={{
          marginBottom: spaceXL,
        }}
      />
      <ApiReference />
    </>
  );
};

export default ApiReferencePage;
