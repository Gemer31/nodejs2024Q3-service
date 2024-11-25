import { SetMetadata } from '@nestjs/common';

export const PUBLIC_METADATA_KEY = 'publicMetadataKey';

export const PublicHandler = () => SetMetadata(PUBLIC_METADATA_KEY, true);
