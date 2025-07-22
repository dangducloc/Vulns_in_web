function checkCookie(req,res){
    const cookie = req.cookies['user'];
    if(cookie != null || cookie != undefined){
        const foo = Buffer.from(cookie, 'base64').toString('utf-8');
        const raw_data = JSON.parse(Buffer.from(foo, 'base64').toString('utf-8')); 
        return {success:true,user:raw_data.user};
    }else{
        return {success:false};
    }
}

module.exports = checkCookie;