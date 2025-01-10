export class UserService {
    static getUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    static searchUsers(keyword) {
        const users = this.getUsers();
        return users.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()));
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
        return users.find(user => user.id === id);
    }

    static getUserIndexById(id) {
        const users = this.getUsers();
        return users.findIndex(user => user.id === id);
    }

    static removeUser(id) {
        const users = this.getUsers();
        const index = this.getUserIndexById(id);
        if (index !== -1) {
            users.splice(index, 1);
            this.storeUser(users);
            return true;
        }
        return false;
    }
}