const verifyLogged = (req, res, next) => {
    if (req.user){
        next()
    } else {
        res.status(401).json('No estas loggeado');
    }
}

const verifyLoggedAndInventario = (req, res, next) => {
    verifyLogged(req, res, () => {
        if (req.user.role === 'inventario') {
            next()
        } else{res.status(403).json('No estas autorizado para acceder a esta pagina')}
    })
}

const verifyLoggedAndProduccion = (req, res, next) => {
    verifyLogged(req, res, () => {
        if (req.user.role === 'produccion') {
            next()
        } else{res.status(403).json('No estas autorizado para acceder a esta pagina')}
    })
}