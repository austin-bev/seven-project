# Seven News Rendering App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Created as a project for Seven West Media.
Reads in a .json file and renders it as a news article

## JSON Format

{
headline: string;
source: string;
byline: string;
publicationDate: Date;
blocks: Block;
}

Block = ImageBlock | TextBlock | QuoteBlock;

ImageBlock {
kind: string;
captionText: string;
url: string;
}

QuoteBlock {
kind: string;
text: string;
attribution: string;
}

TextBlock {
kind: string;
text: string;
intentions: Intention[] | [];
}

Intention {
kind: string;
index: number;
length: number;
}

## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`
Deploys the application to [https://austin-bev.github.io/seven-project/]https://austin-bev.github.io/seven-project/
