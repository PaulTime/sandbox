export default (html) => `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
    </head>
    <body>
        <div id="root">${html}</div>
        <script src="/public/client.js"></script>
    </body>
    </html>
`;
