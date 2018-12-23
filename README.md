# workoutapp1

> A Vue.js project
Workout App Functionality

Navigation

	The Workout App uses a navigation bar at the top of the page for all pages. These pages will be discussed below and are shown as:
•	Home
•	View Progression
•	Add Progression
•	View Workout Schedules
•	Add Schedule
•	About
•	Contact
•	Login/Out (Not implemented)

Home

	This is the home page of the app, which is the first page shown when the app is loaded. There isn’t much functionality added to this page except a link at the bottom to start a new schedule. The navigation bar at the top is how the users will navigate to each page.

View Progression and View Workout Schedules

	These two pages have the same basic functionality where a user can view the data added to each. These use tables from vue-tables-2 which displays all the data in a table format. The columns on each page are different, to show the differing data, with ‘View Progression’ showing the date, age, gender, height, weight, and waist, while ‘View Workout Schedules’ shows the days of the week, the workouts added and the reps for each workout. Both of these pages also have an edit and delete button which finds the selected data by ID and deletes or edits it, respectfully.

These pages also have filtering and searching functionality by clicking on the top of the columns to filter by ascending or descending order, or just searching in the filter box under the column heading.


Add Progression and Add Schedules

	These pages use a simple form to submit new data to the database. The form uses validation to ensure there are no empty forms, as well as make sure the data isn’t too long or short. Only numbers can be added where only numbers should be.

Add schedules currently does not work, but the code is there. The form is based off the same form Progression used, but there seems to be a currently unknown issue with the page loading.

About and Contact

	About contains text describing the app in short detail and contact hold basic text and links to my contact email, linkedin and github for the app.

Log In/Out

	There were plans to implement logging in and out so that each user would have their own schedules and progress, but I ran out of time to implement an entire new addition to the database.

Back-end and Front-End

The back-end sever can be accessed here: https://github.com/mathew-peder/WebApp1 
The front-end can be accessed here: https://github.com/mathew-peder/WorkoutApp1 
The Heroku link can be viewed here: https://mpeder-webapp1.herokuapp.com/ 
Youtube Link for the demo: https://www.youtube.com/watch?v=WkjEaczE8G4&feature=youtu.be


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
