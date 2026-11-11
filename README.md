# Final Project — Astana IT University Website

Astana IT University, Web Technologies
Team, group SE-2530: Anarov Daniyal, Mukashev Arman

Published site: https://collector119.github.io/aitu-frontend-final/

Repository: https://github.com/Collector119/aitu-frontend-final

## Topic

The final project continues our midterm and endterm website about Astana IT University. The topic,
the five pages, the Bootstrap layout, the media queries and all endterm features stay the same.
The final adds classes, data from two public APIs and data that is saved in `localStorage`.

## Group Members

| Member | Endterm features | Final features |
|---|---|---|
| Anarov Daniyal | programs table from an array, search and field filter, favorites list, dark theme switcher | `Program`, `SavedList` and `FavoriteList` classes, favorites saved in `localStorage`, weather from the Open-Meteo API |
| Mukashev Arman | contact form validation, campus gallery filter (jQuery), FAQ accordion (jQuery) | `QuestionList` class, sent questions saved in `localStorage`, public holidays from the Nager.Date API, README |

## Pages

| Page | Content | Interactive features |
|---|---|---|
| `index.html` | Home: photo, three reasons to study at AITU, key numbers | theme switcher, **weather in Astana (API)** |
| `about.html` | About: history, mission, how to apply | FAQ accordion |
| `programs.html` | Programs: table of bachelor programs | table from an array, search, filter, **favorites that stay after a reload** |
| `campus.html` | Campus: gallery of nine photos | filter by category |
| `contact.html` | Contact: address and a question form | form validation, **list of sent questions**, **public holidays (API)** |

New final features are in bold.

## New Final Features

| Feature | File | What it uses |
|---|---|---|
| Programs as objects of a class | `js/programs.js` | `class Program`, `constructor`, method `matches()`, `new` |
| Base class for saved lists | `js/storage.js` | `class SavedList`, `localStorage.getItem()` and `setItem()`, `JSON.parse()` and `JSON.stringify()` |
| Favorites that stay after a reload | `js/programs.js` | `class FavoriteList extends SavedList`, methods `has()`, `add()`, `remove()` |
| Weather in Astana | `js/weather.js` | `class WeatherWidget`, `fetch`, `async` / `await`, `try` / `catch`, `response.ok` |
| List of sent questions | `js/contact.js` | `class QuestionList extends SavedList`, array of objects in `localStorage`, `Delete` buttons |
| Public holidays | `js/holidays.js` | `class HolidayList`, `fetch`, `async` / `await`, `slice()`, `for...of`, `Date` |

## JavaScript Classes

| Class | File | Role |
|---|---|---|
| `Program` | `js/programs.js` | one bachelor program; `matches(searchText, field)` says if it fits the search |
| `SavedList` | `js/storage.js` | parent class: keeps an array in `this.items`, loads it from `localStorage` and saves it back |
| `FavoriteList` | `js/programs.js` | child of `SavedList`: names of favorite programs |
| `QuestionList` | `js/contact.js` | child of `SavedList`: questions sent from the contact form |
| `WeatherWidget` | `js/weather.js` | loads the weather and shows it on the home page |
| `HolidayList` | `js/holidays.js` | loads the public holidays and shows the nearest five |

## API Information

Both APIs are free, need no key and no registration, and answer in JSON.

| API | Request | Fields we use |
|---|---|---|
| [Open-Meteo](https://open-meteo.com/) | `GET https://api.open-meteo.com/v1/forecast?latitude=51.09&longitude=71.42&current=temperature_2m,apparent_temperature,wind_speed_10m&timezone=Asia%2FAlmaty` | `current.temperature_2m`, `current.apparent_temperature`, `current.wind_speed_10m`, `current.time` |
| [Nager.Date](https://date.nager.at/) | `GET https://date.nager.at/api/v3/NextPublicHolidays/KZ` | `date` and `name` of every holiday in the array |

While a request is running, the page shows a loading text. If the request fails or the server
answers with an error status, the page shows a message instead of the data and the rest of the page
keeps working.

## Data in localStorage

| Key | Value | Written by |
|---|---|---|
| `theme` | `"light"` or `"dark"` | `js/theme.js` |
| `favorites` | JSON array of program names | `FavoriteList` in `js/programs.js` |
| `questions` | JSON array of objects with `program`, `message` and `date` | `QuestionList` in `js/contact.js` |

## How to Test

1. **Weather.** On Home, scroll to Weather in Astana Now: temperature, feels like and wind speed
   are loaded. Press `Update the weather` to load them again.
2. **Theme.** Press `Dark theme` in the header. Open another page: the dark theme stays.
3. **Programs search.** On Programs, type `data` into the search field: one program is left.
   Press `Esc` to clear the search. Choose `Digital media` in the Field list: two programs are left.
   Type `zzz`: a message says that no programs match.
4. **Favorites.** Press `Save` next to a program. It appears under My Favorite Programs and the
   button changes to `Saved`. Reload the page: the program is still in the list. Press `Remove` in
   the list or `Saved` in the table to delete it.
5. **Gallery filter.** On Campus, press `Study`, `Building` or `Student life`. Only photos of that
   category fade in. `All` shows all nine photos again.
6. **FAQ.** On About, click a question at the bottom. The answer slides down; opening another
   question closes the previous one.
7. **Form validation.** On Contact, press `Send` with an empty form. Every field shows its own
   error. Fill in a name of at least 3 characters, an email like `name@example.com`, choose a
   program, write a message of at least 20 characters and tick the checkbox. Press `Send`: a green
   success message appears and the form is cleared.
8. **Sent questions.** After a successful `Send`, the question appears under My Sent Questions
   with its program and date. Reload the page: the question is still there. Press `Delete` to
   remove it.
9. **Public holidays.** On Contact, the Public Holidays block shows the five nearest public
   holidays of Kazakhstan.

## Instructions

Open the published site, or clone the repository and open `index.html` in a browser:

```bash
git clone https://github.com/Collector119/aitu-frontend-final.git
cd aitu-frontend-final
open index.html
```

No server or build step is required. Bootstrap is a local file `css/bootstrap.min.css`.
jQuery 3.7.1 is loaded from `code.jquery.com`, and the weather and the holidays come from the APIs,
so these parts need an internet connection.

## Credits

Photos in `images/` are from [Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Astana_IT_University)
under the [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) license. Authors:
Aliaskarov Danial (`building.jpg`), Pavelkazaku (`hall.jpg`), ZhamilyaYeshen (all other photos).
