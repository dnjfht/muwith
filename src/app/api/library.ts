import { LibraryMyLibraryItem } from '../types/api-responses/library';
import { MOCK_DATA } from './mock_data';

export const fetchLibrarayData = async () => {
  return MOCK_DATA['04be41a9-0594-4033-aeb4-6ca1ac8e2e49'].my_library as unknown as LibraryMyLibraryItem[];
};
