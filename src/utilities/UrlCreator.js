function partialCreator (params){
    let partialString = '';
    Object.values(params).forEach((value) => {
        partialString += `/${encodeURIComponent(value)}`
    })
    return partialString
}

function partialItemEncoder (item){
    return encodeURIComponent(item)
}

export{
    partialItemEncoder,
    partialCreator
}
