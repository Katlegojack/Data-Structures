# Priority Queue Learning Lab

Interactive browser-based visualizations for learning linked-list priority queues.

## Included models

- **Two separate queues** — priority and general nodes use independent Front/Rear pointers.
- **One mixed queue** — priority and general nodes share one linked list, with `lastPriority` marking the boundary.

The interface is intentionally restrained and uses the same blue/white design palette as the SmartQ project while keeping this learning tool visually distinct.

## Run locally

Open `index.html` in a browser.

## GitHub Pages

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.

For the first deployment, GitHub Pages must be enabled for this repository under:

**Settings → Pages → Build and deployment → Source → GitHub Actions**

After that, the included workflow deploys pushes to `main`.
