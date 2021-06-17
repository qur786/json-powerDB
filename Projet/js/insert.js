
$("#empid").focus();

// validation function
    function validateAndGetFormData() {
        var empIdVar = $("#empid").val();
        if (empIdVar === "") {
        alert("Employee ID Required Value");
        $("#empid").focus();
        return "";
    }
        
    var empNameVar = $("#empname").val();
        
    if (empNameVar === "") {
        alert("Employee Name is Required Value");
        $("#empname").focus();
        return "";
    }
        
    var empEmailVar = $("#email").val();
        
    if (empEmailVar === "") {
        alert("Employee Email is Required Value");
        $("#email").focus();
        return "";
    }
    
    var empMobileVar = $("#mobile").val();
        
    if (empMobileVar === "") {
        alert("Employee Email is Required Value");
        $("#mobile").focus();
        return "";
    }
        
    var jsonStrObj = {
        EmpId: empIdVar,
        EmpName: empNameVar,
        EmpEmail: empEmailVar,
        EmpMobile: empMobileVar
    };
        
    return JSON.stringify(jsonStrObj);
    }
   

    function resetForm() {
        $("#empid").val("")
        $("#empname").val("");
        $("#email").val("");
        $("#mobile").val("");
        $("#empid").focus();
    }
    
    function saveEmployee() {
        var jsonStr = validateAndGetFormData();
        if (jsonStr === "") {
        return;
        }
        
        // This method is used to create PUT Json request.
        var putReqStr = createPUTRequest("90936012|-31948847126384847|90933815",
        jsonStr, "Employee-DB", "Employee-Rel");
        
        alert(putReqStr);
        
        jQuery.ajaxSetup({async: false});
        
        var resultObj = executeCommandAtGivenBaseUrl(putReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
        var ResObj = jQuery('#res');
         ResObj.css('padding','20px');
         ResObj.text(JSON.stringify(resultObj)).fadeIn().delay(5000).fadeOut();
        jQuery.ajaxSetup({async: true});
        
        resetForm();
    }
