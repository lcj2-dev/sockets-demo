(() => {
  const connectBtn = document.getElementById('message-connection');
  const sendBtn = document.getElementById('message-send');
  const messageLogs = document.getElementById('message-logs');
  const usernameInput = document.getElementById('message-username');
  const messageInput = document.getElementById('message-text');

  let isConnected = false;
  let socket;

  const logs = [];

  const addToLogs = data => {
    if (logs.length >= 10) {
      logs.shift();
    }

    logs.push(data);

    messageLogs.value = logs.join('\n');
  };

  connectBtn.addEventListener('click', () => {
    if (!isConnected) {
      socket = new WebSocket('ws://localhost:8080/chat');

      socket.addEventListener('open', () => {
        isConnected = true;
        connectBtn.textContent = 'Disconnect';
      });

      socket.addEventListener('message', e => {
        const { user, payload } = JSON.parse(e.data);
        addToLogs(`${user}: ${payload}`);
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
      socket = null;
      isConnected = false;
      connectBtn.textContent = 'Connect';
    }
  });

  sendBtn.addEventListener('click', () => {
    if (isConnected) {
      const msg = {
        user: usernameInput.value,
        payload: messageInput.value
      };

      socket.send(JSON.stringify(msg));
      addToLogs(`${msg.user}: ${msg.payload}`);
    }
  });
})();
