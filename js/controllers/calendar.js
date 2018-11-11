//Global Variables
let monthArray = [];
for (let i = 0; i < 12; i++) {
  monthArray[i] = new Calendar(i + 1);
}
let date = new Date();
let month = date.getMonth();

//Assignment 6 code to use dummy data to show in the grid
let dummyData = () => {
  let request = new XMLHttpRequest();
  request.open("GET", "./sampleTasks.json", false);
  request.send();
  let sampleTasks = JSON.parse(request.response).Tasks;
  console.log(sampleTasks);
  //adding the tasks to the data structure
  //First Task.
  firstDummyTask = sampleTasks[0];
  firstTask = new Task(firstDummyTask.name, firstDummyTask.startingTime, firstDummyTask.duration, firstDummyTask.place, firstDummyTask.notes);
  monthArray[month].month.addTask(firstTask, 5);
  //Second Task
  secondDummyTask = sampleTasks[1];
  secondTask = new Task(secondDummyTask.name, secondDummyTask.startingTime, secondDummyTask.duration, secondDummyTask.place, secondDummyTask.notes);
  monthArray[month].month.addTask(firstTask, 11);
  //Third Task
  thirdDummyTask = sampleTasks[2];
  thirdTask = new Task(thirdDummyTask.name, thirdDummyTask.startingTime, thirdDummyTask.duration, thirdDummyTask.place, thirdDummyTask.notes);
  monthArray[month].month.addTask(firstTask, 11);
  //Fourth Task
  fourthDummyTask = sampleTasks[3];
  fourthTask = new Task(fourthDummyTask.name, fourthDummyTask.startingTime, fourthDummyTask.duration, fourthDummyTask.place, fourthDummyTask.notes);
  monthArray[month].month.addTask(firstTask, 28);
  //Fifth Task
  fifthDummyTask = sampleTasks[4];
  fifthTask = new Task(fifthDummyTask.name, fifthDummyTask.startingTime, fifthDummyTask.duration, fifthDummyTask.place, fifthDummyTask.notes);
  monthArray[month].month.addTask(firstTask, 23);
}

let initialState = () => {
  monthArray[month].generateCalendarGrid();

}

let changeMonths = () => {
  document.addEventListener('click', function (event) {
    if (event.target.matches('.chevron')) {
      if (event.target.matches('.left')) {
        if (month != 0) {
          monthArray[month].deleteCalendarGrid();
          month -= 1;
          monthArray[month].generateCalendarGrid();
        }
      };
      if (event.target.matches('.right')) {
        if (month != 11) {
          monthArray[month].deleteCalendarGrid();
          month += 1;
          monthArray[month].generateCalendarGrid();
        }
      };
    }
  });
}

window.addEventListener('load', () => {
  dummyData();
  initialState();
  changeMonths();
}, false);