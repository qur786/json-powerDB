
$("#empid").focus();
var token = '90936012|-31948847126384847|90933815';
var dbName = 'Employee-DB';
var relationName = 'Employee-Rel';
// validation function
    function validateAndGetFormData() {
        var empIdVar = $("#empid").val();
        if (empIdVar === "") {
        alert("Employee ID Required Value");
        $("#empid").focus();
        return "";
    }
  
    var jsonStrObj = {
        EmpId: empIdVar
    
    };
        
    return JSON.stringify(jsonStrObj);
    }
   

    function resetForm() {
        $("#empid").val("")
   
    }
    
    function findEmployee() {
        var jsonStr = validateAndGetFormData();
        if (jsonStr === "") {
        return;
        }
        
        // This method is used to create PUT Json request.
        var getByKeyReqStr = createGET_BY_KEYRequest(token,dbName,relationName,jsonStr);
        
        alert(getByKeyReqStr);
        
        jQuery.ajaxSetup({async: false});
        
        var resultObj = executeCommandAtGivenBaseUrl(getByKeyReqStr,
        "http://api.login2explore.com:5577", "/api/irl");
   
        resultObj = JSON.stringify(resultObj).replace(/\\/g, "")  
               .replace(/"{/g, "{")
               .replace(/}"/g, "}");
        
         var resText = '';
         var JsonObj = JSON.parse(resultObj);
        if(JsonObj.data !== ""){
        resText += "<p>Record No :"+" "+JsonObj.data.rec_no +
        "<br> Employee Id :"+" "+JsonObj.data.record.EmpId+
        "<br> Employee Name :"+" "+JsonObj.data.record.EmpName+
        "<br> Email Id :"+" "+JsonObj.data.record.EmpEmail+
        "<br> Mobile No :"+" "+JsonObj.data.record.EmpMobile + "</p>";
        }
        else{
            resText += "Employee Not Found";
        }
        var ResObj = jQuery('#res');
         ResObj.css('padding','20px');
        
         ResObj.html(resText).fadeIn().delay(20000).fadeOut();
        jQuery.ajaxSetup({async: true});
        
        resetForm();
    }
