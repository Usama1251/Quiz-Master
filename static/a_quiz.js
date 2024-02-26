document.addEventListener('DOMContentLoaded', function() {
    var timerDisplay = document.getElementById('timer');
    var endTime = new Date().getTime() + 30000; // Set end time 1 minute (60 seconds) from now

    // Function to update timer display
    function updateTimer() {
        var now = new Date().getTime();
        var timeLeft = endTime - now;

        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        timerDisplay.textContent = 'Time Left: ' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

        if (timeLeft <= 0) {
            clearInterval(timerInterval); // Stop the timer when time is up
            submitForm();
        }
    }

    updateTimer(); // Update timer immediately to avoid initial delay

    var timerInterval = setInterval(updateTimer, 1000); // Update timer every second

    // Event listener for form submission
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevents the form from submitting
        submitForm(); // Call submitForm function when form is submitted manually
    });

    // Function to submit the form
    function submitForm() {
        // Retrieving the selected options for each question
        var q1 = document.querySelector('input[name=q1]:checked');
        var q2 = document.querySelector('input[name=q2]:checked');
        var q3 = document.querySelector('input[name=q3]:checked');
        var q4 = document.querySelector('input[name=q4]:checked');
        var q5 = document.querySelector('input[name=q5]:checked');
        
        // Retrieving the values of name and roll number
        var name = document.querySelector('input[name=name]').value;
        var rollNo = document.querySelector('input[name=roll_no]').value;
        
        // Checking answers against the correct ones
        var score = 0; // Initialize score to 0
        if (q1 && q1.value === 'a') score++; // Question 1
        if (q2 && q2.value === 'a') score++; // Question 2
        if (q3 && q3.value === 'b') score++; // Question 3
        if (q4 && q4.value === 'a') score++; // Question 4
        if (q5 && q5.value === 'b') score++; // Question 5
        
        // Sending score and other data to server
        var formData = new FormData();
        formData.append('score', score);
        formData.append('name', name);
        formData.append('roll_no', rollNo);
        
        fetch('/a_quiz/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            alert('Submitted!');
            setTimeout(function() {
                // Redirect to the home page after successful submission
                window.location.href = '/';
            });
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
});
