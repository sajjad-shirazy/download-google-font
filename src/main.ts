import axios from 'axios';
import { Open } from 'unzipper';

export async function downloadGoogleFontFamily(family: string, path: string = process.cwd()) {
  const { data } = await axios(`https://fonts.google.com/download`, {
    responseType: 'arraybuffer',
    params: { family },
  });
  const { files, extract } = await Open.buffer(data);
  extract({ path, concurrency: 5 });
  return files;
}
