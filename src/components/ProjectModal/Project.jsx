import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { fullDatePattern } from '../../constants'
import projectService from '../../services/projects'
import Editable from '../Editable'
import Modal from '../Modal'
import { useField } from '../../hooks'
import './Project.css'
import projects from '../../services/projects'


const ProjectForm = (updateProject) => {
  
  const title = useField('text','title') 
  const estimatedHours = useField('number','estimated-hours')
  const [dueDate, setDueDate] = useState(new Date()) 
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setDueDate(new Date(new Date(dueDate).setHours(23,0,0,0)))
    console.log(new Date(new Date(dueDate).setHours(23,0,0,0)))
    const newProject = { title, dueDate }
    const {id, dueDate: returnedDueDate} = await projectService.create(newProject)
    updateProject([...projects,{title, dueDate: returnedDueDate, id}])
  }
  
  return (
    <>
      <h2>Create new project</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'><strong>Title  </strong></label>
        <input {...title.form} />
        <label htmlFor='due-date'><strong>Due Date  </strong></label>
        <DatePicker 
        id='due-date'
        selected={dueDate}
        onChange={date => setDueDate(date)} />
        <label htmlFor='estimated-hours'><strong>Estimated hours  </strong></label>
        <input {...estimatedHours.form} />
        <button type='submit' className='blue add-project'>
          Add new project
        </button>
      </form>
    </>
  )
}

const ProjectList = ({projects, onShowReport, makeModalStatic, updateProject}) => {

  const handleDeleteProject = project => {
    projectService
      .remove(project.id)
      .then(response => {
        updateProject([...projects.filter(p =>p.id !== project.id)])
      })
  }

  const updateProjectDetails = project => {
    project.cards = project.cards.map(c => c.id)
    project.user = project.user.id
    projectService
      .update(project.id,project)
      .then(response => {
         updateProject([...projects.filter(p =>p.id !== project.id),{...response}])       
         makeModalStatic(false)
      })
  }

  return (
    <>
      <h2>Projects list</h2>
      <table className="styled-table">
          <thead>
            <tr>
              <th>Title </th>
              <th>Due Date </th>
              <th>Action </th>
            </tr>
          </thead>
          <tbody>
            {[...projects].sort((a,b) => a.dueDate - b.dueDate).map(p =>
            <tr key={p.id}>
              <td>
                <Editable 
                isEditing={makeModalStatic} 
                updateElement={title => updateProjectDetails({...p,title})} >
                  <span tabIndex='0'>{p.title}</span>
                </Editable>
              </td>
              <td>
                <Editable
                isEditing={makeModalStatic}
                updateElement={dueDate => updateProjectDetails({...p,dueDate})}
                >
                  <span tabIndex='0'>{format(new Date(p.dueDate), fullDatePattern)}</span>
                </Editable>
              </td>
              <td>
                <button onClick={() => onShowReport(p)}>
                  <label htmlFor='btn-report' className='sr-only'>View report</label>
                  <i className="far fa-chart-bar"></i>
                </button>
                <button onClick={() => handleDeleteProject(p)}>
                  <label htmlFor='btn-del-project' className='sr-only'>View report</label>
                  <i className="far fa-trash-alt"></i>
                </button>
              </td>
            </tr>)}
          </tbody>
      </table>   
    </>
  )
}

const Report = ({ project }) => {
  return (
    <div>
      <h1>{project.title}</h1>
      <p><strong>Due Date </strong>{ format(new Date(project.dueDate), fullDatePattern) }</p>
      <p><strong>Estimated hours</strong></p>
      <p><strong>Hours spent</strong></p>
      <p><strong>Hours left</strong></p>
      <p><strong>Average hours spent per week</strong></p>
    </div>
  )
}

const Project = ({projects, onCloseProjects, updateProject, makeModalStatic }) => {

    const [showReport, setShowReport] = useState(false)
    const [projectToShow, setProjectToShow] = useState(false)

    const handleShowReport = (project) => {
      setShowReport(true)
      setProjectToShow(project)
      makeModalStatic(true)
    }
    
    const handleCloseReport = () => {
      setShowReport(false)
      setProjectToShow(null)
      makeModalStatic(false)
    }

    return (
      <>
        <h1 className='project-modal-header'>
          <span className='project-modal-title'>Projects</span>
          <i
          tabIndex='0'
          className="fas fa-times close-project-modal"
          onClick={() => onCloseProjects()}
          onKeyDown={e => e.key === 'Enter' && onCloseProjects()} />
        </h1>
        <ProjectForm projects={projects} updateProject={updateProject} />
        <ProjectList 
        projects={projects}
        makeModalStatic={makeModalStatic}
        onShowReport={handleShowReport}
        updateProject={updateProject}
        />
         
        {showReport && 
          <Modal onCloseModal={handleCloseReport} >
            <Report project={projectToShow} />
          </Modal>}    
      </>
    )
}

export default Project