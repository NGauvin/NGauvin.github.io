// mobile menu toggle
function toggleMobileMenu() {
    const navList = document.getElementById('navList');
    const toggleArrow = document.getElementById('toggleArrow');
    
    const isShown = navList.classList.toggle('show');
    toggleArrow.textContent = isShown ? '▲' : '▼';
}

// switch exercises
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
        
        // update counter when exercise 2 is clicked
        calculateDaysRemaining();
    }

    // close menu after clicking link on mobile
    const navList = document.getElementById('navList');
    if (navList.classList.contains('show')) {
        toggleMobileMenu();
    }
}

// exercise 1 - calculate grade percentage lost
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

    // grade deduction formula
    const percentageLost = (daysMissed / totalClasses) * attendanceWeight;
    const formattedLost = percentageLost.toFixed(2);

    let message = "";

    // check days missed and show message
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

// exercise 2 - count days left until Dec 4
function calculateDaysRemaining() {
    const resultDiv = document.getElementById('ex2Result');
    const today = new Date();
    
    let targetYear = today.getFullYear();
    let lastDay = new Date(targetYear, 11, 4); // Dec 4th

    // if Dec 4 passed, set for next year
    if (today > lastDay) {
        targetYear += 1;
        lastDay = new Date(targetYear, 11, 4);
    }

    const timeDiff = lastDay.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let feedbackMessage = "";

    // messages for different day ranges
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
        <p>You have <strong>${daysLeft}</strong> days left in the semester</p>
        <p>${feedbackMessage}</p>
    `;
}

// run when page loads
window.onload = function() {
    calculateDaysRemaining();
};