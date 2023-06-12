import './AdminPage.css'
import Dashboard from '../components/Dashboard'
import SurveyCreationForm from '../forms/SurveyCreationForm'




function AdminPage() {
  return (
    <>
    <div id='dashboard'>
    <Dashboard />
    <h4>Availabe Templates</h4>
    <div id='createform'>
    <h5>Create A form</h5>
    < SurveyCreationForm /></div>

    </div>
    
    </>
  )
}
export default AdminPage;
