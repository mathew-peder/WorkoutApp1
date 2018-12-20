import axios from 'axios'

export default() => {
  return axios.create({
    baseURL: 'https://mpeder-webapp1.herokuapp.com/'
  })
}
