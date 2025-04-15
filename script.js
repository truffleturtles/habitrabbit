// Get DOM elements
const habitForm = document.getElementById('habitForm');
const habitsList = document.getElementById('habitsList');
const totalHabitsSpan = document.getElementById('totalHabits');
const completedHabitsSpan = document.getElementById('completedHabits');
const streakSpan = document.getElementById('streak');
const quickAddBtn = document.getElementById('quickAddBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initialize habits array from localStorage or empty array
let habits = JSON.parse(localStorage.getItem('habits')) || [];

// Motivational quotes
const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
    { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
    { text: "Small progress is still progress.", author: "Unknown" }
];

// Function to update stats
function updateStats() {
    const total = habits.length;
    const completed = habits.filter(h => h.completed).length;
    const streak = calculateStreak();

    totalHabitsSpan.textContent = total;
    completedHabitsSpan.textContent = completed;
    streakSpan.textContent = streak;
}

// Function to calculate streak
function calculateStreak() {
    const today = new Date().toDateString();
    let streak = 0;
    let currentDate = new Date();

    for (let i = 0; i < 7; i++) {
        const dateStr = currentDate.toDateString();
        const hasCompletedHabit = habits.some(h =>
            h.completed && new Date(h.completedAt).toDateString() === dateStr
        );

        if (hasCompletedHabit) {
            streak++;
        } else {
            break;
        }

        currentDate.setDate(currentDate.getDate() - 1);
    }

    return streak;
}

// Function to update motivational quote
function updateQuote() {
    const quoteElement = document.getElementById('quote');
    const authorElement = document.getElementById('quoteAuthor');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    quoteElement.textContent = randomQuote.text;
    authorElement.textContent = `- ${randomQuote.author}`;
}

// Function to save habits to localStorage
function saveHabits() {
    localStorage.setItem('habits', JSON.stringify(habits));
    updateStats();
}

// Function to create a new habit element
function createHabitElement(habit) {
    const habitItem = document.createElement('div');
    habitItem.className = `habit-item ${habit.completed ? 'completed' : ''}`;
    habitItem.dataset.id = habit.id;
    habitItem.dataset.frequency = habit.frequency;

    const timeIcon = habit.time === 'morning' ? '🌅' :
                    habit.time === 'afternoon' ? '☀️' : '🌙';

    habitItem.innerHTML = `
        <div class="habit-info">
            <div class="habit-name">${habit.name}</div>
            <div class="habit-frequency">
                ${timeIcon} ${habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
            </div>
        </div>
        <div class="habit-actions">
            <button class="btn-complete" onclick="toggleComplete('${habit.id}')">
                <i class="fas ${habit.completed ? 'fa-undo' : 'fa-check'}"></i>
                ${habit.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="btn-delete" onclick="deleteHabit('${habit.id}')">
                <i class="fas fa-trash"></i>
                Delete
            </button>
        </div>
    `;

    return habitItem;
}

// Function to render all habits
function renderHabits(filter = 'all') {
    habitsList.innerHTML = '';
    const filteredHabits = filter === 'all'
        ? habits
        : habits.filter(h => h.frequency === filter);

    filteredHabits.forEach(habit => {
        habitsList.appendChild(createHabitElement(habit));
    });
}

// Function to add a new habit
function addHabit(name, frequency, time) {
    const habit = {
        id: Date.now().toString(),
        name,
        frequency,
        time,
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
        habit.completedAt = habit.completed ? new Date().toISOString() : null;
        saveHabits();
        renderHabits();
    }
}

// Function to delete a habit
function deleteHabit(id) {
    if (confirm('Are you sure you want to delete this habit?')) {
        habits = habits.filter(habit => habit.id !== id);
        saveHabits();
        renderHabits();
    }
}

// Event listener for form submission
habitForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('habitName');
    const frequencyInput = document.getElementById('habitFrequency');
    const timeInput = document.getElementById('habitTime');

    const name = nameInput.value.trim();
    const frequency = frequencyInput.value;
    const time = timeInput.value;

    if (name) {
        addHabit(name, frequency, time);
        nameInput.value = ''; // Clear input
        habitForm.classList.add('hidden'); // Hide form after adding
    }
});

// Event listeners for filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderHabits(btn.dataset.filter);
    });
});

// Event listener for quick add button
quickAddBtn.addEventListener('click', () => {
    habitForm.classList.toggle('hidden');
    if (!habitForm.classList.contains('hidden')) {
        document.getElementById('habitName').focus();
    }
});

// Initialize the app
updateStats();
updateQuote();
renderHabits();

// Update quote every 30 seconds
setInterval(updateQuote, 30000);