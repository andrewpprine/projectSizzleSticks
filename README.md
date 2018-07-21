# Tourist ToDo Finder

## Overview

Resource for users to input a city and find a general map of the area, weather forecast, popular spots, and a list of special events. Venue information includes location and user reviews, and event information includes a link to purchase tickets for event.
APIs called:
- Google Maps
- OpenWeatherMap
- Foursquare
- Ticketmaster
Firebase results also displayed.

## Use

1. Upon launch, user is prompted to input a city and option to search for interest keywords. 

2. After submission, user is present with a Google map of the city, the current weather and upcoming forecast, and a top ten list of both popular Foursquare sites and (if available) upcoming special events via Ticketmaster.

3. Foursquare results include a link to that venue's Yelp reviews.

4. User is also provided a list of locations searched for by others. 

## Known bugs

- Firebase results (other searched locations) not listed until initial search executed.

- Google Map is static.

- Weather forecast lists only one temperature/condition based on arbitrary time.

- If no event information found on Ticketmaster, displayed results (if any) do not update, leaving results of prior searches displayed.