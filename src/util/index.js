import { automatedImportForObject } from '@/util/modules/automoted-import-modules';

const moudules = automatedImportForObject(
  require.context('@/util/modules', true, /.\/.+\.js/)
);

export default { ...moudules };
