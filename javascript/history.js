const workoutHistory = [
  {
    month: "MAY 2025",
    workouts: [
      {
        title: "Pull Day",
        date: "May 10, 2025",
        time: "9:30 AM",
        expanded: false,
        exercises: [
          { name: "Bench Press", sets: 3, equipment: "Barbell" },
          { name: "Lateral Raise", sets: 3, equipment: "Dumbell" },
          { name: "Incline Bench Press", sets: 3, equipment: "Dumbell" },
          { name: "Triceps Push Down", sets: 3, equipment: "Cable - Rope" },
          { name: "Pec Deck", sets: 2, equipment: "" },
          { name: "Triceps Extension", sets: 3, equipment: "Cable - Rope" }
        ]
      },
      {
        title: "Push Day",
        date: "May 9, 2025",
        time: "10:00 AM",
        expanded: false,
        exercises: [
          { name: "Seated Overhead press", sets: 3, equipment: "Dumbbell" },
          { name: "Arnold Press", sets: 3, equipment: "Dumbbell" },
          { name: "Cable Crossover", sets: 3, equipment: "Machine" },
          { name: "Decline Bench Press",sets: 2, equipment: "Machine" },
        ]
      }
    ]
  },
  {
    month: "APRIL 2025",
    workouts: [
      {
        title: "Push Day",
        date: "April 30, 2025",
        time: "10:00 AM",
        expanded: false,
        exercises: [
          { name: "Seated Overhead press", sets: 2, equipment: "Dumbbell" },
          { name: "Arnold Press", sets: 2, equipment: "Dumbbell" },
          { name: "Cable Crossover", sets: 2, equipment: "Machine" },
          { name: "Decline Bench Press",sets: 1, equipment: "Machine" },
        ]
      },
      {
        title: "Pull Day",
        date: "April 29, 2025",
        time: "10:30 AM",
        expanded: false,
        exercises: [
          { name: "Bench Press", sets: 2, equipment: "Barbell" },
          { name: "Lateral Raise", sets: 2, equipment: "Dumbell" },
          { name: "Incline Bench Press", sets: 2, equipment: "Dumbell" },
          { name: "Triceps Push Down", sets: 2, equipment: "Cable - Rope" },
          { name: "Pec Deck", sets: 1, equipment: "" },
          { name: "Triceps Extension", sets: 2, equipment: "Cable - Rope" }
        ]
      }
    ]
  }
];

function renderHistorySection(containerId, historyList) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  historyList.forEach(monthBlock => {
    // Divider
    const divider = document.createElement("div");
    divider.className = "divider";
    container.appendChild(divider);

    // Create and append month header
    const monthHeader = document.createElement("h2");
    monthHeader.className = "month-header";
    monthHeader.textContent = monthBlock.month;
    container.appendChild(monthHeader);

    // Loop through each workout in the month
    monthBlock.workouts.forEach((workout, index) => {
      const card = document.createElement("div");
      card.className = "workout-card" + (workout.expanded ? " expanded" : "");
      card.innerHTML = `
        <div class="workout-header">
          <h3 class="workout-title">${workout.title}</h3>
          <div class="exercise-meta">
            <span class="exercise-count">${workout.exercises.length} exercises</span>
            ${!workout.expanded ? `<span class="workout-date">${workout.date}</span>` : ""}
            </div>
          <div class="chevron">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="${workout.expanded ? 'M18 15L12 9L6 15' : 'M6 9L12 15L18 9'}" 
                    stroke="#FFBD59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div class="workout-details" style="${workout.expanded ? '' : 'display: none;'}">
          ${workout.exercises.map(ex => `
            <div class="exercise-item">
              <div class="set-count">${ex.sets}x</div>
              <div class="exercise-info">
                <div class="exercise-name">${ex.name}</div>
                <div class="equipment">${ex.equipment || '—'}</div>
              </div>
            </div>
          `).join("")}
          <div class="workout-actions">
            <button class="btn-primary start-btn">
              <img src="images/Play.png" alt="Start" class="btn-icon">
              Perform Again
            </button>
          </div>
        </div>
      `;

      // Toggle expand/collapse
      card.querySelector(".workout-header").addEventListener("click", () => {
        const isExpanded = card.classList.toggle("expanded");
        const details = card.querySelector(".workout-details");
        const chevron = card.querySelector("path");
        const meta = card.querySelector(".exercise-meta");

        details.style.display = isExpanded ? "" : "none";
        chevron.setAttribute("d", isExpanded ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9");

        meta.innerHTML = `
          <span class="exercise-count">${workout.exercises.length} exercises</span>
          ${!isExpanded ? `<span class="workout-date">${workout.date}</span>` : ""}
          `;
      });

      // Start workout button
      card.querySelector(".start-btn")?.addEventListener("click", e => {
        e.stopPropagation(); // prevent toggle
        localStorage.setItem("activeWorkout", JSON.stringify(workout));
        window.location.href = "active-workout.html";
      });

      container.appendChild(card);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderHistorySection("workout-history-container", workoutHistory);
});
