﻿var getProperty = function(prop){    var newProp = {};    for (var key in prop){            try {           if ((typeof prop[key] !== 'function')){                 newProp[key]=prop[key];           }     } catch (e){         newProp[key] = null;         }    }     return newProp; }var getLayer = function(layer){ var newLayer = {}; for (var key in layer){               if ((typeof layer[key] !== 'function')){                        newLayer[key]=layer[key];                   }     }    var propertyGroup = {};    for (var i = 1; i <= layer.numProperties; i++){            var prop = getProperty(layer(i));            propertyGroup[prop.name] = prop;    }    newLayer["properties"] = propertyGroup;    return newLayer; }var getObj = function(obj){   var newObj = {};   for(var key in obj){       if ((typeof obj[key] !== 'function')){           if (key == "layers"){               var layers = [];               for (var i = 1; i <= obj.numLayers; i++){                    layers[i-1] = getLayer(obj.layer(i));               }                newObj[key] = layers;            } else {                newObj[key]=obj[key];            }      }   }   return newObj;}var scomp = app.project.activeItem;$.writeln(getObj(scomp).toSource());