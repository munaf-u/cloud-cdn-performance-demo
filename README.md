# Cloud CDN Performance Demonstration

A small, static, English-language demonstration site for a Cloud Computing course.

## What it demonstrates
- A static website deployed on Cloudflare Pages.
- Cloudflare's globally distributed Pages network serving static assets.
- Browser request timings for repeated test-asset requests.
- Inspection of response headers such as `Server`, `CF-Ray`, and `CF-Cache-Status` when present.

## Free deployment (no custom domain required)
1. Create a GitHub repository and upload the contents of this folder.
2. Sign in to Cloudflare and open **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Select your repository.
4. For a plain HTML site, set the build command to blank / none and the output directory to `/` (the repository root), following the current dashboard prompts.
5. Deploy. Cloudflare will provide a `*.pages.dev` address.

Cloudflare Pages' Free plan currently lists 500 builds per month and distributes uploaded site assets across Cloudflare's global network. Limits can change; check the official docs.

## Run locally for a baseline
With Python installed, open a terminal in this folder and run:
`python -m http.server 8000`

Then open `http://localhost:8000`.

## Demonstration procedure
1. Open the local version and record several measurements.
2. Open the deployed `pages.dev` version on the same device and network.
3. Click **Run 5 measurements** on each version.
4. In browser Developer Tools → Network, reload and select `assets/test.svg`.
5. Record the `Server`, `CF-Ray`, `CF-Cache-Status`, `Cache-Control`, and timing values if available.
6. Repeat the experiment several times and compare medians, not just one request.

## Important scientific note
Local-versus-Cloudflare measurements are an educational demonstration, not a perfectly controlled performance benchmark: the local server and cloud deployment use different network paths and infrastructure. Browser cache, network congestion, geographic distance, and test time affect results. Do not promise that every CDN request is faster. Use the response headers and repeat measurements as evidence.

Cloudflare Pages automatically distributes uploaded static assets through its network. The `_headers` file sets a browser/cache policy for `/assets/*`; cache status may vary by asset, location, and deployment. A `CF-Cache-Status` value of `HIT` indicates a cached response; `MISS` indicates the object was not already cached. If the header is absent, use the `Server: cloudflare` and `CF-Ray` headers as evidence that the response passed through Cloudflare, and describe the result accurately.

## Free-plan reference
Cloudflare Pages Free limits currently include 500 builds per month and up to 20,000 files per site. Confirm current limits in the official documentation before presenting.

## Official documentation
- Pages limits: https://developers.cloudflare.com/pages/platform/limits/
- Pages serving: https://developers.cloudflare.com/pages/configuration/serving-pages/
- Pages custom headers: https://developers.cloudflare.com/pages/configuration/headers/
- Cloudflare cache basics: https://developers.cloudflare.com/cache/get-started/
