

const userActive = (user) => {
    return user.status === true;
}

const userExists = (user) => {
    return user;
}

module.exports = {
    userActive,
    userExists
}
