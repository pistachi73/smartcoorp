import { render } from '@testing-library/react';

import SmartDesign from './smart-design';

describe('SmartDesign', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SmartDesign />);
    expect(baseElement).toBeTruthy();
  });
});
