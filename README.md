
# Express Typescript SQL

Use of express js with typescript and SQL


## Project Roadmap

- If typescript compiler not on m/c install by npm i -g typescript
- What typescript will do is compile our .ts files to .js file.
- Run tsc --init cmd to create the tsconfig file.
- Run npm init to create the package.json
- Install express by running npm i --save express.
- Create app.ts file
- Install npm i --save-dev @types/node & @types/express for typescript translation during dev.
- Add moduleResolution to node in tsconfig file.
- Run tsc to compile files.
- Run node app.js to run the file then
- To change the detination of compiled js files, go to tsconfig & change outDir to ./dist, so now all file sbe under dist folder
- Move all ts file under src folder & change rootDir in tsconfig to ./src
- Now you can run your code by saying node dist/app.js
- Add nodemon by npm i -D nodemon
- Add ts-node by npm i -D ts-node
- In package.json add command for build & dev as build:tsc & dev:nodemon src/app.ts --exec ts-node.
- You can add npm i cors & types for it add app.use(cors()).

