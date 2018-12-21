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
  upvoteDonation (id) {
    return Api().put(`/donations/${id}/vote`)
  },
  deleteProgress (id) {
    return Api().delete(`/progress/${id}`)
  },
  fetchDonation (id) {
    return Api().get(`/donations/${id}`)
  },
  putDonation (id, donation) {
    console.log('REQUESTING ' + donation._id + ' ' +
      JSON.stringify(donation, null, 5))
    return Api().put(`/donations/${id}`, donation,
      { headers: {'Content-type': 'application/json'} })
  }
}
