# Little Forest Survival

A small real-time survival game with both singleplayer and multiplayer modes, built with Vue, PixiJS, and a clean game core architecture.

Built with **Vue 3 + Vite + PixiJS**.

## Project Structure

The frontend is split into three simple layers:

1. Game layer - core game logic
2. Presentation layer - game world visualization
3. App layer - Vue application, navigation, and UI

```text
src/
├── app/
├── game/
├── presentation/
└── main.js
```

## Architecture

```text
game         = what happens
presentation = how the game world is presented
app          = how the user interacts with the application
```

### `app/`

Vue application layer.

Contains:

- app shell and routing
- pages and layouts
- shared UI components
- styles
- composables
- application-level coordination
- common ts types

### `game/`

Core game logic.

Contains:

- game state
- world/grid logic
- core entities
- movement
- interactions
- game rules

This layer should not depend on the app layer or the presentation layer.

### `presentation/`

Game visualization layer based on the `createGameView` view factory.

`createGameView` uses a view factory to select and create the appropriate game view implementation, such as `ViewPixi`.

Contains:

- renderer
- camera
- sprites
- layers
- animations
- input handling
- world-to-screen projection

This layer displays the current game state but does not contain game rules.

## Game Session Lifecycle

The game page does not create or destroy the game core directly. Session ownership is separated from the Vue app through the following flow:

```text
GamePage.vue <- useGameSession <- GameSession <- GameCore
```

`useGameSession` connects `GameSession` to the app lifecycle:

- starts the session when the page is mounted
- destroys the session before the page is unmounted

This keeps `GameCore` independent of rendering libraries, allowing the game to use PixiJS, Three.js, or native HTML/DOM rendering. `GameCore` can also be moved to a Web Worker if its workload becomes too demanding for the main thread, with DrawBus handling communication between threads.
