export interface Donation {
  id: number;
  // title       string
  // species     Species
  // sex         Sex
  // age         Age
  // description String
  // zipCode     String
  // status      DonationStatus
  // userId      String
  // user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  // images      DonationImage[]
}
