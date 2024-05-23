## Time Plan for Pokemon App Exercise

Total Time: 8 hours

1. Setup and Initial Configuration (1 hour)

- Set up the Next.js project.
- Install necessary dependencies (axios, axios-cache-interceptor, etc.).
- Configure TypeScript if not already set up.
- Initialize a basic project structure.

2. Fetching Data (1.5 hours)

- Implement the fetchPokemon function.
- Implement the fetchPokemonByTypes function.

3. In-Memory Caching (1 hour)

- Implement the LRU cache class for storing filter results.
- Integrate the cache with the fetchPokemonByTypes function.

4. Pagination Logic (0.5 hours)

- Implement the pagination logic in the generatePagination function.
- Test pagination independently to ensure it works as expected.

5. Client-Side State Management (1 hour)

- Implement URL search parameters for managing filter and pagination state.
- Write functions to update and read URL search parameters.

6. Server-Side Rendering (1 hour)

- Implement server-side rendering to fetch and render Pokemon data based on URL parameters.
- Ensure the server component handles errors gracefully.

7. UI Components (1.5 hours)

- Create the PaginationComponent to handle page changes.
- Create the FilterComponent to handle type filters.
- Create the DataDisplayComponent to display the list of Pokemon and handle loading and error states.
- Integrate these components into the main app component.

8. Final Testing and Debugging (0.5 hours)

- Perform end-to-end testing of the application.
- Debug any issues that arise during testing.
- Ensure the application handles various edge cases and error scenarios gracefully.