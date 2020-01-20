const puppeteer = require('puppeteer-firefox');

(async (getAudio) => {
  const browser = await puppeteer.launch(
    {
      headless: false,
      args: [
        '--use-fake-ui-for-media-stream',
      ],
      ignoreDefaultArgs: ['--mute-audio']
    }
  )
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
  await page.setViewport({ width: 1366, height: 768})
  await page.goto('https://meet.google.com/gqi-xwos-agj')
  await page.waitForSelector('input[aria-label="Your name"]', {visible: true})
  await page.click('div[role="button"]')
  await page.waitForSelector('input[type="email"]', {visible: true})
  await page.keyboard.type('mrdownthebot@spotahome.com')
  await page.click('div#identifierNext')
  await page.waitForSelector('input[type="password"]', {visible: true})
  await page.keyboard.type('wedontfuckaroundFrancisco!')
  await page.click('div#passwordNext')
  await page.waitForSelector('div[role="button"][aria-label="Join meeting"]', {visible: true})
  await page.click('div[role="button"][aria-label="Join meeting"]')

  await page.waitFor(1000)
  await page.evaluate(() => {
    const audio = new Audio('https://media.vocaroo.com/mp3/FpZJ3RNB0y2')
    audio.play()

    console.log('caca')
    // audio.setAttribute("src", "./audio.mp3");
    // audio.setAttribute("crossorigin", "anonymous");
    // audio.setAttribute("controls", "");
    // audio.onplay = function() {
    //   var stream = audio.captureStream();
    //   navigator.mediaDevices.getUserMedia = async function() {
    //      return stream;
    //   }
    // }

    setTimeout(function () {
      document.querySelector("body").appendChild(audio);
    }, 5000)
  });

  await page.waitFor(300000)
  
  await browser.close()
})(getAudio)

function getAudio () {
  return new Audio('./audio.mp3')
}





await page.waitFor(3000)
await page.evaluate(async () => {
  const audio = new Audio('https://media.vocaroo.com/mp3/FpZJ3RNB0y2')
  audio.setAttribute('id', 'el-weno')
  audio.setAttribute("crossOrigin", "anonymous");
  audio.setAttribute("controls", "");

  await audio.play()
  console.log(audio)

  var stream = audio.captureStream();

  function gotStream(str) {
    console.log('returning stream')
    return stream
  }

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
  navigator.getUserMedia({audio:true}, gotStream, console.log);

  setTimeout(function () {
    document.querySelector("body").appendChild(audio);
    console.log('appended')
  }, 1000)
});