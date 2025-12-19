import type { MyPointsResponse, ActivitiesResponse } from './types';
import { generateMockMyPointsData, generateMockActivitiesData } from './mock-data';

export const apiService = {
  // A01: Get my points - returns mock data with changes on each request
  async getMyPoints(): Promise<MyPointsResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateMockMyPointsData();
  },

  // A02: Get activities - returns mock data with changes on each request
  async getActivities(): Promise<ActivitiesResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return generateMockActivitiesData();
  },
};

