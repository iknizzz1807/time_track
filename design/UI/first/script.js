// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const startStopBtn = document.getElementById('startStop');
const timerDisplay = document.querySelector('.timer-display');
const categorySelect = document.getElementById('categorySelect');
const customCategory = document.getElementById('customCategory');
const activitiesList = document.getElementById('activitiesList');

// State
let isRunning = false;
let startTime;
let timerInterval;
let activities = JSON.parse(localStorage.getItem('activities')) || [];
let customCategories = JSON.parse(localStorage.getItem('customCategories')) || [];

// Initialize custom categories
function initializeCustomCategories() {
    customCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.insertBefore(option, categorySelect.lastElementChild);
    });
}

// Theme Toggle
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

// Category Management
categorySelect.addEventListener('change', () => {
    if (categorySelect.value === 'custom') {
        customCategory.classList.remove('hidden');
        customCategory.focus();
    } else {
        customCategory.classList.add('hidden');
    }
});

function getCurrentCategory() {
    if (categorySelect.value === 'custom') {
        const newCategory = customCategory.value.trim();
        if (newCategory && !customCategories.includes(newCategory)) {
            customCategories.push(newCategory);
            localStorage.setItem('customCategories', JSON.stringify(customCategories));
            const option = document.createElement('option');
            option.value = newCategory;
            option.textContent = newCategory;
            categorySelect.insertBefore(option, categorySelect.lastElementChild);
        }
        return newCategory;
    }
    return categorySelect.value;
}

// Timer Functions
function formatTime(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    timerDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() {
    const category = getCurrentCategory();
    if (!category) {
        alert('Please select or enter a category');
        return;
    }
    
    isRunning = true;
    startTime = Date.now();
    startStopBtn.textContent = 'Stop';
    startStopBtn.style.backgroundColor = '#ff4444';
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '';
    
    const duration = Date.now() - startTime;
    saveActivity(getCurrentCategory(), duration);
    
    timerDisplay.textContent = '00:00:00';
    categorySelect.value = '';
    customCategory.value = '';
    customCategory.classList.add('hidden');
}

// Activity Management
function saveActivity(category, duration) {
    const activity = {
        id: Date.now(),
        category,
        duration,
        timestamp: new Date().toISOString()
    };
    
    activities.unshift(activity);
    localStorage.setItem('activities', JSON.stringify(activities));
    renderActivities();
}

function deleteActivity(id) {
    activities = activities.filter(activity => activity.id !== id);
    localStorage.setItem('activities', JSON.stringify(activities));
    renderActivities();
}

function renderActivities() {
    activitiesList.innerHTML = activities
        .map(activity => `
            <div class="activity-item">
                <div>
                    <span class="category-tag">${activity.category}</span>
                    <span>${formatTime(activity.duration)}</span>
                </div>
                <button class="delete-btn" onclick="deleteActivity(${activity.id})">Delete</button>
            </div>
        `)
        .join('');
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

// Initialize
document.body.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
initializeCustomCategories();
renderActivities();