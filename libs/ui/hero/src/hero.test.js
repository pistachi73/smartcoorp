import { screen } from '@testing-library/react';

import { render } from '../../test-utils';

import { Hero } from './hero';

describe(`Hero`, () => {
  it('renders Hero', () => {
    render(<Hero>This is a hero</Hero>);
    expect(screen.getByText('This is a hero')).toBeInTheDocument();
  });
});
