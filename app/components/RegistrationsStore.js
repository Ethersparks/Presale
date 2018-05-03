import _ from 'lodash';
import $ from 'jquery';
import UserData from './UserData';

const URL = 'http://localhost:3001/todos'

function getAll() {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: URL,
      method: 'GET',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

function remove(todo) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}/${todo.id}`,
      method: 'DELETE',
      dataType: 'json',
      success: resolve,
      error: reject
    });
  });
}

function add(user) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${URL}`,
      crossDomain: true,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      dataType: 'json',
      success: resolve,
      error: reject,
      data: JSON.stringify(user)
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
  
  remove(user) {
    remove(user).then(() => {
      this.publish({
          actionType: 'remove',
          data: user
      });
    });
  }
  
  getAll() {
      return getAll();
  }
  
  publish(action) {
    this.getAll().then((data) => {
      action.users = data.users;
      this.subscribers.forEach((subscriber) => {
        subscriber(action);
      });
    });
  }
  
  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}

// export singleton
export default new RegistrationsStore();