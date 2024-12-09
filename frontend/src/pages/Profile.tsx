import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api";
import { useUser } from "../components/UserContext";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  id: number;
  username: string;
  email: string;
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const loadProfile = async () => {
      try {
        const data = await fetchProfile(user);
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
        alert("Could not load profile. Please try again.");
      }
    };

    loadProfile();
  }, [user, navigate]);

  if (!profile) {
    return <p>Loading profile...</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Email:</strong> {profile.email}</p>
    </div>
  );
};

export default Profile;
