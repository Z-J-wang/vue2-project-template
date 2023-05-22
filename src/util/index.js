import { automatedImportForObject } from '@/util/modules/automoted-import-modules';

const modules = automatedImportForObject(require.context('@/util/modules', true, /.\/.+\.js/));

export default { ...modules };
