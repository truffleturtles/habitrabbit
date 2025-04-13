// Get DOM elements
const habitForm = document.getElementById('habitForm');
const habitsList = document.getElementById('habitsList');

// Initialize habits array from localStorage or empty array
let habits = JSON.parse(localStorage.getItem('habits')) || [];

// Function to save habits to localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
}

// Function to create a new habit element
function createHabitElement(habit) {
    const habitItem = document.createElement('div');
    habitItem.className = `habit-item ${habit.completed ? 'completed' : ''}`;
    habitItem.dataset.id = habit.id;

    habitItem.innerHTML = `
        <div class="habit-info">
            <div class="habit-name">${habit.name}</div>
            <div class="habit-frequency">${habit.frequency}</div>
        </div>
        <div class="habit-actions">
            <button class="btn-complete" onclick="toggleComplete('${habit.id}')">
                ${habit.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="btn-delete" onclick="deleteHabit('${habit.id}')">Delete</button>
        </div>
    `;

    return habitItem;
}

// Function to render all habits
function renderHabits() {
    habitsList.innerHTML = '';
    habits.forEach(habit => {
        habitsList.appendChild(createHabitElement(habit));
    });
}

// Function to add a new habit
function addHabit(name, frequency) {
    const habit = {
        id: Date.now().toString(), // Simple unique ID
        name,
        frequency,
        completed: false,
        createdAt: new Date().toISOString()
    };

    habits.push(habit);
    saveHabits();
    renderHabits();
}

// Function to toggle habit completion
function toggleComplete(id) {
    const habit = habits.find(h => h.id === id);
    if (habit) {
        habit.completed = !habit.completed;
        saveHabits();
        renderHabits();
    }
}

// Function to delete a habit
function deleteHabit(id) {
    habits = habits.filter(habit => habit.id !== id);
    saveHabits();
    renderHabits();
}

// Event listener for form submission
habitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('habitName');
    const frequencyInput = document.getElementById('habitFrequency');

    const name = nameInput.value.trim();
    const frequency = frequencyInput.value;

    if (name) {
        addHabit(name, frequency);
        nameInput.value = ''; // Clear input
    }
});

// Initial render
renderHabits();