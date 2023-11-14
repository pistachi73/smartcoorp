import { render, screen } from '@smart-editor/utils/testing/test-utils';

import { Hero } from '../hero';

describe('<Hero />', () => {
  it('should render the heading', () => {
    render(<Hero />);

    expect(
      screen.getByRole('heading', { name: /blogging redefined/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /seamlessly transition from words/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /to json-powered content/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /unlock limitless creative control to shape your story precisely as you envision, revolutionising how you craft content./i
      )
    ).toBeInTheDocument();

    expect(screen.getByText(/convert to json/i)).toBeInTheDocument();
    expect(screen.getByText(/publish/i)).toBeInTheDocument();

    expect(screen.getByRole('img', { name: /craft/i })).toBeInTheDocument();
    expect(
      screen.getByRole('img', { name: /convert to json/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /publish/i })).toBeInTheDocument();

    const startCraftingButton = screen.getByRole('link', {
      name: /start crafting/i,
    });

    expect(startCraftingButton).toBeInTheDocument();
    expect(startCraftingButton).toHaveAttribute('href', '/signup');
  });
});
