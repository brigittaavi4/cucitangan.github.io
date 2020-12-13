// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.

define("dojo/_base/declare dojo/Stateful dojo/_base/lang dojo/Deferred esri/toolbars/draw esri/geometry/Point esri/graphic esri/geometry/geometryEngineAsync esri/units esri/tasks/GeometryService esri/SpatialReference esri/request esri/tasks/ProjectParameters esri/geometry/webMercatorUtils".split(" "),function(p,q,h,k,r,n,t,u,e,v,l,w,x,g){return p([r,q],{startPoint:null,_setStartPoint:function(a){this._set("startPoint",a)},endPoint:null,_setEndPoint:function(a){this._set("endPoint",a)},lengthUnit:"meters",
_setLengthUnit:function(a){this._set("lengthUnit",a)},angleUnit:"degrees",_setAngle:function(a){this._set("angleUnit",a)},isDiameter:!0,canProjectLocally:!1,constructor:function(){u.isSimple(new n({x:-122.65,y:45.53,spatialReference:{wkid:4326}}))},initGeometryService:function(){var a=this.appConfig.geometryService;a||(a="//utility.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");this.geomService=new v(a);a=new n({x:0,y:0,spatialReference:this.map.spatialReference});g.canProject(a,
new l(3857))&&(this.canProjectLocally=!0)},getRadiusUnitType:function(){var a=e.METERS;switch(this.lengthUnit){case "meters":a=e.METERS;break;case "feet":a=e.FEET;break;case "kilometers":a=e.KILOMETERS;break;case "miles":a=e.MILES;break;case "nautical-miles":a=e.NAUTICAL_MILES;break;case "yards":a=e.YARDS}return a},addStartGraphic:function(a,b){this.removeStartGraphic();this.startGraphic=new t(a,b);this.map.graphics.add(this.startGraphic)},removeStartGraphic:function(){this.startGraphic&&this.map.graphics.remove(this.startGraphic);
this.startGraphic=null},_processAfterMapClick:function(a){var b=new k;4326!==a.spatialReference.wkid?this.getDDPoint(a).then(h.hitch(this,function(d){b.resolve(d)}),function(d){b.reject(d)}):b.resolve(a);return b},getDDPoint:function(a){var b=new k,d=new l(3857);g.canProject(a,d)?b.resolve(g.webMercatorToGeographic(g.project(a,d))):(new w({url:this.geomService.url+"/findTransformations",content:{f:"json",inSR:a.spatialReference.wkid,outSR:4326},handleAs:"json",callbackParamName:"callback"},{usePost:!1})).then(h.hitch(this,
function(c){c=c&&c.transformations?c.transformations:void 0;this.projectPointForDD(b,a,4326,c&&0<c.length?c[0].wkid:void 0)}),h.hitch(this,function(){this.projectPointForDD(b,a,4326,null)}));return b},projectPointForDD:function(a,b,d,c){var f=new x;f.outSR=new l(d);f.geometries=[b];c&&(f.transformForward=!0,f.transformation=c);this.geomService.project(f,h.hitch(this,function(m){a.resolve(m[0])}),function(m){a.reject(m)})},getProjectedGeometry:function(a,b){var d=new k;if(g.canProject(a,b)){var c=
g.project(a,b);d.resolve(c)}else this.geomService.project([a],b,function(f){c=f[0];d.resolve(c)});return d.promise}})});