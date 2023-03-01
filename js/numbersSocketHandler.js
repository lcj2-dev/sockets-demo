(() => {
  const connectBtn = document.getElementById('numbers-connection');
  const numbersLog = document.getElementById('numbers-log');

  let isConnected = false;
  let socket;

  const logs = [];

  connectBtn.addEventListener('click', () => {
    if (!isConnected) {
      socket = new WebSocket('ws://localhost:8080/numbers');

      socket.addEventListener('open', () => {
        isConnected = true;
        connectBtn.textContent = 'Disconnect';
        socket.send('hello');
      });

      socket.addEventListener('message', e => {
        if (logs.length >= 10) {
          logs.shift();
        }

        logs.push(`[${generateTimestamp()}] Received data: ${e.data}`);

        numbersLog.value = logs.join('\n');
      });

      socket.addEventListener('close', e => {
        console.log(e);
        isConnected = false;
        connectBtn.textContent = 'Connect';
      });

      socket.addEventListener('error', e => {
        console.log(e);
        isConnected = false;
        connectBtn.textContent = 'Connect';
      });
    } else {
      socket.close();
      isConnected = false;
      connectBtn.textContent = 'Connect';
    }
  });
})();
