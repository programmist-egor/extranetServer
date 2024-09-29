class UserDtos {
    email;
    id;
    phone;
    isActivated;
    role;

    constructor(model) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
        this.phone = model.phone;
        this.role = model.role;
    }
}

export default UserDtos;