export function generateUsername(firstname, lastname) {
    let timestamp = new Date().getTime().toString().slice(-3);
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let username = firstname.slice(0, 3) + lastname.charAt(0) + timestamp + randomNumber;
    return username.toLowerCase();
}

export function shuffleArray(arr) {
    return arr.sort(() => (Math.random() - 0.5))
}
