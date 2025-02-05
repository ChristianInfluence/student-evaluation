document.addEventListener("DOMContentLoaded", function() {
    console.log("Script loaded successfully.");
});

function onSignIn(googleUser) {
    console.log("User signed in.");
    var idToken = googleUser.getAuthResponse().id_token;

    // 1. Get Student Names
    fetch("https://script.google.com/macros/s/AKfycbxI_zFyRRcP4Z-QBhDiyOLMRe0fs8ZYJtjErGY8MJ0b0Tk24uOXPogGJvKJRGBkWw/exec") // No token needed for testing
        .then(response => response.json())
        .then(studentNames => {
            console.log("Received students:", studentNames);
            let select = document.getElementById("studentSelect");
            studentNames.forEach(name => {
                let option = document.createElement("option");
                option.value = name;
                option.text = name;
                select.appendChild(option);
            });

            document.getElementById("content").style.display = "block";
        })
        .catch(error => console.error("Error fetching student names:", error));

    document.getElementById("submitButton").addEventListener("click", function() {
        var student = document.getElementById("studentSelect").value;
        var academics = document.getElementById("academics").value;
        var integration = document.getElementById("integration").value;
        var behavior = document.getElementById("behavior").value;
        var attendance = document.getElementById("attendance").value;
        var feedback = document.getElementById("feedback").value;

        var data = {
            student: student,
            academics: academics,
            integration: integration,
            behavior: behavior,
            attendance: attendance,
            feedback: feedback
        };

        console.log("Submitting data:", data);

        fetch("https://script.google.com/macros/s/AKfycbyheYAKhrojL4X_9PZlFMgjY_d95GWVGvZihABwgohuyD1JJzHD_hOzuxbmuAqL0C4h-g/exec", { // No token needed for testing
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(result => {
            console.log("Server response:", result);
            alert(result);
        })
        .catch(error => console.error("Error submitting data:", error));
    });
}
