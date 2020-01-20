const puppeteer = require("puppeteer-extra")
const pluginStealth = require("puppeteer-extra-plugin-stealth")
puppeteer.use(pluginStealth())
const chromeLauncher = require('chrome-launcher')
const axios = require('axios')
const { createAudio } = require('node-mp3-player')
const Audio = createAudio();

(async () => {
  puppeteer.defaultArgs(
    {
      headless: false,
      args: [
        '--use-fake-ui-for-media-stream'
      ],
      ignoreDefaultArgs: ['--mute-audio']
    }
  )

  const chromeConfig = {
    chromePath: "/usr/bin/google-chrome-stable", chromeFlags: []
  }

  const chrome = await chromeLauncher.launch(chromeConfig);
  const response = await axios.get(`http://localhost:${chrome.port}/json/version`);
  const { webSocketDebuggerUrl } = response.data;
  const browser = await puppeteer.connect({ browserWSEndpoint: webSocketDebuggerUrl });
  const context = browser.defaultBrowserContext();
  await context.overridePermissions('https://meet.google.com', ['microphone', 'camera']);
  const page = await browser.newPage()
  await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36')
  await page.setViewport({ width: 1366, height: 768})
  await page.goto('https://meet.google.com/geo-mggz-amc')
  await page.waitFor(800)
  await page.waitForSelector('input[aria-label="Your name"]', {visible: true})
  await page.click('div[role="button"]')
  await page.waitFor(800)
  await page.waitForSelector('input[type="email"]', {visible: true})
  await page.keyboard.type('mrdownthebot@spotahome.com')
  await page.click('div#identifierNext')
  await page.waitFor(800)
  await page.waitForSelector('input[type="password"]', {visible: true})
  await page.keyboard.type('wedontfuckaroundFrancisco!')
  await page.click('div#passwordNext')
  await page.waitForSelector('div[role="button"][aria-label="Join meeting"]', {visible: true})
  await page.waitFor(3000)
  await page.click('div[aria-label="Turn off camera"]')
  
  await page.click('div[role="button"][aria-label="Join meeting"]')
  
  const myFile = await Audio('./audio.mp3');
  await myFile.play()
})()
