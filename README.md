# ensure-script-loader

use glob to get script resources

**Install**

```
npm install --save-dev ensure-script-loader
```  

**Usage**

```
var scripts = require("ensure-script-loader?pattern=./modules/**/*.js!");
scripts["./modules/first.js"]().then((first)=>{
    console.log(first);
});
```  
**notes**

Although this is a'loader', it does not need to be passed in the source, so the parameters introduced in the'require' end with "!".

**Options**

|name|type|default|description  
|:--:|:--:|:-----:|:----------| 
|pattern|string|undefined|Resource path|
|options|object|undefined|glob options|

pattern:Using glob pattern，it is the relative path to the value of context in webpack.
