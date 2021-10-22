<!DOCTYPE html>
<html>
<head>
    <title>VGEN Corp</title>
</head>
<body >
<div style="text-align: center;margin-top: 150px;">
    <h2>VGEN Corp</h2>
</div>

<div style=" width: 100% " class="main">
    <div style="float: left" class="main-left">
        <b>{{ $firstName.' '.$lastName }}</b><br>
        {{ $country }}
    </div>
    <div style="float: right" class="main-right">
        <b>Invoice</b> <br>
        <strong>#{{ $JobId }}</strong>
    </div>

</div>
<br>
<br>
<br>
<br>
<hr>
<br>
<div style=" width: 100% " class="main">
    <div style="width: 33%; float: left" class="main-left">
        <p><b>Bill From</b></p>
        <strong>VGEN Corp</strong><br>
        <strong>Dhaka,Bangladesh</strong>

    </div>
    <div style="width: 33%; float: left; text-align: center" class="main-right">
        <p><b>Bill To</b></p>
        <strong>{{ $firstName.' '.$lastName }}</strong><br>
        <strong>{{ $country }}</strong><br>
        <strong>{{ $email }}</strong>
    </div>
    <div style=" float: right" class="main-right">
        <p><b>Date: {{ $startDate }}</b></p>
        <strong>Amount: {{ $amount }}$</strong><br>
        <strong>Work Id: {{ $workId }}</strong>
    </div>

</div>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<hr>
<br>
</body>
</html>

