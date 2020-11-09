import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import { fullDatePattern } from '../constants'
import projectService from '../services/projects'
import Editable from '../components/Editable'
import './Project.css'

const Project = ({projects, onCloseProjects, updateProject, makeModalStatic}) => {

    const [title, setTitle] = useState('') 
    const [dueDate, setDueDate] = useState(new Date()) 

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDueDate(new Date(new Date(dueDate).setHours(23,0,0,0)))
        console.log(new Date(new Date(dueDate).setHours(23,0,0,0)))
        const newProject = { title, dueDate }
        const {id, dueDate: returnedDueDate} = await projectService.create(newProject)
        updateProject({title, dueDate: returnedDueDate, id})
    }

    const handleShowReport = (project) => {
      console.log('Show report now')
    }

    const handledeleteProject = project => {
      console.log('Delete project')
    }

    const updateProjectDetails = project => {
      console.log('update project')
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
        <h2>Create new project</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='title'><strong>Title  </strong></label>
          <input 
          type='text'
          id='title' 
          placeholder='Enter title'
          value={title}
          onChange={event => setTitle(event.target.value)} />
          <label htmlFor='due-date'><strong>Due Date  </strong></label>
          <DatePicker 
          id='due-date'
          selected={dueDate}
          onChange={date => setDueDate(date)} />
          <button type='submit' className='blue add-project'>
            Add new project
          </button>
        </form>

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
                  makeModalStatic={makeModalStatic} 
                  updateElement={title => updateProjectDetails(title)} >
                    <span tabIndex='0'>{p.title}</span>
                  </Editable>
                </td>
                <td>
                  <Editable makeModalStatic={makeModalStatic} updateElement={dueDate => updateProjectDetails(dueDate)}>
                    <span tabIndex='0'>{format(new Date(p.dueDate), fullDatePattern)}</span>
                  </Editable>
                </td>
                <td>
                  <button onClick={() => handleShowReport(p)}>
                    <label htmlFor='btn-report' className='sr-only'>View report</label>
                    <i className="far fa-chart-bar"></i>
                  </button>
                  <button onClick={() => handledeleteProject(p)}>
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

export default Project