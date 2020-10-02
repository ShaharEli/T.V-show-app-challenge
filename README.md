# TV show app challenge

## Info
---

Welcome to our challenge! In this challenge we will test your abilities to create a simple react app and using API. Your task is to build a simple IMDB clone for TV shows.

* The CSS will be provided to you. **Do not change it!**

* You need to implement your code only where you asked to (you can see it in the comments inside the code).

* Some part of the code is already given. You can see in the comments links to read more about the features that we used.

## Requirements
---

* In the home page you need to display top 20 TV shows when the search input is empty. You already have the `shows state` that related to the those shows. Use [this](https://www.episodate.com/api/most-popular) API.

* For every show you need to use the `Show` component. In this component, inside the `Link`, You will have to create a `div` with the class `tv-show`. Inside this `div` you need to create a `img` of the TV show thumbnail with the class `show-img` and beneath, a `h2` with the class `show-footer` header with the name of the TV show.

* After you finished the `Show` component, you will need to implement a `form` element in the `Home` component. The `form` will include `input` element with the id `search-bar` and `button` element with the id `submit-btn`.

* Every time that the form submitted you will need to display the search results from https://www.episodate.com/api/search?q=searchInputValue API.
