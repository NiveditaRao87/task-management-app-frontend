You should be able to add lists, and add cards to list. Try to make it remind you of sticky notes. With option to choose colour like in google keep, use pastels so there isn't much contrast in the backgrounds of the cards.
Next steps - handle add card, add list, then stop and fix the css, add background etc.
on clicking a card, bigger view should open on new window
handle adding settings first to card - such as adding a description, a due date, adding a timer to track time spent on it
Drag and drop to move card. Stop and fix CSS
Stop and add backend
Open calendar option in card to show the time spent on that task
Then activity tracker.... random thoughts, not all needs to be a part of the first version.

Things done so far created lists, and card components,  handled adding of cards, simple css is done temporarily, 
Time spent in thinking what I want to do and development - 4 hours
Refactor the code so that a single form is used for both add card and add lists, now use it to add list form, maybe refactor button to do the same, add background image
Creating a task management app inspired by Trello and Clockify. 
It will merge the functionalities of both but at a very simple level. Task creation will be tracked by a timer and a report should be generated to show time spent on tasks.

Functionality implemented so far: Task creation, list creation, card details shown.
Next steps:
1. Connect to database. Publish at herokku.
2. Take time tracking state up from the card details component, so time can be tracked after the task has been closed, and display timer on a task if it is on for a certain task. Multiple timers cannot be started at the same time since currently it is a personal use task manager. 
3. Login functionality.
4. Moving tasks, completing tasks, archiving tasks, showing archived tasks, unarchiving tasks, drag and drop. Activity tracking, time tracking, date picker. All card details modifications.
5. Linking tasks to projects. Showing reports of time spent on projects. Activity log of projects and so on.
6. Check accessibility, accreditation etc.


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

Unsplash API:
https://source.unsplash.com/
