Published at https://personaltaskmanager.netlify.app/
For demo please use username: admin, password: password

This project is a task management app inspired by Trello and Clockify. 
It will merge the functionalities of both but at a very simple level. Task creation will be tracked by a timer and a report should be generated to show time spent on tasks. 
A mentor at a Js react club I participated in suggested this project as it is very easily scalable. I found this to be really true, I built this project because then I dont really have to struggle with defining requirements and can just start with it so I get to learn and practice a lot. I can also keep increasing the complexity.
I also wanted to create a task tracker which will help me with estimation as this was an area which I struggled with when I first started my career in IT.

Functionality implemented so far: 
Adding, modifying and deleting cards, lists and projects. Time tracking on tasks. A report generated on tracked time on project. Registration and authorisation.

Functionality to be implemented:
Drag and drop, showing the report on the project in graphical form, showing tasks and weekly, monthly time tracking in calendar, adding checklists and notes, activity tracking and archiving.

References:

https://trello.com/
https://clockify.me/

https://medium.com/@pitipatdop/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82

asciant:- https://github.com/react-hook-form/react-hook-form/issues/566

For modal css:
https://peteris.rocks/blog/modal-window-in-react-from-scratch/

For timer:
https://upmostly.com/tutorials/build-a-react-timer-component-using-hooks
https://www.codespeedy.com/convert-seconds-to-hh-mm-ss-format-in-javascript/

For solving my issue with setting the editable state variable inside the Editable component(a reuseable component which makes any component inside it editable when clicked or focused). Solved by adding an event handler to the child from the Editable component as shown in this blog.
https://blog.logrocket.com/the-complete-guide-to-building-inline-editable-ui-in-react/

To remove warning of memory leak due to state update after component unmount
https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component

Trapping focus inside a modal for accessibility
https://tinloof.com/blog/how-to-create-an-accessible-react-modal/ - Code has an error and works only because there are only two focusable elements in the modal but otherwise great.
https://uxdesign.cc/how-to-trap-focus-inside-modal-to-make-it-ada-compliant-6a50f9a70700

Making redirects work on netlify
https://dev.to/rajeshroyal/page-not-found-error-on-netlify-reactjs-react-router-solved-43oa

Css for table
https://dev.to/dcodeyt/creating-beautiful-html-tables-with-css-428l
