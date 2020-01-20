const { createAudio } = require('node-mp3-player')
const Audio = createAudio();
 
(async () => {
  const myFile = await Audio('./audio.mp3')
  await myFile.play()
})()