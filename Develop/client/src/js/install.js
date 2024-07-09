const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI to notify the user they can add to home screen
  butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Trigger the installation prompt
    const ePrompt = window.deferredPrompt;
    // Wait for the user to respond to the prompt
    if(!ePrompt){
      return;
    }

    ePrompt.prompt();

    // Reset the deferredPrompt variable
    window.deferredPrompt = null;
    // Hide the install button
    butInstall.classList.toggle('hidden', true);
  });

// TODO: Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Logic to handle the app installation completion
    console.log('App installed successfully!');
    window.deferredPrompt = null;
});
