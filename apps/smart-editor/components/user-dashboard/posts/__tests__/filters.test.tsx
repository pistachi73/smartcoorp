import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@smart-editor/utils/testing/test-utils';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Filters } from '../filters';

jest.mock('next/navigation');

const mockPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({
  push: mockPush,
});

const mockPathname = '/pathname';
(usePathname as jest.Mock).mockReturnValue(mockPathname);

describe('<Filters />', () => {
  it('should render title filter with current search param', () => {
    const title = 'test';
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(title),
    });
    render(<Filters />);

    expect(screen.getByRole('textbox')).toHaveValue(title);
  });

  it("should call router.push with 'title' param", async () => {
    const search = 'search';
    (useSearchParams as jest.Mock).mockReturnValueOnce(new URLSearchParams());
    render(<Filters />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: search },
    });

    expect(screen.getByRole('textbox')).toHaveValue(search);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(`${mockPathname}?title=${search}`);
    });
  });
  it("should call router.push without 'title' param", async () => {
    render(<Filters />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: '' },
    });

    expect(screen.getByRole('textbox')).toHaveValue('');

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(mockPathname);
    });
  });
});
