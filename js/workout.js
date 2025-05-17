const workouts = [
  {
    title: "Pull Day",
    expanded: false,
    exercises: [
      { sets: 3, name: "Bench Press", equipment: "Barbell" },
      { sets: 3, name: "Lateral Raise", equipment: "Dumbbell" },
      { sets: 3, name: "Incline Bench Press", equipment: "Dumbbell" },
      { sets: 3, name: "Triceps Push Down", equipment: "Cable - Rope" },
      { sets: 2, name: "Pec Deck", equipment: "" },
      { sets: 3, name: "Triceps Extension", equipment: "Cable - Rope" }
    ]
  },
  {
    title: "Push Day",
    expanded: false,
    exercises: [
        { sets: 3, name: "Seated Overhead press", equipment: "Dumbbell" },
        { sets: 3, name: "Arnold Press", equipment: "Dumbbell" },
        { sets: 3, name: "Cable Crossover", equipment: "Machine" },
        { sets: 2, name: "Decline Bench Press   ", equipment: "Machine" }, 
    ]
  }
];

const AlternateWorkouts = [
  {
    title: "Pull Day (Alternate)",
    expanded: false,
    exercises: [
      { sets: 3, name: "Deadlift", equipment: "Barbell" },
      { sets: 3, name: "Pull Up", equipment: "Bodyweight" },
      { sets: 3, name: "Bent Over Row", equipment: "Dumbbell" },
      { sets: 3, name: "Face Pull", equipment: "Cable - Rope" },
      { sets: 2, name: "Bicep Curl", equipment: "Dumbbell" }
    ]
  },
  {
    title: "Push Day (Alternate)",
    expanded: false,
    exercises: [
      { sets: 3, name: "Overhead Press", equipment: "Barbell" },
      { sets: 3, name: "Chest Fly", equipment: "Dumbbell" },
      { sets: 3, name: "Skull Crusher", equipment: "Dumbbell" },
      { sets: 3, name: "Lateral Raise", equipment: "Cable - Rope" }
    ]
  }
];

// ========== Render Workouts ==========
function renderWorkoutSection(containerId, workoutList) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  workoutList.forEach((workout, index) => {
    const card = document.createElement("div");
    card.className = "workout-card" + (workout.expanded ? " expanded" : "");
    card.innerHTML = `
      <div class="workout-header">
        <h3 class="workout-title">${workout.title}</h3>
        <div class="exercise-count">${workout.exercises.length} exercises</div>
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
              <div class="equipment">${ex.equipment}</div>
            </div>
          </div>
        `).join("")}
        <div class="workout-actions">
          <button class="action-btn delete-btn">
            <img src="images/Delete.png" alt="Delete" class="btn-icon">
            Delete
            </button>
          <button class="action-btn edit-btn">
            <img src="images/Edit.png" alt="Edit" class="btn-icon">
            Edit
          </button>
          <button class="btn-primary start-btn">
            <img src="images/Play.png" alt="Start" class="btn-icon">
            Start Workout
          </button>
        </div>
      </div>
    `;

    // Toggle expand/collapse
    card.querySelector(".workout-header").addEventListener("click", () => {
      const isExpanded = card.classList.toggle("expanded");
      const details = card.querySelector(".workout-details");
      const chevron = card.querySelector("path");

      details.style.display = isExpanded ? "" : "none";
      chevron.setAttribute("d", isExpanded ? "M18 15L12 9L6 15" : "M6 9L12 15L18 9");
    });

    // Start workout button
    card.querySelector(".start-btn")?.addEventListener("click", e => {
      e.stopPropagation(); // prevent toggle when clicking button
      window.location.href = "active-workout.html";
    });

    container.appendChild(card);
  });
}

// ========== On DOM Load ==========
document.addEventListener("DOMContentLoaded", () => {
  renderWorkoutSection("workout-container", workouts);
  renderWorkoutSection("AlternateWorkouts-container2", AlternateWorkouts);
});