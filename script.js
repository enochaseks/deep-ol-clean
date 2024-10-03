document.addEventListener('DOMContentLoaded', function() {
    (function() {
        emailjs.init("tzQVB-3H_M_0YJ7ig"); // Replace with your actual Public Key
    })();

    document.getElementById('quoteForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const mobile = document.getElementById('mobile').value;
        const description = document.getElementById('description').value;

        const templateParams = {
            Enoch: "Enoch", 
            from_name: name,
            name: name,
            email: email,
            mobile: mobile,
            description: description,
        };

        emailjs.send('service_3kl9sro', 'template_8l415zb', templateParams) // Pass templateParams here
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById('confirmationMessage').innerText = `Thank you, ${name}! Your request has been submitted.`;
            }, function(error) {
                console.error('FAILED...', error);
                document.getElementById('confirmationMessage').innerText = "Oops! Something went wrong. Please try again later.";
            });

        // Reset the form
        this.reset();
    });
});
