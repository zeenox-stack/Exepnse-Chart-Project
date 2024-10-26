const dayBars = {
  mon: document.querySelector(".mon-bar"),
  tue: document.querySelector(".tue-bar"),
  wed: document.querySelector(".wed-bar"),
  thu: document.querySelector(".thu-bar"),
  fri: document.querySelector(".fri-bar"),
  sat: document.querySelector(".sat-bar"),
  sun: document.querySelector(".sun-bar"),
};

let data;

async function fetchData() {
  const url = "data.json";
  try {
    const fetchingArea = await fetch(url);

    if (!fetchingArea.ok) {
      throw new Error("Couldn't fetch data!!!");
    }

    data = await fetchingArea.json();

    data.forEach((day) => {
      const bars = dayBars[day.day];

      if (bars) {
        bars.style.paddingTop = `${day.amount * 2}px`;
      }
    });
  } catch (error) {
    console.error(`Error Occurred: ${error.message}`);
  }
}

window.addEventListener("load", fetchData);

const updateDisplayOnMouseEnter = (day) => {
  return () => {
    if (data && data.length) {
      const dayData = data.find((d) => d.day === day);
      if (dayData) {
        document.querySelector(
          `.${day}-exp`
        ).textContent = `$${dayData.amount}`; // Set the amount
        document.querySelector(`.${day}-exp`).style.display = "flex"; // Show the display
      }
    }
  };
};

dayBars.mon.addEventListener("mouseenter", updateDisplayOnMouseEnter("mon"));
dayBars.tue.addEventListener("mouseenter", updateDisplayOnMouseEnter("tue"));
dayBars.wed.addEventListener("mouseenter", updateDisplayOnMouseEnter("wed"));
dayBars.thu.addEventListener("mouseenter", updateDisplayOnMouseEnter("thu"));
dayBars.fri.addEventListener("mouseenter", updateDisplayOnMouseEnter("fri"));
dayBars.sat.addEventListener("mouseenter", updateDisplayOnMouseEnter("sat"));
dayBars.sun.addEventListener("mouseenter", updateDisplayOnMouseEnter("sun"));
