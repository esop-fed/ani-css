const express = require('express');
const app = express();
const port = process.env.PORT || '3030';

app.use(express.static(__dirname));
app.use('/ani-css/', express.static(__dirname));

app.listen(port, () => {
    console.log(`local address: http://localhost:${port}`);
    console.log(`remote address: http://${getIPAddress()}:${port}`);
});

function getIPAddress() {
    const interfaces = require('os').networkInterfaces();
    let IPAddress = '';

    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (
                alias.family === 'IPv4' &&
                alias.address !== '127.0.0.1' &&
                !alias.internal
            ) {
                IPAddress = alias.address;
            }
        }
    }

    return IPAddress;
}
