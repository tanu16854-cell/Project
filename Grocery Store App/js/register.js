document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mobileno = document.getElementById('mobileno').value;
    console.log(`Name: ${name}, Email: ${email}, Password: ${password},Mobileno:${mobileno}`);
});
