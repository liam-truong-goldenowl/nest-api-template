import { Env } from '@/utils/constants';

export const getEnv = (): string => process.env.NODE_ENV || Env.DEVELOPMENT;

export const isDevelopmentEnv = (): boolean => getEnv() !== Env.PRODUCTION;
