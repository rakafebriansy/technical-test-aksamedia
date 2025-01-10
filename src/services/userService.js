export class UserService {
    static getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    static storeUser(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }

    static updateUser(user) {
        const index = this.getUserIndexById(user.id);
        if (index !== -1) {
            const users = this.getUsers();
            users[index] = user;
            this.storeUser(users);
            return true;
        }
        return false;
    }

    static getUserById(id) {
        const users = this.getUsers();
        return users.find(user => user.id.includes(id));
    }

    static getUserIndexById(id) {
        const users = this.getUsers();
        return users.findIndex(user => user.id === id);
    }
}