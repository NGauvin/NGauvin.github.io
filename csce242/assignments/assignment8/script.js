// Toggle navigation menu on mobile devices
function toggleMobileMenu() {
    const navList = document.getElementById('navList');
    const toggleArrow = document.getElementById('toggleArrow');
    
    const isShown = navList.classList.toggle('show');
    toggleArrow.textContent = isShown ? '▲' : '▼';
}

// Switch between Exercise 1 and Exercise 2 views
function showExercise(exerciseNumber) {
    const ex1Section = document.getElementById('exercise1');
    const ex2Section = document.getElementById('exercise2');
    const btnEx1 = document.getElementById('btnEx1');
    const btnEx2 = document.getElementById('btnEx2');

    if (exerciseNumber === 1) {
        ex1Section.classList.add('active');
        ex2Section.classList.remove('active');
        btnEx1.classList.add('active');
        btnEx2.classList.remove('active');
    } else if (exerciseNumber === 2) {
        ex1Section.classList.remove('active');
        ex2Section.classList.add('active');
        btnEx1.classList.remove('active');
        btnEx2.classList.add('active');
        
        // Compute date calculation when Exercise 2 opens
        calculateDaysRemaining();
    }

    // Auto-close menu on click if mobile drawer is open
    const navList = document.getElementById('navList');
    if (navList.classList.contains('show')) {
        toggleMobileMenu();
    }
}

/**
 * Exercise 1: Missing Class Points Deduction
 * Total classes = 25, Attendance worth = 7%
 */
function calculateDeduction() {
    const inputVal = document.getElementById('daysMissedInput').value;
    const resultDiv = document.getElementById('ex1Result');

    if (inputVal === "" || inputVal < 0) {
        resultDiv.innerHTML = "";
        return;
    }

    const daysMissed = parseFloat(inputVal);
    const totalClasses = 25;
    const attendanceWeight = 7;

    // Math logic: (days missed / 25) * 7
    const percentageLost = (daysMissed / totalClasses) * attendanceWeight;
    const formattedLost = percentageLost.toFixed(2);

    let message = "";

    // 4+ Unique conditional messages via if / else if / else
    if (daysMissed === 0) {
        message = `Perfect attendance! You will not lose any of your ${attendanceWeight}% attendance grade.`;
    } else if (daysMissed <= 2) {
        message = `Missing ${daysMissed} day(s) means you lose approximately ${formattedLost}% of your grade. Keep it up!`;
    } else if (daysMissed <= 4) {
        message = `Missing ${daysMissed} days will cost you roughly ${formattedLost}% off your final grade. Try not to miss more!`;
    } else if (daysMissed <= 10) {
        message = `Caution: Missing ${daysMissed} days deducts ${formattedLost}% out of your 7% attendance score.`;
    } else {
        message = `Warning! Missing ${daysMissed} classes causes a major loss of ${formattedLost}% from your grade. Speak with your professor!`;
    }

    resultDiv.innerHTML = message;
}

/**
 * Exercise 2: End of Semester Counter
 * Uses Date object to compute remaining days until December 4th
 */
function calculateDaysRemaining() {
    const resultDiv = document.getElementById('ex2Result');
    const today = new Date();
    
    let targetYear = today.getFullYear();
    let lastDay = new Date(targetYear, 11, 4); // Month 11 = December

    // Reset to next year if December 4th of current year has passed
    if (today > lastDay) {
        targetYear += 1;
        lastDay = new Date(targetYear, 11, 4);
    }

    const timeDiff = lastDay.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let feedbackMessage = "";

    // Range-based condition checks
    if (daysLeft > 100) {
        feedbackMessage = "Not time to start counting down yet.";
    } else if (daysLeft > 50) {
        feedbackMessage = "Getting closer! Keep pushing through the semester.";
    } else if (daysLeft > 20) {
        feedbackMessage = "The finish line is in sight! Prepare for final projects.";
    } else if (daysLeft > 0) {
        feedbackMessage = "Final stretch! Hang in there!";
    } else {
        feedbackMessage = "The semester is over! Congratulations!";
    }

    resultDiv.innerHTML = `
        

You have ${daysLeft} days left in the semester


        

${feedbackMessage}


    `;
}

// Initial execution
window.onload = function() {
    calculateDaysRemaining();
};