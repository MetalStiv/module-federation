import { makeAutoObservable } from "mobx";

const userStore = makeAutoObservable({
    isLogged: false,
    setLoginStatus: function(value: boolean){
        this.isLogged = value;
    }
});

export default userStore;