import axios from 'axios';
import customFetch from './axios';





export async function createUser(name, email, password) {
    const response = await customFetch.post("/utilisateurs", {
        nom: name,
        email: email,
        password: password,
        //returnSecureToken: true,
    });

    const user = response.data;

    return user;
}

export async function login(email, password) {
    const response = await customFetch.post("/login", {
        email: email,
        password: password,
        //returnSecureToken: true,
    });

    const user = response.data;
    console.log(user);

    return user;
}