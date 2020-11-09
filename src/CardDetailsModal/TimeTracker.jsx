import React, { useState } from 'react'
import { differenceInMinutes, format, isValid, parse } from 'date-fns'
import { datePattern, timePattern } from '../constants'
import Editable from '../components/Editable'
import './TimeTracker.css'

const TimeTracker = ({ card, updateCard, makeModalStatic }) => {

    const formatTimeSpent = (timeSpentMinutes,style) => {
      const hoursSpent = Math.floor(timeSpentMinutes/60)
      const minutesSpent = timeSpentMinutes - (hoursSpent*60)
      return style === 'in-words'
       ?  hoursSpent ? `${hoursSpent} hours and ${minutesSpent} mins` :  `${minutesSpent} mins`
       :  `${hoursSpent}:${minutesSpent < 10 ? 0 : ''}${minutesSpent}`
    }
  
    const deleteRecord = timeSpent => {
      if(!window.confirm('Are you sure you want to delete this time entry?') ){
          return
      }
      console.log(card.timeSpent, timeSpent)
      card.timeSpent = card.timeSpent.filter(t => t.start.toString() !== timeSpent.start.toString())
      updateCard({...card,
            list: card.list.id,
            project: card.project && card.project.id
            })
    }

    const updateTimeFrom = (newTimeFrom, timeSpent) => {
      const start = parse(newTimeFrom,timePattern, new Date(timeSpent.start))
      if(isValid(start)){
        card.timeSpent = card.timeSpent.map(t => t.id !== timeSpent.id
          ? t
          : {...t,start}
          )
        updateCard({...card, 
        list: card.list.id,
        project: card.project && card.project.id
        })
      } else {
        window.alert('Invalid date input')
      }
    }

    const updateTimeTo = (newTimeTo, timeSpent) => {
      const stop = parse(newTimeTo,timePattern, new Date(timeSpent.stop))
      if(isValid(stop)){
        card.timeSpent = card.timeSpent.map(t => t.id !== timeSpent.id
          ? t
          : {...t,stop}
          )
        updateCard({...card, 
        list: card.list.id,
        project: card.project && card.project.id
        })
      } else {
        window.alert('Invalid date input')
      }
    }

    const reducer = (total,t) => total + differenceInMinutes(new Date(t.stop), new Date(t.start))

    return (
      <>
        {card.timeSpent.length > 0 && 
          <>
          <p><strong>Total time spent on this task: </strong>
             <strong className='total-time'>{formatTimeSpent(card.timeSpent.reduce(reducer,0),'in-words')}</strong>
          </p>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>From </th>
                <th>To </th>
                <th>Duration </th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
          {([...card.timeSpent]
          .sort((a,b) => b.start-a.start))
          .map(timeSpent => 
            <tr key={timeSpent.start} >
              <td>{format(new Date(timeSpent.start), datePattern)}</td>
              <td>
                <Editable isEditing={makeModalStatic} updateElement={newTimeFrom => updateTimeFrom(newTimeFrom, timeSpent)}>
                  <span className='time-from-to' tabIndex='0'>{format(new Date(timeSpent.start), timePattern)}</span>
                </Editable>
              </td>
              <td>
                <Editable isEditing={makeModalStatic} updateElement={newTimeTo => updateTimeTo(newTimeTo, timeSpent)}>
                  <span className='time-from-to' tabIndex='0'>{format(new Date(timeSpent.stop), timePattern)}</span>
                </Editable>
              </td>
              <td> {formatTimeSpent(differenceInMinutes(new Date(timeSpent.stop),new Date(timeSpent.start)))}</td>
              <td>
                {/* <label htmlFor='edit-time-spent' className='sr-only'>Edit row</label> 
                <i tabIndex='0' 
                id='edit-time-spent' 
                className="far fa-edit edit-row"
                onClick={() =>editRecord(timeSpent)}
                onKeyDown={(e) => e.key === 'Enter' && editRecord(timeSpent)}
                ></i> */}
                <label htmlFor='delete-time-spent' className='sr-only'>Delete row</label> 
                <i 
                  tabIndex='0' 
                  id='delete-time-spent' 
                  className="far fa-trash-alt" 
                  onClick={() => deleteRecord(timeSpent)}
                  onKeyDown={(e) => e.key === 'Enter' && deleteRecord(timeSpent)}
                ></i>
              </td>
            </tr>
          )}
          </tbody>
          </table>
          </>}
      </>
    )
  }
  
export default TimeTracker