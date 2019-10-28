const saveuser = (user) => {
    return {type: "SAVEUSER", user}
};

const deleteuser = () => {
    return {type: "DELETEUSER"}
};


export {saveuser, deleteuser};