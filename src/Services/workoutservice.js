import Api from '../Services/api'

export default {

  fetchAllProgress () {
    return Api().get('/progress')
  },

  fetchAllSchedules () {
    return Api().get('/schedule')
  },
  postWorkout (schedule) {
    return Api().post('/schedule', schedule,
      { headers: {'Content-type': 'application/json'} })
  },
  postProgress (progress) {
    return Api().post('/progress', progress,
      { headers: {'Content-type': 'application/json'} })
  },
  deleteProgress (id) {
    return Api().delete(`/progress/${id}`)
  },
  fetchProgress (id) {
    return Api().get(`/progress/${id}`)
  },
  putProgress (id, progress) {
    console.log('REQUESTING ' + progress._id + ' ' +
      JSON.stringify(progress, null, 5))
    return Api().put(`/progress/${id}`, progress,
      { headers: {'Content-type': 'application/json'} })
  }
}
