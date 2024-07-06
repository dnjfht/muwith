import { MuwithObject } from '../types/api-responses/global';
import { OftenListenData } from '../types/api-responses/home';
import { MOCK_DATA } from './mock_data';

export const fetchOftenListenData = async () => {
  return MOCK_DATA['04be41a9-0594-4033-aeb4-6ca1ac8e2e49'].often_listen as unknown as OftenListenData[];
};

export const fetchListenAgainRecommened = async () => {
  return MOCK_DATA['04be41a9-0594-4033-aeb4-6ca1ac8e2e49'].listen_again_recommened;
};

export const fetchRecentlyHeard = async () => {
  return MOCK_DATA['04be41a9-0594-4033-aeb4-6ca1ac8e2e49'].recently_heard;
};

export const fetchKpopDanceMusic = async () => {
  return MOCK_DATA['kpop_dance_music'].data as unknown as MuwithObject[];
};
