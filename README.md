# Type Zero

**Type Zero** is a high-octane, cyberpunk-themed typing survival game. Words descend from the network like enemy units—type them exactly to destroy them before they breach the core.

## Features

-   **Wave Survival**: Endless waves of words with increasing speed and difficulty.
-   **Special Units**:
    -   ❤️ **Health Unit**: Restores health.
    -   ❄️ **Slow Unit**: Slows down time.
    -   💨 **Gust Unit**: Blows enemies back up.
    -   🎯 **Assassin Unit**: Destroys the closest enemy.
    -   💰 **Midas Unit**: Doubles score temporarily.
    -   🛡️ **Shield Unit**: Blocks damage.
-   **Boss Waves**: Intense battles against massive boss identifiers.
-   **Streak System**: Build combos for score multipliers.
-   **Ultimate Ability**: Charge up a screen-clearing blast.
-   **Visuals**: Neon-drenched retro-futuristic aesthetic with dynamic animations.

## Tech Stack

-   **React 19**: Core UI framework.
-   **Vite**: Fast build tool and dev server.
-   **Tailwind CSS**: Utility-first styling for the cyberpunk theme.
-   **Lucide React**: Icongraphy.

## Local Development

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/type_zero.git
    cd type_zero
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Start development server**:
    ```bash
    npm run dev
    ```

4.  **Build for production**:
    ```bash
    npm run build
    ```

## Deployment Verification

This project is configured for deployment on **Cloudflare Workers**.

### Configuration
The project uses the "Workers Sites" pattern (KV-backed static site hosting) rather than Cloudflare Pages.

-   **`wrangler.toml`**: Configures the worker, build command, and site bucket.
-   **`workers-site/index.js`**: The worker script that handles asset serving from KV.

### How to Deploy (Connect to Git)

1.  Log in to the **Cloudflare Dashboard**.
2.  Go to **Workers & Pages**.
3.  Click **Create Application** -> **Connect to Git**.
4.  Select this repository (`type_zero`).
5.  Cloudflare should detect the configuration. Ensure the following settings if prompted:
    -   **Build command**: `npm run build`
    -   **Build output directory**: `dist`
6.  Click **Save and Deploy**.

Cloudflare will automatically build the React app and deploy the worker on every push to the main branch.

### Custom Domain
The project includes configuration for the custom domain:
-   `typezero.williamfinken.com`

Ensure this domain is active in your Cloudflare account for the routing to works automatically.
