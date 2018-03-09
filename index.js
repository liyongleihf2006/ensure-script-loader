var path = require("path");
var glob = require("glob");
var loaderUtils = require("loader-utils");
module.exports = function() {
    var options = loaderUtils.getOptions(this);
    var pattern = options.pattern;
    var globOptions = options.options;
    var context = this.rootContext||this.options.context;
    var result = `var scripts = {};`;
    glob.sync(path.join(context,pattern),globOptions).forEach(function(filepath){
        var chunk = loaderUtils.urlToRequest(path.relative(context,filepath));
        result+= 
        `
        scripts["${chunk}"]=function(){
            var resolve,reject,promise = new Promise(function(res,rej){
                resolve = res;
                reject = rej;
            });
            try{
                require.ensure(["${chunk}"],function(require){
                    resolve(require("${chunk}"));
                },"${chunk}");
            }catch(err){
                reject(err);
            }
            return promise;
        }
        `
    });
    result+=`module.exports = scripts;`;
    return result.replace(/\\/g,"/");
};