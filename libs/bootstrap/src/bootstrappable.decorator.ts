import { AppKey } from '@app/configuration/interfaces';
import { SetMetadata } from '@nestjs/common';

/**
 * the main magic is here
 * you should add every MS in AppKey so it will work
 */
export const Bootstrappable = (appKey: AppKey) => SetMetadata('appKey', appKey);
