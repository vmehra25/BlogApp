const jwt = require('jsonwebtoken')

module.exports.authToken = (req, res, next) => {
    const authHead = req.headers['authorization']
    const token = authHead.split(' ')[1]
    if(token != null){
        const JWT_SECRET = process.env.JWT_SECRET
        jwt.verify(token, JWT_SECRET, (err, _id) => {
            if(err){
                res.status(401).json({
                    success:false,
                    error:"Invalid token"
                })
            }else{
                req.body._id = _id
                next()
            }
        })
    }else{
        console.log('here')
        return res.status(400).json({
            success:false,
            error:'NoAuth'
        })
    }
    
}