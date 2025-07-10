import { Env } from '@/utils/constants';

export const getEnv = (): string => process.env.NODE_ENV || Env.DEVELOPMENT;
