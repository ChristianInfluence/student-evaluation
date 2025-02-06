const CORS_PROXY = "https://comments.javajireh.org/";
const STUDENT_FETCH_URL = "https://script.google.com/macros/s/AKfycbx3cin8FE2bnGTt7L4lc_nAjI8_MHTsO7h6HhWbqtiCn-BPTH0avHLHjMbiIlDvoaJV/exec";
const SUBMIT_DATA_URL = "https://script.google.com/macros/s/AKfycbw5NlEaGl9Zs5MoENesNUJhz_uhbHQ5I5nUc3MHPUaxp1svFmNh6UeiBfNGhNbcXeJXeg/exec";

// Fetch students from "New Student Probation" sheet
function fetchStudents() {
    fetch(CORS_PROXY + STUDENT_FETCH_URL)
    .then(response => {
        console.log("Response from fetch:", response); // Add extra debugging information
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText);
        }
        return response.text(); // Return as text to log it
    })
    .then(responseText => {
        console.log("Response text:", responseText); // Log the text response
        try {
            const studentNames = JSON.parse(responseText); // Attempt to parse JSON
            console.log("Fetched students:", studentNames); // Debugging

            let select = document.getElementById("studentSelect");
            select.innerHTML = '<option value="" disabled selected>None selected</option>'; // Clear old options and set default

            if (studentNames.length === 0) {
                let option = document.createElement("option");
                option.textContent = "No students available";
                option.disabled = true;
                option.selected = true;
                select.appendChild(option);
            } else {
                studentNames.forEach(name => {
                    let option = document.createElement("option");
                    option.value = name;
                    option.textContent = name;
                    select.appendChild(option);
                });
            }

            document.getElementById("content").style.display = "block"; // Show the form
        } catch (error) {
            console.error("Error parsing JSON:", error);
            alert("Error parsing student names: " + error.message);
        }
    })
    .catch(error => {
        console.error("Error fetching student names:", error);
        alert("Error fetching student names: " + error.message);
    });
}

// Update slider value display
function updateValue(sliderId) {
    document.getElementById(sliderId + 'Value').innerText = document.getElementById(sliderId).value;
}

// Submit evaluation data to "Probation Log 2025" sheet
function submitEvaluation() {
    let student = document.getElementById("studentSelect").value;
    let academics = document.getElementById("academics").value;
    let integration = document.getElementById("integration").value;
    let behavior = document.getElementById("behavior").value;
    let attendance = document.getElementById("attendance").value;
    let feedback = document.getElementById("feedback").value;

    if (!student || !academics || !integration || !behavior || !attendance || !feedback) {
        alert("All fields are required!");
        return;
    }

    let data = {
        student: student,
        academics: academics,
        integration: integration,
        behavior: behavior,
        attendance: attendance,
        feedback: feedback
    };

    fetch(CORS_PROXY + SUBMIT_DATA_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        console.log("Submission response:", result);
        alert(result);
    })
    .catch(error => {
        console.error("Error submitting evaluation:", error);
        alert("Error submitting evaluation: " + error.message);
    });
}

// Run fetchStudents() when the page loads
window.onload = fetchStudents;

// Attach event listener to submit button
document.getElementById("submitButton").addEventListener("click", submitEvaluation);
