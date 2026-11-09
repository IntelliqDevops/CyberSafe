
// =====================================
// CYBERSAFE - PASSWORD STRENGTH ANALYZER
// =====================================

// Get HTML elements
const passwordInput = document.getElementById("passwordInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const passwordResult = document.getElementById("passwordResult");
const togglePassword = document.getElementById("togglePassword");

// =====================================
// SHOW AND HIDE PASSWORD
// =====================================

if (togglePassword) {
    togglePassword.addEventListener("click", function() {

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show";
        }

    });
}

// =====================================
// ANALYZE BUTTON
// =====================================

analyzeBtn.addEventListener("click", analyzePassword);

// =====================================
// PASSWORD ANALYSIS FUNCTION
// =====================================

function analyzePassword() {

    const password = passwordInput.value;

    if (password.length === 0) {
        passwordResult.innerHTML =
            "<p>Please enter a sample password first.</p>";
        return;
    }

    let score = 0;
    let suggestions = [];

    // Check password characteristics
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);

    // Check length
    if (password.length >= 8) {
        score++;
    } else {
        suggestions.push("Use at least 8 characters.");
    }

    if (password.length >= 12) {
        score++;
    } else {
        suggestions.push("Aim for 12 or more characters.");
    }

    // Check character variety
    if (hasLowercase) {
        score++;
    } else {
        suggestions.push("Include lowercase letters.");
    }

    if (hasUppercase) {
        score++;
    } else {
        suggestions.push("Include uppercase letters.");
    }

    if (hasNumber) {
        score++;
    } else {
        suggestions.push("Include numbers.");
    }

    if (hasSpecial) {
        score++;
    } else {
        suggestions.push("Include special characters such as @, # or !");
    }

    // Check common passwords
    const commonPasswords = [
        "password",
        "password123",
        "12345678",
        "qwerty123",
        "admin123",
        "iloveyou"
    ];

    const isCommon = commonPasswords.includes(password.toLowerCase());

    if (isCommon) {
        score = 0;
        suggestions.push("Avoid commonly used passwords.");
    }

    // Check repeated characters
    const hasRepeatedCharacters = /(.)\1{2,}/.test(password);

    if (hasRepeatedCharacters) {
        score--;
        suggestions.push("Avoid repeating the same character many times.");
    }

    // Check predictable sequences
    const hasSequence =
        /(?:012|123|234|345|456|567|678|789|abc|bcd|cde|def|qwe)/i.test(password);

    if (hasSequence) {
        score--;
        suggestions.push("Avoid predictable letter or number sequences.");
    }

    // Determine password strength
    let strength = "";
    let color = "";

    if (!isCommon && password.length >= 12 && score >= 6) {
        strength = "STRONG";
        color = "#22c55e";
    } else if (!isCommon && score >= 3) {
        strength = "MODERATE";
        color = "#facc15";
    } else {
        strength = "WEAK";
        color = "#ef4444";
    }

    // Calculate progress bar percentage
    const strengthPercent = Math.max(
        0,
        Math.min(100, (score / 6) * 100)
    );

    // Display password analysis
    let resultHTML = `
        <h3 style="color: ${color};">
            Password Strength: ${strength}
        </h3>

        <p>Characters: ${password.length}</p>

        <p>Strength Score: ${Math.max(0, score)} / 6</p>

      <div style="
    width: 100%;
    height: 14px;
    background-color: #263b5c;
    border-radius: 10px;
    margin: 15px 0;
    overflow: hidden;
">
    <div style="
        width: ${strengthPercent}%;
        height: 14px;
        background-color: ${color};
        border-radius: 10px;
        transition: width 0.4s ease;
    "></div>
</div>
    `;

    // Display suggestions
    if (suggestions.length > 0) {

        resultHTML += `
            <h3>Suggestions to Improve:</h3>
            <ul>
        `;

        suggestions.forEach(function(suggestion) {
            resultHTML += `<li>${suggestion}</li>`;
        });

        resultHTML += "</ul>";

    } else {

        resultHTML += `
            <p>Good job! Your password meets the basic checks.</p>
        `;
    }

    // Show results on webpage
    passwordResult.innerHTML = resultHTML;
}


// TWO-STEP VERIFICATION DEMO

const start2FADemo = document.getElementById("start2FADemo");
const twofaDemoResult = document.getElementById("twofaDemoResult");

if (start2FADemo && twofaDemoResult) {

    start2FADemo.addEventListener("click", function () {

        const demoCode = String(
            Math.floor(100000 + Math.random() * 900000)
        );

        twofaDemoResult.innerHTML = `
            <p><strong>Step 1 complete:</strong> Password accepted for this demo.</p>

            <p>Your sample verification code is:
            <strong>${demoCode}</strong></p>

            <p><small>This is a demonstration code. Real services deliver or generate verification codes separately.</small></p>

            <input
                type="text"
                id="twofaCodeInput"
                maxlength="6"
                inputmode="numeric"
                placeholder="Enter the 6-digit demo code"
            >

            <button type="button" id="verify2FACode" class="btn">
                Verify Code
            </button>

            <p id="twofaMessage" aria-live="polite"></p>
        `;

        const verifyButton = document.getElementById("verify2FACode");

        verifyButton.addEventListener("click", function () {

            const enteredCode =
                document.getElementById("twofaCodeInput").value.trim();

            const message = document.getElementById("twofaMessage");

            if (enteredCode === demoCode) {

                message.textContent =
                    "Success! Two-step verification completed in this demo.";

                message.style.color = "#22c55e";

            } else {

                message.textContent =
                    "Incorrect code. Please try again.";

                message.style.color = "#ef4444";

            }

        });

    });

}