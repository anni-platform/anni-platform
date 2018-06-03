import { withRouter } from 'react-router';
import ProjectManager from 'containers/ProjectManager';
import ProjectDetails from './components/Details';
import AuthManager from 'containers/AuthManager';

export default withRouter(ProjectManager(AuthManager(ProjectDetails)));
