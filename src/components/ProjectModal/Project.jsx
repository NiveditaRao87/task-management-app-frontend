import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format, compareDesc } from 'date-fns'
import { fullDatePattern } from '../../constants'
import projectService from '../../services/projects'
import Editable from '../Editable'
import Modal from '../Modal'
import { useField } from '../../hooks'
import './Project.css'

const ProjectForm = ({ projects, updateProject, makeModalStatic, setShowProjectForm }) => {

  const title = useField('text','title')
  const estimatedHours = useField('number','estimated-hours')
  const [dueDate, setDueDate] = useState(new Date())

  const reset = () => {
    title.reset()
    estimatedHours.reset()
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setDueDate(new Date(new Date(dueDate).setHours(23,0,0,0)))
    if(!title.value){
      return
    }
    const newProject = { title: title.value, dueDate, estimatedHours: estimatedHours.value }
    const returnedProject = await projectService.create(newProject)
    updateProject([...projects,returnedProject])
    reset()
    setDueDate(new Date())
    setShowProjectForm(false)
  }

  const handleCalendarOpen = () => {
    makeModalStatic(true)
  }
  const handleCalendarClose = () => {
    makeModalStatic(false)
  }
  const handleCancelForm = () => {
    setShowProjectForm(false)
    reset()
    setDueDate(new Date())
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
          onChange={date => setDueDate(date)}
          onCalendarOpen={handleCalendarOpen}
          onCalendarClose={handleCalendarClose} />
        <label htmlFor='estimated-hours'><strong>Estimated hours  </strong></label>
        <input {...estimatedHours.form} />
        <button type='submit' className='blue add-project'>
          Add new project
        </button>
        <button className="btn-cancel-form" onClick={handleCancelForm}>Cancel</button>
      </form>
    </>
  )
}

const ProjectList = ({ projects, onShowReport, makeModalStatic, updateProject }) => {

  const handleDeleteProject = project => {
    if(!(window.confirm('Are you sure you want to delete this project?'))){
      return
    }
    projectService
      .remove(project.id)
      .then(() => {
        updateProject([...projects.filter(p => p.id !== project.id)])
      })
  }

  const updateProjectDetails = project => {
    const sortByDueDate = (a,b) => compareDesc(new Date(a.dueDate),new Date(b.dueDate)) !== 0
      ? compareDesc(new Date(a.dueDate),new Date(b.dueDate))
      : a.estimatedHours - b.estimatedHours
    project.cards = project.cards.length !== 0 ? project.cards.map(c => c.id ? c.id : c) : []
    project.user = project.user.id
    projectService
      .update(project.id,project)
      .then(response => {
        updateProject([...projects.filter(p => p.id !== project.id),{ ...response }].sort(sortByDueDate))
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
            <th>Estimated hours</th>
            <th>Action </th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p =>
            <tr key={p.id}>
              <td>
                <Editable
                  isEditing={makeModalStatic}
                  updateElement={title => updateProjectDetails({ ...p,title })} >
                  <span tabIndex='0' className='project-title'>{p.title}</span>
                </Editable>
              </td>
              <td>
                <Editable
                  isEditing={makeModalStatic}
                  updateElement={dueDate => updateProjectDetails({ ...p,dueDate })}
                >
                  <span tabIndex='0' className='project-detail'>
                    {format(new Date(p.dueDate), fullDatePattern)}
                  </span>
                </Editable>
              </td>
              <td>
                <Editable
                  isEditing={makeModalStatic}
                  updateElement={estimatedHours => updateProjectDetails({ ...p,estimatedHours })}
                >
                  <span tabIndex='0' className='project-detail'>
                    {p.estimatedHours ? p.estimatedHours : <strong className='add-estimated'>+ Add</strong>}
                  </span>
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

const Report = ({ project, onCloseReport }) => {

  const [projectReport, setProjectReport] = useState('')

  useEffect(() => {
    projectService.getById(project.id)
      .then(project => setProjectReport(project))
  },[project.id])

  if(!projectReport){
    return null
  }

  return (
    <div>
      <h1 className='report-modal-header'>
        <span className='report-modal-title'>{projectReport.title}</span>
        <i
          tabIndex='0'
          className="fas fa-times close-report-modal"
          onClick={() => onCloseReport()}
          onKeyDown={e => e.key === 'Enter' && onCloseReport()} />
      </h1>
      <p><strong>Due Date </strong>{ format(new Date(projectReport.dueDate), fullDatePattern) }</p>
      <p><strong>Estimated hours </strong>{projectReport.estimatedHours}</p>
      <p><strong>Hours spent </strong>{projectReport.totalHoursSpent}</p>
      <p><strong>Hours left </strong>{projectReport.totalHoursLeft}</p>
      <p><strong>Average hours spent per week </strong>{projectReport.avgHoursPerWeek}</p>
    </div>
  )
}

const Project = ({ projects, onCloseProjects, updateProject, makeModalStatic }) => {

  const [showReport, setShowReport] = useState(false)
  const [projectToShow, setProjectToShow] = useState(false)
  const [showProjectForm, setShowProjectForm] = useState(false)

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
    <div className='project-modal'>
      <h1 className='project-modal-header'>
        <span className='project-modal-title'>Projects</span>
        <i
          tabIndex='0'
          className="fas fa-times close-project-modal"
          onClick={() => onCloseProjects()}
          onKeyDown={e => e.key === 'Enter' && onCloseProjects()} />
      </h1>
      {showProjectForm
        ? <ProjectForm
          projects={projects}
          updateProject={updateProject}
          makeModalStatic={makeModalStatic}
          setShowProjectForm={setShowProjectForm} />
        : <button className='btn-project-form' onClick={() => setShowProjectForm(true)}>Create a new Project</button>
      }
      <ProjectList
        projects={projects}
        makeModalStatic={makeModalStatic}
        onShowReport={handleShowReport}
        updateProject={updateProject}
      />

      {showReport &&
          <Modal onCloseModal={handleCloseReport} >
            <Report project={projectToShow} onCloseReport={handleCloseReport} />
          </Modal>}
    </div>
  )
}

export default Project