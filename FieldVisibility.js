// var SharePointStackExchange = SharePointStackExchange || {};

// SharePointStackExchange.CustomizeFieldRendering = function () {
//     var overrideCtx = {
//         Templates: {
//             Fields: {
//                 'visible': {
//                     'EditForm': SharePointStackExchange.ChangeHyperLink
//                 }
//             }
//         }
//     };

//     SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
// }

// SharePointStackExchange.ChangeHyperLink = function (ctx) {
//     var output = [];

//     var href = ctx.CurrentItem.visible;

//     return SPFieldText_Edit(ctx);
// }

// SharePointStackExchange.CustomizeFieldRendering();
(function () {
    var visibleFieldCtx = {};
    visibleFieldCtx.Templates = {};
    visibleFieldCtx.Templates.Fields = {
        "visible": {
            "EditForm": HidevisibleTemplate
        }
    };

    visibleFieldCtx.Templates.OnPostRender = function (ctx) {
        document.querySelectorAll(".csrHiddenField").forEach(function(field){
            //GetAncestor( field , 'TR' ).style.display='none';
            var elements = document.getElementsByClassName("csrHiddenField");
            for(var i = 0, length = elements.length; i < length; i++) {
                elements[i].parentElement.parentElement.parentElement.style.display = 'none';
            }
            
        });
    };

    SPClientTemplates.TemplateManager.RegisterTemplateOverrides(visibleFieldCtx);
})();

function HidevisibleTemplate(ctx) {
    var visibleField = SPClientTemplates.Utility.GetFormContextForCurrentField(ctx);
    var visibleFieldId = visibleField.fieldSchema.Id;
    var visibleFieldName = visibleField.fieldName;
    var visibleFieldDiv = visibleFieldName + '_' + visibleFieldId;
    var result = '<div><input id='+ visibleField.fieldSchema.Id +' type="text" class="csrHiddenField" name='+
        visibleField.fieldName +' hidden="false" /></div>';
    //document.getElementById(visibleFieldId).parentElement.parentElement.parentElement.style.display = "none";
    if (ctx.CurrentFieldValue === "Yes") {
        return SPFieldText_Edit(ctx);
    }
    else {
        return result;
    }
}