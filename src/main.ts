import { HttpService, Injectable } from '@nestjs/common';
import { existsSync, writeFileSync } from 'fs';
import * as path from 'path';

export interface FontFace {
  family: string;
  weight?: string;
  style?: '' | 'normal' | 'italic' | 'oblique';
}

const GOOGLE_FONTS_DIRECTORY = `${process.cwd()}/fonts/google/`;

async function downloadGoogleFont(
  fontFace: FontFace,
  directory = GOOGLE_FONTS_DIRECTORY,
): Promise<string> {
  let style;
  switch (fontFace.style) {
    case 'italic':
      style = 'Italic';
    default:
      style = 'Regular';
  }
  const fontName = fontFace.family.replace(' ', '');
  const fontFileName = `${fontName}-${style}.ttf`;
  const fontPath = path.join(directory, fontFileName);
  if (existsSync(fontPath)) {
    return fontPath;
  } else {
    // https://stackoverflow.com/a/60275751/2179157
    const url = `https://github.com/google/fonts/blob/master/ofl/${fontName.toLowerCase()}/${fontFileName}?raw=true`;
    const { data } = await this.httpService.axiosRef.get(url, {
      responseType: 'arraybuffer',
    });
    writeFileSync(fontPath, data);
    return fontPath;
  }
}
