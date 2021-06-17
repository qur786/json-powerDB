
$("#empid").focus();
var token = '90936012|-31948847126384847|90933815';
dbName = 'Employee-DB';
relationName = 'Employee-Rel';
// validation function
    function validateAndGetFormDataUpdate() {
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
        var jsonStr = validateAndGetFormDataUpdate();
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
                    
        resText += 
                    '<h2 class="text-white">UPDATE EMPLOYEE DETAILS</h2>'+ 
                    '<div class="form-group" >'+
                    '<label for="recordid" class="text-white">Record Id</label>'+
                    '<input type="text" class="form-control" id="recordid" value='+JsonObj.data.rec_no+' >'+
                  '</div> '+
                    '<div class="form-group" >'+
                    '<label for="empid" class="text-white">Employee Name</label>'+
                    '<input type="text" class="form-control" id="empid" value='+JsonObj.data.record.EmpId+' >'+
                  '</div> '+
                    '<div class="form-group" >'+
                    '<label for="empname" class="text-white">Employee Name</label>'+
                    '<input type="text" class="form-control" id="empname" value='+JsonObj.data.record.EmpName+' required>'+
                  '</div> '+
                   ' <div class="form-group" > '+
                    '<label for="email" class="text-white">Email</label>'+
                    '<input type="text" class="form-control" id="email" '+'value='+JsonObj.data.record.EmpEmail+' required>'+
                  '</div>'+
                    '<div class="form-group" >'+
                   ' <label for="mobile" class="text-white">Mobile No</label>'+
                    '<input type="text" class="form-control" id="mobile" value='+JsonObj.data.record.EmpMobile+' required>'+
                 ' </div>'+
                '<button type="submit" class="btn btn-primary" id="buttonsub" onclick="UpdateEmployee()">Update</button>';
            
        var inputContainer = $("#input-box");
        inputContainer.html(resText);
            
        }
       
        else{
            resText += "Employee Not Found";
              var res = $("#res");
              res.html(resText);
              res.fadeIn().delay(3000).fadeOut();
        }
        
      
            
     
    }
