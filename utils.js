exports.replaceAll = function(find, replace, str) {
    var find = find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return str.replace(new RegExp(find, 'g'), replace);
}

exports.setDoubleQuotes = function(str) {
    str = str.replace(/"/g, "").replace(/'/g, "");
    return '\"' + str + "\"";
}

exports.setSimpleQuotes = function(str) {
    str = str.replace(/"/g, "").replace(/'/g, "");
    return '\'' + str + "\'";
}
