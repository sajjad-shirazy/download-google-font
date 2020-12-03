# Google Font Downloader For Nodejs

## Install

```bash
npm i google-font-family-downloader
```

## Usage

```js
import { join } from 'path';
import { downloadGoogleFontFamily } from 'google-font-family-downloader';

const FONTS_DIRECTORY = join(process.cwd(), `fonts`);

// some where else
const fonts = await downloadGoogleFontFamily('Roboto', FONTS_DIRECTORY);
```
