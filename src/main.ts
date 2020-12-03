import { join } from 'path';
import axios from 'axios';
import { Open } from 'unzipper';

const DEFAULT_FONT_PATH = join(process.cwd(), `fonts`);

/**
 * 
 * @param family Google font family
 * @param path where to save fonts, by default `./fonts/`
 */
export async function downloadGoogleFontFamily(family: string, path: string = DEFAULT_FONT_PATH) {
  const { data } = await axios(`https://fonts.google.com/download`, {
    responseType: 'arraybuffer',
    params: { family },
  });
  const { files, extract } = await Open.buffer(data);
  extract({ path: join(path, family), concurrency: 5 });
  return files;
}
