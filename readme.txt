Assignment 6
CS 2550 
Mario A. Carlos

For this assignment I decided to use JSON to store some data and parse it in the DOM, I used AJAX to display the Hero Images (heroImages.json) you can see on each month hero while changing the months. I also created some dummy data for  some tasks (sampleTasks.json).

-Hero Images.
You can see the code under the calendarView.js file, under the class Calendar in the first public function heroGrid(). It uses a GET request asynchronously and receives the heroImages.json. This file contains the months as keys and an object as a value, this object contains the imgUrl where the image is and the badge that is displayed on the upper right corner that gives credit to whoever took the picture.

-Sample Tasks.
These are dummy tasks, to showcase how the calendar grid will show each day, when there are tasks on that day. The code getting and parsing the sampleTasks.json file is in the calendar.js controller file, under the function dummyData(). This request is synchronous, since we want to wait till we have all of the tasks loaded when the initial state fires. The json file for the Sample Tasks is a little bit different from the Hero Images, since it's just an Array of tasks. After we receive the response and parse the JSON file, I used the data to create new instances of the class Task, and pushed it to the Calendar to display them in the grid.
Note: When the calendar displays, the days will only be showing how many events you have that day,  then the user will have to click the day, and they will be able to see what tasks they have and be able to delete them or add more tasks;  this hasn't been built yet, for now, I console.log() the tasks we got from the sampleTasks.json so you can see they are being parsed correctly.