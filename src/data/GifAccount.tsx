import type { GiftCardProps } from "../components/gif/GiftCard";
import type { ProfileName } from "../config/profileActive";

export const GifAccount: Record<ProfileName, GiftCardProps[]> = {
  pria: [
    {
      provider: "BRI",
      type: "BANK",
      accountNumber: "061501036305506",
      owner: "Oksenda Fauzon Putra",
    },
    {
      provider: "Mandiri",
      type: "BANK",
      accountNumber: "1180013983605",
      owner: "Oksenda Fauzon Putra",
    },
  ],
  wanita: [
    {
      provider: "BCA",
      type: "BANK",
      accountNumber: "0987654321",
      owner: "Nia Aprilia",
    },
    {
      provider: "OVO",
      type: "OVO",
      accountNumber: "081298765432",
      owner: "Nia Aprilia",
    },
  ],
};
