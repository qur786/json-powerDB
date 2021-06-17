
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
        
    var empNameVar = $("#empname").val();
        
    if (empNameVar === "") {
        alert("Employee Name is Required Value");
        $("#empname").focus();
        return "";
    }
        
    var empEmailVar = $("#email").val();
        
    if (empEmailVar === "") {
        alert("Employee Email is Required ");
        $("#email").focus();
        return "";
    }
    
    var empMobileVar = $("#mobile").val();
        
    if (empMobileVar === "") {
        alert("Employee Mobile No is Required ");
        $("#mobile").focus();
        return "";
    }


            
    var jsonStrObj =  { 
        EmpId: empIdVar,
        EmpName: empNameVar,
        EmpEmail: empEmailVar,
        EmpMobile: empMobileVar
     
    };
        
    return JSON.stringify(jsonStrObj);
    }
   

    function UpdateEmployee() {
        var jsonStr = validateAndGetFormData();
        if (jsonStr === "") {
        return;
        }
        var RecordId = $('#recordid').val();
        // This method is used to create PUT Json request.
        var UpdateReqStr = createUPDATERecordRequest(token, jsonStr, dbName, relationName, RecordId);
        
        alert(UpdateReqStr);
        
        jQuery.ajaxSetup({async: false});
        
        var resultObj = executeCommandAtGivenBaseUrl(UpdateReqStr,
        "http://api.login2explore.com:5577", "/api/iml");
        resultObj = JSON.stringify(resultObj).replace(/\\/g, "")  
               .replace(/"{/g, "{")
               .replace(/}"/g, "}");
       var resText = '';
         var JsonObj = JSON.parse(resultObj);
        if(JsonObj.data !== ""){
        resText += "<p>Record No :"+" "+JsonObj.data[Object.keys(JsonObj.data)[0]].EmpId +
        "<br> Employee Id :"+" "+JsonObj.data[Object.keys(JsonObj.data)[0]].EmpId+
        "<br> Employee Name :"+" "+JsonObj.data[Object.keys(JsonObj.data)[0]].EmpName+
        "<br> Email Id :"+" "+JsonObj.data[Object.keys(JsonObj.data)[0]].EmpEmail+
        "<br> Mobile No :"+" "+JsonObj.data[Object.keys(JsonObj.data)[0]].EmpMobile + "</p>";
            
        var ResObj = jQuery('#res');
         ResObj.css('padding','20px');
        
         ResObj.html(resText).fadeIn().delay(3000).fadeOut();
        }
        else{
            resText += "Employee Not Found";
        }
        
        
        
        resText = 
                    '<h2 class="text-white">SEARCH EMPLOYEE DETAILS BY ID</h2>'+ 
                    
                    '<div class="form-group" >'+
                    '<label for="empid" class="text-white">Employee Id</label>'+
                    '<input type="text" class="form-control" id="empid" placeholder="Enter Employee Id" >'+
                  '</div> '+
                    
                '<button type="submit" class="btn btn-primary" id="buttonsub" onclick="findEmployee()">Search</button>'+
                '</div>'+
                '<div id="res">'  ;
            
        var inputContainer = $("#input-box");
        
       setTimeout(function(){
        inputContainer.html(resText);
         $('#res').html('');
           },3500);
        jQuery.ajaxSetup({async: true});
        
    }
