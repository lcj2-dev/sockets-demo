(() => {
  const appConfig = {
    name: 'Nameless'
  };

  let isBroadcasting = false;

  const appName = document.getElementById('appName');
  const nameInput = document.getElementById('nameInput');
  const dataBtn = document.getElementById('dataBtn');

  nameInput.addEventListener('input', e => {
    appConfig.name = e.target.value.trim();
    appName.textContent = `${appConfig.name} Demo App`;
  });

  dataBtn.addEventListener('click', () => {
    isBroadcasting = !isBroadcasting;

    dataBtn.textContent = `${isBroadcasting ? 'Stop' : 'Start'} sending data`;

    nameInput.disabled = isBroadcasting;

    console.log(
      `${appConfig.name} is now ${isBroadcasting ? 'online' : 'offline'}`
    );
  });
})();
