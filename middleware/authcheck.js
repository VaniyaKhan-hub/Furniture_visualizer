const checkuser=async(req,res,next)=>{
    const sessionid=req.session.userid;
    if(sessionid){
       next();
    }
    else{
        res.redirect('/login')
    }
}
module.exports={checkuser};