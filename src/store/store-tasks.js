import Vue from 'vue'
import { uid, Notify } from 'quasar'
import {firebaseDb, firebaseAuth} from 'boot/firebase'
import {showErrorMessage} from 'src/functions/function-show-error-message'

const state = {
	tasks: {},
	search: "",
	sort: 'dueDate'
}

// Can't be asynchronous
const mutations = {
	updateTask(state, payload) {
		Object.assign(state.tasks[payload.id], payload.updates)
	},
	// https://vuejs.org/v2/api/#Vue-delete
	deleteTask(state, id) {
		Vue.delete(state.tasks, id)
	},
	// https://stackoverflow.com/questions/36671106/what-is-the-difference-between-vm-set-and-vue-set
	addTask(state, payload) {
		Vue.set(state.tasks, payload.id, payload.task)
	},
	clearTask(state) {
		state.tasks = {}
	},
	setSearch(state, value) {
		state.search = value
	},
	setSort(state, value) {
		state.sort = value
	},
}

// Can be asynchronous and always expect an Object
const actions = {
	updateTask({ dispatch }, payload) {
		dispatch('fbUpdateTask', payload)
	},
	deleteTask({ dispatch }, id) {
		dispatch('fbDeleteTask', id)
	},
	addTask({ dispatch }, task) {
		// uid() generates a unique ID
		// https://quasar.dev/quasar-utils/other-utils#Generate-UID
		let taskId = uid()
		let payload = {
			id: taskId,
			task: task
		}
		dispatch('fbAddTask', payload)
	},
	setSearch({ commit }, value) {
		commit('setSearch', value)
	},
	setSort({ commit }, value) {
		commit('setSort', value)
	},
	fbReadData({commit}) {
		let userId = firebaseAuth.currentUser.uid
		let userTasks = firebaseDb.ref('tasks/' + userId)
		// child added
		userTasks.on('child_added', snapshot => {
			let task = snapshot.val()
			let fbPayload = {
				id: snapshot.key,
				task: task
			}
			commit('addTask', fbPayload)
		})
		// child changed
		userTasks.on('child_changed', snapshot => {
			let task = snapshot.val()
			let fbPayload = {
				id: snapshot.key,
				updates: task
			}
			commit('updateTask', fbPayload)
		})
		// child removed
		userTasks.on('child_removed', snapshot => {
			let taskId = snapshot.key
			commit('deleteTask', taskId)
		})
	},
	fbAddTask({}, payload) {
		let userId = firebaseAuth.currentUser.uid
		let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
		taskRef.set(payload.task, error => {
			if (error) {
				showErrorMessage(error.message)
			} else {
				Notify.create('Task added')
			}
		})
	},
	fbUpdateTask({}, payload) {
		let userId = firebaseAuth.currentUser.uid
		let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
		taskRef.update(payload.updates, error => {
			if (error) {
				showErrorMessage(error.message)
			} else {
				Notify.create('Task updated')
			}
		})
	},
	fbDeleteTask({}, taskId) {
		let userId = firebaseAuth.currentUser.uid
		let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
		taskRef.remove(error => {
			if (error) {
				showErrorMessage(error.message)
			} else {
				Notify.create('Task deleted')
			}
		})
	},
}

// Get's data from the state and can manipulate it before passing it further
const getters = {
	// https://serversideup.net/sorting-in-vuejs-components-and-vuex-state/
	// https://stackoverflow.com/questions/56047923/how-to-sort-data-in-vuex-state-with-mutation
	// https://www.youtube.com/watch?v=OjS6SWS6G5c
	tasksSorted: (state) => {
		let tasksSorted = {},
			keysOrdered = Object.keys(state.tasks)
		keysOrdered.sort((a, b) => {
			let taskAProp = state.tasks[a][state.sort].toLowerCase(),
				taskBProp = state.tasks[b][state.sort].toLowerCase()
			if (taskAProp > taskBProp) return 1
			else if (taskAProp < taskBProp) return -1
			else return 0
		})
		keysOrdered.forEach((key) => {
			tasksSorted[key] = state.tasks[key]
		})
		return tasksSorted
	},
	tasksFiltered: (state, getters) => {
		let tasksSorted = getters.tasksSorted
		let tasksFiltered = {}
		if (state.search) {
			Object.keys(tasksSorted).forEach(function(key) {
				let task = tasksSorted[key],
				taskNameLowerCase= task.name.toLowerCase(),
				searchLowerCase= state.search.toLowerCase()
				if (taskNameLowerCase.includes(searchLowerCase)) {
					tasksFiltered[key] = task
				}
			})
			return tasksFiltered
		}
		return tasksSorted
	},
	tasksTodo: (state, getters) => {
		let tasksFiltered = getters.tasksFiltered
		let tasks = {}
		Object.keys(tasksFiltered).forEach(function(key) {
			let task = tasksFiltered[key]
			if (!task.completed) {
				tasks[key] = task
			}
		})
		return tasks
	},
	tasksCompleted: (state, getters) => {
		let tasksFiltered = getters.tasksFiltered
		let tasks = {}
		Object.keys(tasksFiltered).forEach(function(key) {
			let task = tasksFiltered[key]
			if (task.completed) {
				tasks[key] = task
			}
		})
		return tasks
	},
}

// https://stackoverflow.com/questions/47792212/what-exactly-is-namespacing-of-modules-in-vuex
export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}