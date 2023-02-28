(() => {
  socket = new WebSocket('ws://localhost:5015');

  socket.addEventListener('open', e => {
    console.log(e);
    socket.send('hello server');
  });

  socket.addEventListener('message', e => {
    console.log(e);
    console.log(e.data);
  });
})();
