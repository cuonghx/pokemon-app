# Pokemon App

## Requirements

Create a Pokemon App (using Nextjs-version 14):

- This page is displaying a list of Pokemon with pagination
- You can filter the Pokemon by type.

## Overview

This document provides an architectural and implementation overview of the Pokemon App built using Next.js (version 14). The app displays a list of Pokemon with pagination and allows filtering by type. It leverages server-side rendering, in-memory caching, and URL search parameters for managing state and paging.

## Architecture

### Components

1. Server Component:

- Renders the content from the server side using Next.js.
- Fetches data from the PokeAPI based on the current filters and pagination state.

2. Client Component:

- Manages the pagination and filter state on the client side.
- Updates the URL search parameters to reflect the current state.

3. Caching Layer:

- Uses in-memory cache (LRU) to store filter values with relevant keywords.
- Utilizes axios-cache-interceptor to cache identical requests and centralize error handling.

## Data Flow

1. Initial Render:

- The server component checks URL search parameters to determine current filters and pagination state.
- Fetches Pokemon data accordingly using either fetchPokemon or fetchPokemonByTypes API.

2. Client Interaction:

- User interacts with pagination controls or filter options.
- The client component updates the URL search parameters to reflect the new state.
- Triggers a new data fetch based on the updated parameters.

3. Data Fetching:

- Depending on the filter state, the appropriate API (fetchPokemon or fetchPokemonByTypes) is called.
- If fetching by type, the in-memory cache is checked to avoid redundant API calls.
- Fetched data is stored in the cache for future use.

## State Management

### URL Search Parameters

- The app uses URL search parameters to manage filter and pagination state.
- This approach provides several benefits:
  - Bookmarkable and Shareable URLs: Users can bookmark and share URLs with the current state of the application.
  - Server-Side Rendering and Initial Load: The server can directly consume URL parameters to render the initial state.
  - Analytics and Tracking: Easier tracking of user behavior through URL parameters without additional client-side logic.

### In-Memory Cache

- **LRU Cache**: An LRU (Least Recently Used) cache is used to store filter values and their corresponding results.
- **Cache Management**:
  - The cache avoids redundant API calls by storing results of recent queries.
  - Handles duplicate requests and ensures efficient memory usage by evicting least recently used entries.
- **Axios Cache Interceptor**
  - **Caching Requests**: Uses axios-cache-interceptor to cache identical API requests.
  - **Centralized Error Handling**: Errors from API requests are centrally managed, providing a consistent error handling mechanism.

## Implementation Details

### Fetching Data

`fetchPokemon`:

- Used when no filters are applied.
- Parameters:
  - offset: The offset for pagination.
  - limit: The number of items per page.

`fetchPokemonByTypes`

- Used when filters are applied.
- Parameters:
  - types: A list of selected Pokemon types.
- Utilizes the in-memory cache to store and retrieve results based on filter keywords.

### Data Flow

1. Check Filter Params:

- Determine the API to call (fetchPokemon or fetchPokemonByTypes) based on the presence of filter parameters in the URL.

2. Pagination Handling:

- Pass offset and limit parameters to fetchPokemon for managing pagination.
  For fetchPokemonByTypes, calculate the cache key based on filter keywords and retrieve/store results in the in-memory cache.

### UI Components

1. Pagination Component

- Renders pagination controls.
- Updates the URL search parameters on page change.
- Fetches new data based on the current page.

2. Filter Component

- Renders filter options (Pokemon types).
- Updates the URL search parameters on filter change.
- Fetches filtered data based on selected types.

3. Data Display Component

- Renders the list of Pokemon.
- Displays loading indicators or error messages based on the current state.
