<!doctype html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Payment Failed</title>
    <style>
    body {
        font-family: ui-sans-serif, system-ui;
        max-width: 680px;
        margin: 40px auto;
        padding: 0 16px
    }

    .box {
        background: #fef2f2;
        border: 1px solid #ef444433;
        padding: 16px;
        border-radius: 8px
    }
    </style>
    <script>
    window.addEventListener('DOMContentLoaded', function() {
        const params = new URLSearchParams(window.location.search);
        const el = document.getElementById('details');
        if (el) el.textContent = JSON.stringify(Object.fromEntries(params.entries()), null, 2);
    });
    </script>
</head>

<body>
    <h1>Payment failed</h1>
    <div class="box">
        <pre id="details"></pre>
    </div>
</body>

</html>