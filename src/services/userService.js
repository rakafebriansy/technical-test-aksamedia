export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export const storeUser = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
}