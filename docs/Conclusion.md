

Hi there,

I wanted to provide you with an overview of the tech stack, file structure, and the challenges faced during the Shamiri Rick an Morty application.

Tech Stack:
- RakkasJS (React + Vite SSR framework): Chosen for its lightweight nature and server-side rendering capabilities.
- React-Relay: Utilized for efficient data fetching and state management, leveraging its optimized query capabilities and automatic type generation.
- GraphQL: Employed as the API endpoint for its scalable and type-safe nature, allowing for efficient data retrieval and avoiding waterfalls.
- Pocketbase: Used as the database solution for its simplicity and built-in features like authentication and user management.

File Structure:
The project follows a file-based routing system similar to NextJS. Files in the `src/pages` directory that match `*.page.tsx` and export a default component are treated as pages.

- `src/pages/index.page.tsx`: The root page (`/`) displays a search bar and default location results. Typing in the search bar filters the results, and selecting "Character" or "Episode" displays location results for those in their respective tabs.

- `src/pages/episode/index.page.tsx`: Displays episode results and has a nested route `src/pages/episode/[episode]/index.page.tsx` for individual episode pages.

- `src/pages/location/index.page.tsx`: Displays location results and has a nested route `src/pages/location/[location]/index.page.tsx` for individual location pages.

- `src/pages/character/index.page.tsx`: Displays character results and has a nested route `src/pages/character/[character]/index.page.tsx` for individual character pages. The Characters tab also includes a section for adding notes about the character.

Additionally, there are bonus profile and auth routes to manage users who can leave notes about characters and edit their own notes.

Features:
- Search through  for Rick and Morty AOI, locations , episodes and characters all in one view with tabs synchronized with URL search parameters
- View the episodes , locations and characters of Rick and Morty with a search bar and filtering options.
- View character details and notes.
- add notes to characters.
- view other people's notes
- sharing URL's will maintain activity state  using search parameters
- Authentication with Email-Password , password reset and email verification + google and github OAuth sign-in.
  - light and dark mode powered by `TailwindCSS` and `DaisyUI` , new themes can be added with a single line addition to `tailwind.config.js`


Challenges:
1. The GraphQL API: The Rick and Morty GraphQL API lacked fragments and nested pagination, making it difficult to work with React-Relay's caching and optimization features. Virtual lists (Virtuoso) were used to handle potentially large response sizes.

2. Requirement Phrasing: The requirement to "Display the data in a manner that allows you to view the location, its residents and see an image of the resident with a representation of their name & status" presented challenges in rendering residents as nested lists under locations. After clarification, rendering location results as links to characters became an acceptable solution.

3. React-Relay and Suspense: React-Relay's data fetching hooks rely on Suspense, which can cause flickering when used with a search bar. This was mitigated by hoisting the search component and state to a parent component and using the `useTransition` hook to prioritize input changes, maintaining better UX during data fetching.

Possible improvements:

1. Add unit and end to end tests : Right now am mostly relying on Typescript `tsc` to check for broken typescript code and types but that doesn't cover logical bugs .
2. Add liking and commenting on people's notes : Pocketbase can definitely achieve this because even if the SDK has limits , it allows you to write raw `SQl`  
3. Add some sort of polling mechanism for people to rate their favorite characters :

[Live project](https://shamiri-rick-and-morty-challenge.vercel.app/?st=LOCATION)
[Source code](https://github.com/tigawanna/shamiri-rick-and-morty-challenge)

This is summarized version , the complete summary is on GitHub
I've enjoyed working on this project and I look forward to working with you.


Best regards,

Dennis Kinuthia
