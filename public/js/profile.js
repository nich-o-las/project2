$(function(){
    $('#submit-unit').on('click', function(e){
        e.preventDefault();
        const data = {
            name : $("input[name=name]").val(),
            description: $("input[name=description]").val(),
            address: $("input[name=address]").val(),
            city: $("input[name=city]").val(),
            state: $("input[name=state]").val(), 
            zip: $("input[name=zip]").val(), 
            capacity: $("input[name=capacity]").val(),
            tools: $("input[name=tools]").val(),
            climate: $("input[name=climate]").val(),
            userId: $('#greeting').data('id')
        };
        $.post('/api/unit', data, ()=>{
            location.reload();
        })
    });

    $('#findUnits').on("click", function(e){
        e.preventDefault();
        const data = {
            city: $("input[name=searchCity]").val(),
            state: $("input[name=searchState]").val()
        }
        $.post('/api/unit/city', data, (result)=>{
            $("#findUnitsModal .modal-body").empty();
            const available = result.filter(item => item.status === "available");
            const ul = $('<ul>');
            available.forEach(item => {
                const li = $("<li>");
                const name = $(`<h3>${item.name}</h3>`);
                const description = $(`<p>${item.description}<p>`);
                const address = $(`<p>${item.address} ${item.city},${item.state} ${item.zip}</p>`);
                //if(item.image) const image = $(`<img src="${item.image}">`);
                const features = $(`<p>capacity: ${item.capacity}, has tools: ${item.tools}, climate controlled: ${item.climate}</p>`);
                li.append(name, description, address, features);
                ul.append(li);
            })
            $("#findUnitsModal .modal-body").append(ul);
        })
    });

    $.get(`../api/units/${$('#greeting').data('id')}`, (data)=>{
        console.log(data);
        data.forEach(item =>{
            const li = $(`<li>${item.name}: ${item.status}</li>`);
            if(item.status === "requested"){
                const btn = $(`<button data-id="${item.id}">Accept Request</button>`);
                li.append(btn);
            }
            $("#units").append(li);
        })
    })

});
