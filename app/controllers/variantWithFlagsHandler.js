import {extractValuesFromSqonByField, removeFieldFromSqonByName} from "../utils.js"

const fetchAndAttachVariantFlags = (body) => {
    const data = JSON.parse(body);
    const variants = data?.data?.Variants?.hits?.edges;

    if (variants?.length) {
        // fetch UsersAPI and add a field in each variant
        return JSON.stringify(data);
    }

    return body;
}

export default (req, res, next) => {

    const sqon = req.body?.variables?.sqon;
    
    if (sqon) {

        const withFlags = extractValuesFromSqonByField(sqon, 'withFlags')
        req.body.variables.sqon = removeFieldFromSqonByName(sqon, 'withFlags')

        console.log('[withFlags]', withFlags)

        if (withFlags) {
            // one way to modify body is to replace the res.send() function
            const originalSend = res.send;
            res.send = function () { // function is mandatory, () => {} doesn't work here
                arguments[0] = fetchAndAttachVariantFlags(arguments[0])
                originalSend.apply(res, arguments);
            };
        }
    }

    return next();
}