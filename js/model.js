// --------------Task Class----------------
//      --------------Builds a single task with the given parameters----------------

class Task {
    constructor(name, startingTime, duration, place, notes){
        //public members for tasks
        this.name = name;
        this.startingTime = startingTime;
        this.duration = duration;
        this.place = place;
        this.notes = notes;
        this.completed = false;
    }
}

// --------------Month Class------------------
//      ----------------Builds a month with the given paramenters------------

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//private member variables of the calendar
const _monthName = new WeakMap(); //Sets the name of the month
const _monthIndex = new WeakMap(); // useful to have

class Month {
    constructor(indexMonth){ //indexmonth base 1
        //private members
        _monthIndex.set(this, indexMonth-1)
        _monthName.set(this, monthNames[_monthIndex.get(this)]);

        //public members
        this.monthObject = this.generateDaysObject();
    }
    
    //Public Methods
    daysCountInMonth() { //returns days in given month
        return new Date(2018, _monthIndex.get(this)+1, 0).getDate(); 
    }

    generateDaysObject(){ //Dynamically populates this.monthObject with the corect days for the month.
        let objectMonth = [];
        for (let i = 0; i < this.daysCountInMonth(); i++){
            objectMonth[i] = [];
        }
        return objectMonth;   
    }

    getDailyTasks(day){ //gets current tasks for the day specified
        return this.monthObject[day - 1];
    }

    addTask(Task, day){
      this.monthObject[day].push(Task);
    }

    //getters
    get firstDayOfTheMonthDay() {//returns what day of the first week the month starts
        return new Date(2018, _monthIndex.get(this), 1).getDay()
    }

    getMonthName() {
         return _monthName.get(this);
    }
}