export function generateUsername(firstName, lastName) {
    let timestamp = new Date().getTime().toString().slice(-3);
    let randomNumber = Math.floor(Math.random() * 100) + 1;
    let username = firstName.slice(0, 3).trim() + lastName.charAt(0) + timestamp + randomNumber;
    return username.toLowerCase();
}

export function shuffleArray(arr = []) {
    return arr.sort(() => (Math.random() - 0.5))
}
export function getRandomSizeImageNumber() {
    return Math.floor(Math.random() * (70 - 50 + 1)) + 50;
}

export function getTimeDifference(timestamp) {
    const currentDate = new Date();
    const diff = currentDate.getTime() - timestamp;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
}
