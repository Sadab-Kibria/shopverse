import SessionWrapper from "./SessionWrapper";
import ProfilePage from "./ProfilePage";

export default function Page() {
  return (
    <SessionWrapper>
      <ProfilePage />
    </SessionWrapper>
  );
}
