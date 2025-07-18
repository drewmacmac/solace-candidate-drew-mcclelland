## UX Improvements
Didn't do any CSS, tailwind work. 
I'm pretty unfamiliar with that stuff and it would've taken me too long. Happy to gain more expertise, but not in 2 hours :)

## Advocate Search API
Suggestion I didn't have time for:
We shouldn't fetch all advocates in a single API call. We should paginate the results.
This would involve moving the search string matching to the ORM/DB query layer, 
and extending the NextJS route to take a query param for the search. 

**Also need to make sure we encode the params for API safety (because it's user input) 
and make sure we use the ORM in a way where it correctly prevents SQL injection** 

This would make it even more important to add debouncing to the search term so we're not thrashing the DB

## Misc
The .env file is mentioned in the readme but doesn't appear to exist

## Build Changes
I really like strict/typechecked TSC settings (`plugin:@typescript-eslint/strict-type-checked`). It helps me catch a lot of my sloppy mistakes, like not awaiting promises 
and void/undefined return values (no implicit returns). I added this to catch any subtle bugs I didn't notice and it found a couple.  
I integrated a setup I like into the repo, but it thrashed with NextJS plugin so I commented that out while I developed.

A note on changing automatic version bumps in `package.json`:
I've seen a lot of incidents caused by minor version bumps.
These are difficult to debug because deployer didn't really change any code other than installing an unrelated dependency.
I'd prefer to limit prod dependencies to patch bumps if team supports it.

## TODO
* There's TODOs scattered throughout the PR with notes on things I'd do different
* Add unit tests
* Split into multiple PRs (one for build, one for bug fixes, one for moving to backend api search)
