$(document).ready(function () {
    $("#loginButtonClick").click(function(){
                
        var name=$("#name").val();
        var phoneNumber=$("#phoneNumber").val();
        var email=$("#email").val();
        var Age=$("#Age").val();
        var country=$("#country").val();
        var salary=$("#salary").val();
        var password=$("#password").val();

         var url = 'http://localhost:3000/api/user';

         var data={  name:name,
            phoneNumber:phoneNumber,
            email:email,
            age:Age,
            country:country,
            salary:salary,
            password:password}
         var options = $.ajax( {
            method: 'post',
            data:data,
            json: true,
            url: url,
            success: function(resultData) { alert("Save Complete"+resultData.insertedCount);},
            error:function(resultData) { alert("Save Complete"+resultData);}

        })

        // options.error(function() { alert("Something went wrong"); });
    });
})