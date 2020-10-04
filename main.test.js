const puppeteer = require('puppeteer');
const axios = require("axios")
const projectName = 'TV show app testing';
let page;
let browser;
let shows;
let searchedShows;
const pathToShowTitle ="#root > div > div.one-show-img-and-title > h2"

const delay = (time) => {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }

const getTvShowTitle = (childNum)=>{
   return `#root > div > div > a:nth-child(${childNum}) > div > h2`
}
const getGenrePath = (childNum)=>{
    return `#root > div > div.one-show-img-and-title > div > div.genres > span:nth-child(${childNum})`
}


jest.setTimeout(30000);
describe(projectName, () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  })
  describe('Home page test', () => {
        test('The app should have home page with all the popular tv shows', async () => {
            await page.goto('http://localhost:3000');
            const { data: theShows } = await axios.get(
                'https://www.episodate.com/api/most-popular'
            );
            shows = theShows.tv_shows
            await page.waitForSelector('.tv-show');
            const tvShows = await page.$$('.tv-show')
            expect(tvShows.length).toBe(shows.length)
            const firstShow =  await page.$eval(getTvShowTitle(1),show=>show.innerText)
            const secondShow =  await page.$eval(getTvShowTitle(2),show=>show.innerText)
            const lastShow =  await page.$eval(getTvShowTitle(20),show=>show.innerText)
            expect(firstShow).toBe(shows[0].name)
            expect(secondShow).toBe(shows[1].name)
            expect(lastShow).toBe(shows[19].name)
        }) 
    })
    
    describe('Search test', () => {
        test('The app should have a working search bar and if the input submited empty the app should show the popular tv showes'
            ,async()=>{
            await page.goto('http://localhost:3000');
            await page.waitForSelector('#search-bar');
            const filterText = "harry"
            await page.type('#search-bar', filterText)
            await delay(2000)
            await page.$eval('#submit-btn',submit=>submit.click())
            await delay(2000)
            await page.waitForSelector('.tv-show');
            const {data} = await axios.get(
                "https://www.episodate.com/api/search?q=harry"
            );
            searchedShows = data.tv_shows
            let tvShows = await page.$$('.tv-show')
            expect(tvShows.length).toBe(searchedShows.length)
            let firstShow =  await page.$eval(getTvShowTitle(1),show=>show.innerText)
            let secondShow =  await page.$eval(getTvShowTitle(2),show=>show.innerText)
            let lastShow =  await page.$eval(getTvShowTitle(3),show=>show.innerText)
            expect(firstShow).toBe(searchedShows[0].name)
            expect(secondShow).toBe(searchedShows[1].name)
            expect(lastShow).toBe(searchedShows[2].name)
            await page.focus("#search-bar")
            for(let i = 0 ;i<filterText.length; i++){
                await page.keyboard.press('Backspace');
            }
            await page.$eval('#submit-btn',submit=>submit.click())
            await delay(2000);
            await page.waitForSelector('.tv-show');
            tvShows = await page.$$('.tv-show')
            expect(tvShows.length).toBe(shows.length)
            firstShow =  await page.$eval(getTvShowTitle(1),show=>show.innerText)
            secondShow =  await page.$eval(getTvShowTitle(2),show=>show.innerText)
            lastShow =  await page.$eval(getTvShowTitle(20),show=>show.innerText)
            expect(firstShow).toBe(shows[0].name)
            expect(secondShow).toBe(shows[1].name)
            expect(lastShow).toBe(shows[19].name)
        })
  })
    describe('One show test', () => {        
        test("The app should go to the tv show page when clicking on tv show item",async()=>{
            await page.goto('http://localhost:3000');
            await page.waitForSelector('.tv-show');
            await page.hover(getTvShowTitle(1));
            await page.click(getTvShowTitle(1));
            await page.waitForSelector('.one-show-description');
            const show =  await page.$eval(pathToShowTitle,show=>show.innerText)
            expect(show).toBe(shows[0].name)
        })
        test("The single tc show page should include all the requirments",async()=>{
            await page.goto('http://localhost:3000');
            await page.waitForSelector('#search-bar');
            const filterText = "game of thrones"
            await page.type('#search-bar', filterText);
            await delay(2000)
            await page.$eval('#submit-btn',submit=>submit.click())
            await delay(2000)
            await page.$eval(getTvShowTitle(1),show=>show.click())
            await delay(2000)
            await page.waitForSelector('.one-show-description');
            const { data } = await axios.get(`https://www.episodate.com/api/show-details?q=23455`);
            const selectedShow  = data.tvShow
            const show =  await page.$eval(pathToShowTitle,show=>show.innerText)
            const seasons =  await page.$eval(".seasons",show=>show.innerText)
            expect(show).toBe(selectedShow.name)
            expect(seasons).toBe("8 seasons")
            const firstGenre =  await page.$eval(getGenrePath(1),genre=>genre.innerText)
            const secondGenre =  await page.$eval(getGenrePath(2),genre=>genre.innerText)
            const lastGenre =  await page.$eval(getGenrePath(3),genre=>genre.innerText)
            const genre1 = selectedShow.genres[0]
            const genre2 = selectedShow.genres[1]
            const genre3 = selectedShow.genres[2]
            expect(firstGenre).toBe(genre1)
            expect(secondGenre).toBe(genre2)
            expect(lastGenre).toBe(genre3)
            const status =  await page.$eval(".status",showStatus=>showStatus.innerText)
            expect(status).toBe(selectedShow.status)
            const showImg =  await page.$eval(".one-show-img",img=>img.src)
            expect(showImg).toBe(selectedShow.image_path)
            const rating =  await page.$eval(".green",rating=>rating.innerText)
            expect(rating).toBe("9.4")
        })
        test("the rating should have a class yellow if the rating is less then 8 and bigger or equal to 6", async () => {
            await page.goto('http://localhost:3000/show/66428');
            await delay(2000);
            const rating = await page.$eval('.yellow', rating => rating.innerText)
            expect(rating).toBe("7.0" || 7);
        })

        test("the rating should have a class red if the rating is less then 6",async() =>{
            await page.goto('http://localhost:3000/show/3232');
            await delay(2000);
            const rating = await page.$eval('.red',rating=>rating.innerText)
            expect(rating).toBe("0" || 0);
        })
    })
})