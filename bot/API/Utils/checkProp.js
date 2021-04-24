const checkProp = function (req, requiredProp, maxLength = 0) {
    if(! req.hasOwnProperty('body')) return "No json body"
    var missingProperty = []
    for(prop of requiredProp) {
        if(!req.body.hasOwnProperty(prop)) {
            missingProperty.push(prop)
        }
    }

    if(missingProperty.length != 0) {
        return `Missing properties: ${missingProperty.join(' - ')}`
    }else {
        return true
    }
}
