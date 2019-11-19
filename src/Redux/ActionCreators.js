const saveuser = (user) => {
    return {type: "SAVEUSER", user}
};

const deleteuser = () => {
    return {type: "DELETEUSER"}
};

const saveusername = (username) => {
    return {type: "SAVEUSERNAME", username}
};

const deleteusername = () => {
    return{type: "DELETEUSERNAME"}
};

const saveuser2 = (user) => {
    return {type: "SAVEUSER2", user}
};

const deleteuser2 = () => {
    return {type: "DELETEUSER2"}
};

const savejwt = (jwt) => {
    return {type: "SAVEJWT", jwt}
};

const deletejwt = () => {
    return {type: "DELETEJWT"}
}

export {saveuser, deleteuser, saveusername, deleteusername, saveuser2, deleteuser2, savejwt, deletejwt};