
class UserData {

    constructor(email,publicWallet, id) {
        this.timestamp = new Date().toLocaleDateString();
        this.id = id;
        this.email = email;
        this.publicWallet = publicWallet;
    }

}

export default UserData;