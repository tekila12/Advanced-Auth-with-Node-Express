exports.getPrivateRoute = (req, res, next) =>{
    res.status(200).json({
        sucess:true,
        data: "You got access to this private data in this route"
    });
}