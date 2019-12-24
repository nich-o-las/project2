$(function(){
    $('#submit-user').on('click', function(e){
        e.preventDefault();
        const email = $('#email').val().trim();
        const password = $('#password').val().trim();
        const data = {
                email,
                password
        };
        $.post('api/users', data, ()=>{
            console.log(data)
        }).then(window.location.href = '/profile/'+data.email);
    })
});