export default (html, styles) => `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>

        <link rel="shortcut icon" href="/static/img/favicon.ico">
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        
        <style type="text/css">${styles}</style>
    </head>
    <body>
        <div id="root">${html}</div>
        <script src="/client.js"></script>
    </body>
    </html>
`;
