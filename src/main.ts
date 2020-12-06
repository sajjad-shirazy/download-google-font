import { join } from 'path';
import { Open } from 'unzipper';
import { moveSync, existsSync } from 'fs-extra';
import axios from 'axios';

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
  path = join(path, family);
  await extract({ path, concurrency: 5 });
  const staticDirectory = join(path, 'static');
  if (existsSync(staticDirectory)) {
    moveSync(staticDirectory, path);
  }
  return files;
}
