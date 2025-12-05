/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CameraItem } from '../types';

export interface FetchCamerasOptions {
  apiUrl?: string;
  apiToken?: string;
  signal?: AbortSignal;
}

export async function fetchCameras(
  {
    apiUrl = "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
    apiToken,
  }: FetchCamerasOptions = {}
): Promise<CameraItem[]> {
  const res = await fetch(apiUrl, {
    headers: {
      ...(apiToken && { Authorization: `Bearer ${apiToken}` }),
    },
  });

  if (!res.ok) throw new Error(`Failed: ${res.status}`);

  const json = await res.json();

  if (Array.isArray(json?.data)) return json.data;

  if (Array.isArray(json)) return json;

  return [];
}



export async function updateCameraStatus(
  id: string | number,
  status: string,
  {
    apiUrl = "https://api-app-staging.wobot.ai/app/v1/update/camera/status",
    apiToken,
  }: { apiUrl?: string; apiToken?: string } = {}
): Promise<void> {
  const res = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(apiToken && { Authorization: `Bearer ${apiToken}` }),
    },
    body: JSON.stringify({ id, status }),
  });

  if (!res.ok) {
    throw new Error(`Update failed: ${res.status}`);
  }
}

