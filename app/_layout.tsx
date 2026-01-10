import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto';

export default function RootLayout() {
  useEffect(() => {
    // Trigger manual data fetch on app start
    fetch('https://incidenttrends-algorithm.onrender.com/api/fetch-now', {
      method: 'POST',
      headers: {
        'X-API-Key': 'dev-key-123',
      },
    })
    .then(response => {
      if (response.ok) {
        console.log('Data fetch triggered successfully');
      } else {
        console.error('Failed to trigger data fetch:', response.status);
      }
    })
    .catch(error => console.error('Error triggering data fetch:', error));
  }, []);

  return (
    <>
      <StatusBar style="light" backgroundColor="#054003" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}