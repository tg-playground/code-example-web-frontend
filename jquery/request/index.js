$(function () {
    const BASE_URL = "http://localhost:18081"
    const USERNAME = "user";
    const PASSWORD = "123456";
    $.ajax({
        url: BASE_URL + "/test/hello",
        method: "POST",
        headers: {
            "Authorization": "Basic " + btoa(USERNAME + ":" + PASSWORD),
        },
    }).done(resp => {
        console.log(resp)
        $("#content").html(resp);
    })
});
