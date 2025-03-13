import { useEffect } from "react";
import { Text, View } from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../hooks/useAuth";

export default function Index() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // User is authenticated, redirect to main dashboard
        router.replace("/(main)");
      } else {
        // User is not authenticated, redirect to login
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  // This is just a loading screen while checking authentication
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Loading...</Text>
    </View>
  );
}
