const instance = require("@utils/utils");

async function createTrolley(id){
    try{
    await instance.post(`trolley?id=${id}`)
    }catch(err){
        console.log(err);
    }
}
module.exports = createTrolley;