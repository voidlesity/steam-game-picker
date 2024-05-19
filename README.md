# Steam Game Picker

Steam Game Picker is a web application that helps you pick a game to play from your Steam library. It uses the Steam Web API to fetch your library and pick a random game for you to play.

Try it yourself:
[steam.voidlesity.dev](https://steam.voidlesity.dev/)

## Getting Started

### Prerequisites
`node v20` `npm v10` `docker`

#### Getting your Steam API Key

1. Go to the [Steam API Key](https://steamcommunity.com/dev/apikey) page
2. Register for a Steam API Key (you can enter any Domain Name)
3. Copy the API Key and paste it into the `.env` file in Step 3 of the [Installation](#installation) section

### Installation

1. Clone the repo
```sh
git clone https://github.com/voidlesity/steam-game-picker.git
```

2. Install NPM packages
```sh
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables
```
STEAM_API_KEY
```

#### Docker

4. Build the Docker image
```sh
docker build -t steam-game-picker .
```

5. Run the Docker container
```sh
docker run -d -p 3000:3000 steam-game-picker
```

#### Local
4. Build the server
```sh
npm run build
```

5. Start the server
```sh
node .output/server/index.mjs
```

6. Open your browser and navigate to http://localhost:3000

### Usage

1. Enter your Steam profile URL/Custom URL/SteamID in the input field
2. Click the Go! button
3. Now if your Profile is public, you will see a random game of your library
4. You can now either click the Play button to launch the game or click the re-roll button again to pick another game

You can also click on the Game itself to view more details about the game

### Development

1. Clone the repo
```sh
git clone https://github.com/voidlesity/steam-game-picker.git
```

2. Install NPM packages
```sh
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables
```
STEAM_API_KEY
```

4. Start the development server
```sh
npm run dev
```

## Questions and Answers

Where can I access the application?
- You can access the application at [steam.voidlesity.dev](https://steam.voidlesity.dev/)

Why is there no docker image available on Docker Hub?
- Right now when building the image it includes the Steam API Key in the image. I'm not quite sure how to parse an env variable at runtime. Once I figure that out I will push the image to Docker Hub.