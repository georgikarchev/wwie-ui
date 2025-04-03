# WWIE-UI

WWIE-UI is a React-based frontend for the WWIE project. It communicates exclusively with the `wwie-ui-proxy` microservice, which handles all backend interactions.

## Prerequisites

- Node.js (Latest LTS recommended)
- npm (comes with Node.js)
- WWIE-UI-Proxy service running

## Getting Started

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start the development server:

   ```sh
   npm run dev
   ```

   The port that Vite selects will be printed in the terminal. **Take note of it**.

3. Ensure `wwie-ui-proxy` is running and accessible.

## Proxy Connection

This app relies on `wwie-ui-proxy` for all requests. Make sure the proxy service is properly configured before using the UI.

## License

MIT
