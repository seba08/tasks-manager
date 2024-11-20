


//User Register
const userRegister = async (req, res) => {

    res.json({
        msg: "User Register"
    })
}

//User Auth

const userAuth = async (req, res) => {

    res.json({
        msg: "User Auth"
    })
}

export {
    userRegister,
    userAuth
}