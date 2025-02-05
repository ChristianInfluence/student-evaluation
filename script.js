document.addEventListener("DOMContentLoaded", function () {
    const studentDropdown = document.getElementById("studentSelect");
    const submitButton = document.getElementById("submitButton");

    // Fetch student names from the "New Student Probation" web app (No authentication)
    fetch("https://script.google.com/macros/s/AKfycbxI_zFyRRcP4Z-QBhDiyOLMRe0fs8ZYJtjErGY8MJ0b0Tk24uOXPogGJvKJRGBkWw/exec")
        .then(response => response.json())
        .then(studentNames => {
            studentNames.forEach(name => {
                let option = document.createElement("option");
                option.value = name;
                option.textContent = name;
                studentDropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching student names:", error));

    // Submit evaluation data to "Probation Log 2025" web app
    submitButton.addEventListener("click", function () {
        const selectedStudent = studentDropdown.value;
        const academics = document.getElementById("academics").value;
        const integration = document.getElementById("integration").value;
        const behavior = document.getElementById("behavior").value;
        const attendance = document.getElementById("attendance").value;
        const feedback = document.getElementById("feedback").value;

        // Validate input
        if (!selectedStudent || !academics || !integration || !behavior || !attendance || !feedback) {
            alert("Please complete all fields before submitting.");
            return;
        }

        // Send data to "Probation Log 2025" Google Sheet
        fetch("https://script.google.com/macros/s/AKfycbyheYAKhrojL4X_9PZlFMgjY_d95GWVGvZihABwgohuyD1JJzHD_hOzuxbmuAqL0C4h-g/exec", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                student: selectedStudent,
                academics: academics,
                integration: integration,
                behavior: behavior,
                attendance: attendance,
                feedback: feedback
            })
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
        })
        .catch(error => console.error("Error submitting evaluation:", error));
    });
});
