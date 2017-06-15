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
