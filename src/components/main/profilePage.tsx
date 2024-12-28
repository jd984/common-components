"use client";
import ProfileCard from "@/components/main/profileCard";
import { Spinner } from "@/lib/helper";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProfileData {
  firstName: string;
  lastName: string;
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  const handleProfile = async () => {
    try {
      const response = await axios.get("/api/users/profile");
      console.log("Response", response);
      if (response.status === 200) {
        setProfileData(response.data.data);
      }
    } catch (error) {
      setProfileData(null);
      console.log("Profile page error", error);
    }
  };

  useEffect(() => {
    handleProfile();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {profileData ? (
        <>
          <ProfileCard
            firstName={profileData?.firstName}
            lastName={profileData?.lastName}
          />
        </>
      ) : (
        <Spinner text="Loading..." />
      )}
    </div>
  );
};

export default ProfilePage;

{
  /* <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6">
          <div className="text-center text-gray-500">
            <p>No profile data found</p>
          </div>
        </div> */
}
