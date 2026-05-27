// eslint-disable-next-line react-refresh/only-export-components
import { createContext, useState } from "react";
import { ProfileActive } from "../config/profileActive";
import type { ProfileData, ProfileName } from "../config/profileActive";

interface ProfileContextType {
  profile: ProfileData;
  profileType: ProfileName;
  setProfileType: (type: ProfileName) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ProfileContext = createContext<ProfileContextType | null>(null);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profileType, setProfileType] = useState<ProfileName>("pria");
  const profile = ProfileActive(profileType);

  return (
    <ProfileContext.Provider value={{ profile, profileType, setProfileType }}>
      {children}
    </ProfileContext.Provider>
  );
};