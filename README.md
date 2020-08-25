Published at https://obscure-waters-16235.herokuapp.com/

Creating a task management app inspired by Trello and Clockify. 
It will merge the functionalities of both but at a very simple level. Task creation will be tracked by a timer and a report should be generated to show time spent on tasks.

Functionality implemented so far: Task creation, list creation, card details shown, connected to database, published at heroku

Next steps:
1. Add card detail modifications.
2. Take time tracking state up from the card details component, so time can be tracked after the task has been closed, and display timer on a task if it is on for a certain task. Multiple timers cannot be started at the same time since currently it is a personal use task manager. Add date picker. Make the list scrollable instead of the page.
3. Login functionality.
4. Moving tasks, completing tasks, archiving tasks, showing archived tasks, unarchiving tasks, drag and drop. Activity tracking, time tracking, date picker. All card details modifications.
5. Linking tasks to projects. Showing reports of time spent on projects. Activity log of projects and so on.
6. Check accessibility, accreditation etc.
7. Add ability to upload on image as background (using multer)/ or random


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

