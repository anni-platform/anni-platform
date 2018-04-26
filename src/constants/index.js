import * as project from './projects';
import * as auth from './auth';
import * as file from './file';
import * as content from './content';

export default {
  project,
  auth,
  file,
  content,
  REORDER_ITEM: 'REORDER_ITEM',
  DEFAULT_STATE: { auth: {}, projects: {}, files: {} }
};

export const breakpointSizes  = {
  xl: 1600,
  lg: 1200,
  md: 960,
  sm: 570
};
