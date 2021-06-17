
$("#recordid").focus();
var token = '90936012|-31948847126384847|90933815';
dbName = 'Employee-DB';
relationName = 'Employee-Rel';
// validation function
    function validateAndGetFormData() {
        var empRecodIdVar = $("#recordid").val();
        if (empRecodIdVar === "") {
        alert("Employee Record ID Required");
        $("#recordid").focus();
        return "";
    }
  
   
        
    return empRecodIdVar;
    }
   

    function resetForm() {
        $("#recordid").val("");
        $("#recordid").focus("");
   
    }
    
    function RemEmployee() {
        var RecID = validateAndGetFormData();
        if (RecID === "") {
        return;
        }
        
        // This method is used to create PUT Json request.
        var RemoveReqStr = createREMOVERecordRequest(token,dbName,relationName,RecID);
        
        alert(RemoveReqStr);
        
        jQuery.ajaxSetup({async: false});
        
        var resultObj = executeCommandAtGivenBaseUrl(RemoveReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
   
        resultObj = JSON.stringify(resultObj).replace(/\\/g, "")  
               .replace(/"{/g, "{")
               .replace(/}"/g, "}");
        
         var resText = '';
         var JsonObj = JSON.parse(resultObj);
        if(JsonObj.data.removedRecNos.length>0){
        resText += "<p>Record No :"+" "+JsonObj.data.removedRecNos + " Got Deleted</p>";
        }
        else{
            resText += "Employee Not Found";
        } 
        var ResObj = jQuery('#res');
         ResObj.css('padding','20px');
        
         ResObj.html(resText).fadeIn().delay(5000).fadeOut();
        jQuery.ajaxSetup({async: true});
        
        resetForm();
    }
