import { act, fireEvent, render, screen, waitFor } from '../../test-utils';

import { Menu, MenuDivider, MenuItem } from './index';

const renderComponent = () => {
  act(() =>
    render(
      <Menu triggerText="trigger menu">
        <MenuItem to="test">Categoria 1</MenuItem>
        <MenuItem to="test">Teachers</MenuItem>
        <MenuDivider></MenuDivider>
        <MenuItem to="test" disabled>
          Disabled link
        </MenuItem>
        <MenuItem to="test">Online teaching</MenuItem>
      </Menu>
    )
  );
};
describe(`Menu`, () => {
  it('renders Menu as expected', () => {
    renderComponent();
    expect(screen.getByText('trigger menu'));
  });
  it('should open menu onClick', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'trigger menu' }));

    expect(screen.getByText('Teachers')).toBeInTheDocument();
    expect(screen.getByText('Categoria 1')).toBeInTheDocument();
    expect(screen.getByText('Online teaching')).toBeInTheDocument();
    expect(screen.getByText('Disabled link')).toBeInTheDocument();

    expect(screen.getByText('Disabled link')).toHaveAttribute('tabindex', '-1');
  });

  it('should close on Esc keypress', async () => {
    renderComponent();

    fireEvent.click(screen.getByRole('button', { name: 'trigger menu' }));
    expect(screen.getByText('Teachers')).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole('button', { name: 'trigger menu' }), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    await waitFor(() =>
      expect(screen.queryByText('Teachers')).not.toBeInTheDocument()
    );
  });
});
