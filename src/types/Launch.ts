export type Launch = {
  flight_number: number;
  mission_name: string;
  details: string | null;
  links?: {
    mission_patch_small: string | null;
    mission_patch: string | null;
  } | null;
  rocket?: {
    rocket_name: string;
  } | null;
};

export type LaunchesResponse = {
  launches: Launch[];
};
