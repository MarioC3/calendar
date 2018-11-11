//----------------Calendar Class---------------------
//  --------------------Renders the calendar in the DOM-----------------------

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

class Calendar {
  constructor(monthIndexToCreate) { // monthIndex base 1
    this.month = new Month(monthIndexToCreate);
    this.currentDay = this.isCurrentDayInTheMonth(monthIndexToCreate);
  }
  //public methods

  //Generates Hero Grid
  heroGrid() {
    let hero = document.querySelector('.heroInGrid');
    let request = new XMLHttpRequest();
    request.open("GET", "./heroImages.json", true);
    request.send();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        let imgJson = JSON.parse(request.response);
        let monthImgUrl = imgJson[this.month.getMonthName().toLowerCase()].imgUrl;
        let monthImgBadge = imgJson[this.month.getMonthName().toLowerCase()].badge;
        hero.innerHTML = `
                    ${monthImgBadge}
                    <h1>${this.month.getMonthName().toUpperCase()}</h1>
                    <img class="chevron left" src="./images/chevronLeft.svg">
                    <img class="chevron right" src="./images/chevronRight.svg">
                `
        hero.style.cssText = `background: linear-gradient(to bottom,rgba(0,0,0, .3),rgba(0,0,0, .5)), url(${monthImgUrl}) no-repeat center center; background-size: cover;`
      }
    }
  }


  //Generates a table grid with the number of rows and Columns passed as a paramenter, and appends it to the parent passed as a parameter.
  generateGrid(rowsToGenerate, columnsToGenerate, parent) {
    for (let i = 0; i < rowsToGenerate; i++) {
      let tRow = document.createElement("tr");
      // if generating header tables
      for (let j = 0; j < columnsToGenerate; j++) {
        if (parent.nodeName == "THEAD") {
          let tHeader = document.createElement("th");
          tRow.appendChild(tHeader);
        } else {
          let tColumn = document.createElement("td");
          tRow.appendChild(tColumn);
        }
      }
      parent.appendChild(tRow);
    }
  }

  // Takes the table header and labels it with the days of the week
  labelHeaders(headerToLabel) {
    let headersRow = headerToLabel.childNodes;
    for (let i = 0; i < headersRow.length; i++) {
      let currHeader = headersRow[i].childNodes;
      for (let j = 0; j < currHeader.length; j++) {
        currHeader[j].innerHTML = `
                    <h4>${daysOfTheWeek[j]}</h4>
                `
      }
    }
  }

  // Takes the table body and labels it with the numbers of the month
  labelBody(bodyToLabel) {
    // debugger
    let daysNumber = 1;
    let bodyRows = bodyToLabel.childNodes;
    for (let i = 0; i < bodyRows.length; i++) {
      bodyRows[i].classList.add("weeks");
      let bodyCells = bodyRows[i].childNodes;
      for (let j = 0; j < bodyCells.length; j++) {
        let currCell = bodyCells[j];
        currCell.classList.add("days");
        currCell.dataset.row = i;
        currCell.dataset.col = j;
        if (i === 0) {
          if (j >= this.month.firstDayOfTheMonthDay) {
            if (daysNumber > this.month.daysCountInMonth()) {
              currCell.innerHTML = `
                                <div class="dayContainer"></div>
                            `
              currCell.dataset.row = i;
              currCell.dataset.col = j;
            } else {
              currCell.innerHTML = `
                                <div class="dayContainer">${daysNumber}</div>
                            `
              currCell.dataset.dayNum = daysNumber;
              currCell.classList.add("isDay"); // makes the cell cursor change to pointer
            }
            daysNumber++;
          }
        } else {
          if (daysNumber > this.month.daysCountInMonth()) {
            currCell.innerHTML = `
                            <div class="dayContainer"></div>
                        `
            currCell.dataset.row = i;
            currCell.dataset.col = j;
          } else {
            currCell.innerHTML = `
                            <div class="dayContainer">${daysNumber}</div>
                        `
            currCell.dataset.dayNum = daysNumber;
            currCell.classList.add("isDay"); // makes the cell cursor change to pointer
          }
          daysNumber++;
        }
      }
    }
  }

  //Generates they gray pattern on the weekends
  addPattern(elementToBeModified) {
    elementToBeModified.childNodes.forEach((element) => {
      for (let i = 0; i < element.childNodes.length; i++) {
        if (i == 0 || i == 6) { //weekends
          element.childNodes[i].classList.add("grayedOut");
        }
      }
    });
  }

  // Check if the current day is in the current month
  isCurrentDayInTheMonth(monthIndex) {
    let currentD = new Date();
    if (currentD.getMonth() === monthIndex - 1) {
      return currentD;
    } else {
      return null
    }
  }

  // Highlights the current day
  renderCurrentDay(tBody) {
    if (this.currentDay) {
      tBody.childNodes.forEach((weeks) => {
        weeks.childNodes.forEach((day) => {
          if (this.currentDay.getDate() == day.dataset.dayNum) {
            day.children[0].classList.add('currentDay');
          }
        })
      })
    }
  }

  // Checks if there are events the given day, if there are days, it will display how many events on the dom.
  renderTasksNumbers(tBody) {
    tBody.childNodes.forEach((weeks) => {
      weeks.childNodes.forEach((day) => {
        let dayNumber = Number(day.dataset.dayNum);
        if (dayNumber) {
          let tasks = this.month.getDailyTasks(dayNumber);
          if (tasks.length > 0) {
            let dayTask = document.createElement("div");
            dayTask.classList.add('tasksNumberContainer')
            dayTask.innerHTML = `Events: ${tasks.length}`
            day.appendChild(dayTask);
          }
        }
      })
    })
  }

  //usable methods

  generateCalendarGrid() {
    //hero
    this.heroGrid();

    // Selecting grid div and appending the initial table tag
    let tableGridContainer = document.querySelector(".tableGridContainerJS");
    let table = document.createElement("table");
    table.classList.add('mainTable');
    tableGridContainer.appendChild(table);

    // Generating theader for the table
    let tHead = document.createElement("thead");
    table.appendChild(tHead);
    this.generateGrid(1, 7, tHead);
    this.labelHeaders(tHead);

    //Generating the body the table
    let tBody = document.createElement("tbody");
    table.appendChild(tBody);
    this.generateGrid(5, 7, tBody);
    this.labelBody(tBody);

    //Adding classes for style
    table.classList.add("table");

    //Adding clases to make the pattern.
    this.addPattern(tHead);
    this.addPattern(tBody);

    //rendering current day
    this.renderCurrentDay(tBody);

    //render tasks numbers in Dom
    this.renderTasksNumbers(tBody);
  }

  deleteCalendarGrid() {
    let tableGridContainer = document.querySelector(".tableGridContainerJS");
    let table = document.querySelector('.mainTable');
    tableGridContainer.removeChild(table);
  }
}

//Sign in Class