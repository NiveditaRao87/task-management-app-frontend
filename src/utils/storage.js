const userKey = 'loggedTaskManagerAppUser'
const timerKey = 'TaskManagerAppTimer'

const saveUser = (user) =>
  localStorage.setItem(userKey, JSON.stringify(user))

const loadUser = () =>
  JSON.parse(localStorage.getItem(userKey))

const logoutUser = () =>
  localStorage.removeItem(userKey)

const saveTimer = (timer) =>
  localStorage.setItem(timerKey, JSON.stringify(timer))

const loadTimer = () =>
  JSON.parse(localStorage.getItem(timerKey))

const removeTimer = () =>
  localStorage.removeItem(timerKey)
export default {
  saveUser,
  loadUser,
  logoutUser,
  saveTimer,
  loadTimer,
  removeTimer
}