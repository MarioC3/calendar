document.addEventListener('click', (e)=> {
    let userName = document.querySelector('#userName').value;
    let password = document.querySelector('#password').value;
    let data = `userName=${userName}&password=${password}`;
    if (e.target.matches('.signInButton')){
        let request = new XMLHttpRequest;
        request.open('POST', 'http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php', false);
        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        request.send(data);
        if (request.readyState === 4 && request.status === 200){
            let response = JSON.parse(request.response);
            console.log(response);
            if (response.result === 'valid') {
                localStorage["cs2550timestamp"] = `${response.userName} ${response.timestamp}`;
                window.location.href="calendar.html"
            } else {
                document.querySelector('.confirmationMessage').innerHTML = "<h4>Your User Name or Password is invalid</h4>"
            }
        }
    }
})