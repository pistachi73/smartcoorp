import { nxE2EStorybookPreset } from '@nrwl/storybook/presets/cypress';
import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'prdpeo',
  e2e: nxE2EStorybookPreset(__dirname),
});
