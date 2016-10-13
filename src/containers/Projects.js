import { connect } from 'react-redux'
import ProjectList from '../components/ProjectList'

const mapStateToProps = ({ projects}) => ({
  projects
})

const ProjectListContainer = connect(
  mapStateToProps
)(ProjectList);

export default ProjectListContainer;
