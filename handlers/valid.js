module.exports.valid = function(url, payload){
    let res = false;
    switch(url){
        case 'api/articles/delete':
        if(payload.id !== undefined){
            res = true;
        }
        break;
    }
    return res;
};