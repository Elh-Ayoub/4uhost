<style>body{font-family:'Open Sans',sans-serif; border-radius: 20px; box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px; width: fit-content; height: fit-content;}
</style>
<body>
    <div style="padding: 10px;">
        <h2>Message from:</h2>
        <p>Name: <b>{{$name}}</b></p>
        <p>Email: <b>{{$email}}</b></p>
        <p>Phone number: <b>{{$phone_number}}</b></p>
    </div>
    <div style="text-align: center; padding: 10px; font-size: large;">
        <p>Message content: </p>
        <p>{{$msg}}</p>
    </div>
    <div style="background-color: #2d529d; color: white; padding: 10px;">
        <p>Respectfully,<br><a href="https://github.com/Elh-Ayoub" style="color: white; text-decoration: none; cursor: pointer;">Ayoub El-Haddadi</a><br></p>
    </div>
</body>