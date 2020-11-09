import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import TimeTracker from './TimeTracker'
import 'react-tabs/style/react-tabs.css';

// tabs in this will be time tracked, activity log, notes and learnings, and a checklist of tasks within to be
// implemented in the order time tracking, notes, activity log and finally checklist

const TabsArea = ({card, updateCard, makeModalStatic}) => {
  
  // const tabList = [{"Activity Log",, "Time tracker", "Notes and learnings", "Checklist"]
  
  return (
    <Tabs>
      <TabList>
        <Tab>Activity Log</Tab>
        <Tab>Time tracker</Tab>
        <Tab>Notes and learnings</Tab>
        <Tab>Checklist of tasks</Tab>
      </TabList>
      <TabPanel>
        <h2>Activity log here</h2>
      </TabPanel>
      <TabPanel>
        <TimeTracker card={card} updateCard={updateCard} makeModalStatic={makeModalStatic} />
      </TabPanel>
      <TabPanel>
        <h2>Notes and learnings here. Will have the date the note was taken.
        Will be editable and will have one or more labels to be able to categorise all notes together on a separate
        page. </h2>
      </TabPanel>
      <TabPanel>
        <h2> Checlist for sub tasks for better organising the task</h2>
      </TabPanel>
    </Tabs>
  )
}

export default TabsArea