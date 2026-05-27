import { CONFIG } from "./url";
import weddingData from "../data/weddingData.json";

export type ProfileName = "pria" | "wanita";

export interface ProfileData {
  rsvpUrl: string;
  profileName: ProfileName;
  timeResepsi: string;
  timeAkad: string;
  guestPhotoUrl: string;
  mapsDirectUrl: string;
  mapsEmbedUrl: string;
}

export const ProfileActive = (profile: ProfileName): ProfileData => {
  const {
    rsvpUrlPria,
    rsvpUrlWanita,
    guestPhotoUrl,
    mapsDirectUrlPria,
    mapsDirectUrlWanita,
    mapsEmbedUrlPria,
    mapsEmbedUrlWanita,
  } = CONFIG;

  if (profile === "pria") {
    return {
      rsvpUrl: rsvpUrlPria,
      timeResepsi: weddingData.acara.timeResepsiPria,
      timeAkad: weddingData.acara.timeAkad,
      guestPhotoUrl,
      mapsDirectUrl: mapsDirectUrlPria,
      mapsEmbedUrl: mapsEmbedUrlPria,
      profileName: "pria"
    };
  }

  return {
    rsvpUrl: rsvpUrlWanita,
    timeResepsi: weddingData.acara.timeResepsiWanita,
    timeAkad: weddingData.acara.timeAkad,
    guestPhotoUrl,
    mapsDirectUrl: mapsDirectUrlWanita,
    mapsEmbedUrl: mapsEmbedUrlWanita,
    profileName: "wanita"
  };
};