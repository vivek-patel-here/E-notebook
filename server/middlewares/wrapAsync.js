const wrapAsync = (func)=>{
    return function(req,res){
        func(req,res).catch((err)=>{
            res.status(500).json({message:"Internal Server Error" , success:false ,error:err})
        })
    }
}

module.exports ={wrapAsync}