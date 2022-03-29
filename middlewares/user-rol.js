

const isAdmin = async (req, res, next) => {
    const userAuth = req.userAuth;

    if( !userAuth) {
        return res.status(500).json({
            msg: `No se puede verificar el rol sin validar el token.`
        });
    }

    if( userAuth.rol !== 'ADMIN_ROL' ) {
        res.status(401).json({
            msg: `${userAuth.name} no es administrador, no tiene acceso a este servicio.`
        });
    }

    next();
}

const hasRol = (...roles) => {
    return (req, res, next) => {
        const userAuth = req.userAuth;

        if( !userAuth) {
            return res.status(500).json({
                msg: `No se puede verificar el rol sin validar el token.`
            });
        }

        if( !roles.includes(userAuth.rol)) {
            res.status(401).json({
                msg: `${userAuth.name} Debes tener uno de esto roles ${roles} para usar el servicio .`
            });
        }

        next();
    };
}


module.exports = {
    isAdmin,
    hasRol
}
