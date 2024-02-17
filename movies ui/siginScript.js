document.getElementById('signin-form').addEventListener('submit', async (e) => {
    e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:1000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) 
        });
        const data = await response.json();

        if (response.ok) {
            alert("Welcome to MoVink..!");
            window.location.href = './HomePage.html'; // Redirect to home page after sign in
        } else {
            const errorData = await response.json();
            alert(errorData.error);
        }
    } catch (error) {
        console.error('Error during sign-in:', error);
        alert('An error occurred. Please try again later.');
    }
});
