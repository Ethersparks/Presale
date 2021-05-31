import _ from 'lodash';
import $ from 'jquery';
import UserData from './UserData';

const URL = 'http://localhost:3001/user'

function add(user) {
  console.log(user);
  const email = user.email;
  const wallet = user.publicWallet;
  const data = {
    email:email,
    publicAddres:wallet,
  };
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}`,
      crossDomain: true,
      method: 'POST',
      ContentType: 'application/json',
      success: resolve,
      error: reject,
      data: data
    });
  });
}

class RegistrationsStore {
  
  constructor() {
    this.idCount = 0; 
    this.subscribers = [];
  }
  
  add(email, walletId) {
    this.idCount++;
    let user = new UserData(email,walletId, this.idCount);
    
    add(user).then(() => {
      this.publish({
        actionType: 'add',
        data: user
      });
    });
     
    return this.idCount;
  }
    
  publish(action) {
    // this.getAll().then((data) => {
    //   action.users = data.users;
      this.subscribers.forEach((subscriber) => {
        subscriber(action);
      });
    //});
  }
  
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}

// export singleton
export default new RegistrationsStore();