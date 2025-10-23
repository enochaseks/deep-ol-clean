document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('quoteForm').addEventListener('submit', async function(event) {
        event.preventDefault();

        // Show loading message
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.innerText = "Sending your request...";
        confirmationMessage.style.color = "#007BFF";
        confirmationMessage.className = "confirmation-message";

        // Disable submit button
        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            address: document.getElementById('address').value,
            serviceType: document.getElementById('serviceType').value,
            propertySize: document.getElementById('propertySize').value,
            description: document.getElementById('description').value,
            urgency: document.getElementById('urgency').value
        };

        try {
            // Always use HTTPS backend URL for production
            const backendUrl = 'https://deep-ol-clean.onrender.com';
                
            const response = await fetch(`${backendUrl}/send-quote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                confirmationMessage.innerHTML = `
                    <div style="background: #d4edda; color: #155724; padding: 1rem; border-radius: 5px; border: 1px solid #c3e6cb;">
                        <strong>✅ Success!</strong> Thank you, ${formData.name}! Your quote request has been sent to Deepolclean@gmail.com. 
                        We'll contact you within 24 hours!
                    </div>
                `;
                
                // Reset form
                document.getElementById('quoteForm').reset();
            } else {
                throw new Error(result.message || 'Failed to send request');
            }

        } catch (error) {
            console.error('Error:', error);
            console.error('Error details:', error.message);
            
            // Try to get more specific error information
            let errorMessage = 'Sorry, there was an error sending your request.';
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                errorMessage = 'Network error: Unable to connect to our servers.';
            } else if (error.message.includes('CORS')) {
                errorMessage = 'Connection error: Please try again or contact us directly.';
            }
            
            confirmationMessage.innerHTML = `
                <div style="background: #f8d7da; color: #721c24; padding: 1rem; border-radius: 5px; border: 1px solid #f5c6cb;">
                    <strong>❌ Error:</strong> ${errorMessage}
                    <br><br>
                    Please call us directly at <a href="tel:+19726728291" style="color: #721c24;"><strong>(972) 672-8291</strong></a> 
                    or email <a href="mailto:Deepolclean@gmail.com" style="color: #721c24;"><strong>Deepolclean@gmail.com</strong></a>
                    <br><br>
                    <small>Error details: ${error.message}</small>
                </div>
            `;
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
});
