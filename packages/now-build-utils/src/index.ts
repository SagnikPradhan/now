import FileBlob from './file-blob';
import FileFsRef from './file-fs-ref';
import FileRef from './file-ref';
import { Lambda, createLambda, getLambdaOptionsFromFunction } from './lambda';
import { Prerender } from './prerender';
import download, { DownloadedFiles, isSymbolicLink } from './fs/download';
import getWriteableDirectory from './fs/get-writable-directory';
import glob, { GlobOptions } from './fs/glob';
import rename from './fs/rename';
import {
  execAsync,
  spawnAsync,
  execCommand,
  spawnCommand,
  walkParentDirs,
  installDependencies,
  runPackageJsonScript,
  runNpmInstall,
  runBundleInstall,
  runPipInstall,
  runShellScript,
  getNodeVersion,
  getSpawnOptions,
  getNodeBinPath,
} from './fs/run-user-scripts';
import {
  getLatestNodeVersion,
  getDiscontinuedNodeVersions,
} from './fs/node-version';
import streamToBuffer from './fs/stream-to-buffer';
import shouldServe from './should-serve';
import debug from './debug';

export {
  FileBlob,
  FileFsRef,
  FileRef,
  Lambda,
  createLambda,
  Prerender,
  download,
  DownloadedFiles,
  getWriteableDirectory,
  glob,
  GlobOptions,
  rename,
  execAsync,
  spawnAsync,
  installDependencies,
  runPackageJsonScript,
  execCommand,
  spawnCommand,
  walkParentDirs,
  getNodeBinPath,
  runNpmInstall,
  runBundleInstall,
  runPipInstall,
  runShellScript,
  getNodeVersion,
  getLatestNodeVersion,
  getDiscontinuedNodeVersions,
  getSpawnOptions,
  streamToBuffer,
  shouldServe,
  debug,
  isSymbolicLink,
  getLambdaOptionsFromFunction,
};

export {
  detectBuilders,
  detectOutputDirectory,
  detectApiDirectory,
  detectApiExtensions,
} from './detect-builders';
export { detectFramework } from './detect-framework';
export { DetectorFilesystem } from './detectors/filesystem';
export { readConfigFile } from './fs/read-config-file';

export * from './schemas';
export * from './types';
export * from './errors';

/**
 * Helper function to support both `@vercel` and legacy `@now` official Runtimes.
 */
export const isOfficialRuntime = (desired: string, name?: string): boolean => {
  if (typeof name !== 'string') {
    return false;
  }
  return (
    name === `@vercel/${desired}` ||
    name === `@now/${desired}` ||
    name.startsWith(`@vercel/${desired}@`) ||
    name.startsWith(`@now/${desired}@`)
  );
};

export const isStaticRuntime = (name?: string): boolean => {
  return isOfficialRuntime('static', name);
};

/**
 * Helper function to support both `VERCEL_` and legacy `NOW_` env vars.
 * Throws an error if *both* env vars are defined.
 */
export const getPlatformEnv = (name: string): string | undefined => {
  const vName = `VERCEL_${name}`;
  const nName = `NOW_${name}`;
  const v = process.env[vName];
  const n = process.env[nName];
  if (typeof v === 'string') {
    if (typeof n === 'string') {
      throw new Error(
        `Both "${vName}" and "${nName}" env vars are defined. Please only define the "${vName}" env var`
      );
    }
    return v;
  }
  return n;
};
