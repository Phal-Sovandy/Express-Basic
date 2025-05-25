
export default function logger(req, res, next){
    let time = new Date;
    console.log(`- Method: ${req.method}`);
    console.log(`- Request Path: ${req.url}`);
    console.log(`- Query Parameters: ${JSON.stringify(req.query)}`);
    console.log(time.toISOString());

    next();
}