// Simple JavaScript using let variables as requested
const form = document.getElementById("loginForm")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const errorNotification = document.getElementById("errorNotification")
const successNotification = document.getElementById("successNotification")

// Function to close notifications
function closeNotification(id) {
    const notification = document.getElementById(id)
    if (notification) {
        notification.style.display = "none"
    }
}

// Form submission handler
form.addEventListener("submit", (event) => {
    event.preventDefault()

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    let hasError = false

    // Simple validation
    if (email === "") {
        hasError = true
        errorNotification.style.display = "block"
    }

    if (password === "") {
        hasError = true
        errorNotification.style.display = "block"
    }

    // If no errors, show success notification
    if (!hasError) {
        errorNotification.style.display = "none"
        successNotification.style.display = "block"

        // Reset form after successful submission
        form.reset()
    }
})

