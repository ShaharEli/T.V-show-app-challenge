# TV show app challenge

## Info
---

Welcome to our challenge! In this challenge we will test your abilities to create a simple react app and using API. Your task is to build a simple IMDB clone for TV shows.

* The CSS will be provided to you. **Do not change it!**

* You need to implement your code only where you asked to (you can see it in the comments inside the code).

* Some part of the code is already given. You can see in the comments links to read more about the features that we used.

## Requirements
---
* First go into the `shows` directory and run `npm i` in your terminal to install all the dependencies you will need to complete this challenge.

* In the home page you need to display top 20 TV shows when the search input is empty. You already have the `shows state` that related to the those shows. Use [this](https://www.episodate.com/api/most-popular) API.

* For every show you need to use the `Show` component. In this component, inside the `Link`, You will have to create a `div` with the class `tv-show`. Inside this `div` you need to create a `img` of the TV show thumbnail with the class `show-img` and beneath, a `h2` with the class `show-footer` header with the name of the TV show.

* After you finished the `Show` component, you will need to implement a `form` element in the `Home` component. The `form` will include `input` element with the id `search-bar` and `button` element with the id `submit-btn`.

* Every time that the form submitted you will need to display the search results from this  API: https://www.episodate.com/api/search?q= + the searched input. If the form submitted empty the home page need to display the popular tv shows again.

* After you finished the `Home` and the `Show` components tasks, you will need to fix the `OneShow` componenet, in this component you already got the id of the selected show and `Link` back to the `Home` page. 

* Use this Api: https://www.episodate.com/api/show-details?q= + the show id
to get the details of the show.

* Beneath the `Link` that we provided to you create `div` with the class `one-show-img-and-title`, in this `div`
you will need to have `h2` with the show name, `img` with the class  `one-show-img` with the tv show img and 
`div` with the class `one-show-footer`.

* In the `one-show-footer` `div` you will need create `div` with the class `seasons` in this `div` you should have text that shows the number of seasons of the selected show, for example: 8 seasons.

* In the `one-show-footer` `div` you also will need to create `div` with the class `genres`. In this `div` you should have `span` for every genre of the selected show with the class `genre`.

* In the `one-show-footer` `div` you also will need to create `div` with the class `rating`. In this `div` you should have `span` with the rating of the tv show with max length of three chars, for example: 9.8 (not 9.876).
The class name of the `span` needs to be `green` if the tv show's rating greater than or equal to 8, else if the the tv show's rating greater than or equal to 6 the `class` needs to be `yellow` and if the rating is less than 6 the `class` needs to be `red`.

* In the `one-show-footer` `div` you will need create `div` with the class `show-status` in this `div` you should have `span` with the class `status`
that shows the status of the show.

* Beneath the `one-show-img-and-title` `div` you will need to create `div` with class `one-show-description`. In this `div` you will need to create `h2` with the text: description: .  Beneath the `h2` element you will have to display the selected show discription.


## Testing
---


To test your code enter the shows folder than run `npm start` in your terminal and in another terminal run `npm run test`. 


