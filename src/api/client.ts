import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import {
  QueryClient,
  focusManager,
  onlineManager,
} from "@tanstack/react-query";
import { AppState } from "react-native";

// 1) Online detection (3G/4G/WiFi)
onlineManager.setEventListener((setOnline) => {
  // NetInfo theo dõi mạng
  const unsub = NetInfo.addEventListener((state) => {
    setOnline(Boolean(state.isConnected));
  });
  return unsub;
});

// 2) App focus (foreground/background) -> refetchOnWindowFocus
focusManager.setEventListener((handleFocus) => {
  const subscription = AppState.addEventListener("change", (status) => {
    handleFocus(status === "active");
  });
  return () => subscription.remove();
});

// 3) QueryClient với config mặc định "mobile-friendly"
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Mobile data đắt -> đừng refetch vô tội vạ
      staleTime: 1000 * 60 * 2, // 2 phút coi như "tươi"
      gcTime: 1000 * 60 * 60, // 1 giờ dọn rác
      retry: (failureCount, error: any) => {
        // Retry ít lần khi online và không phải lỗi 4xx
        const status = error?.response?.status;
        if (status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      refetchOnReconnect: true,
      refetchOnMount: false,
      refetchOnWindowFocus: true, // sẽ dùng focusManager (AppState)
    },
    mutations: {
      retry: 0,
    },
  },
});

// 4) Persist cache để offline-first
export const persister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 2_000, // giảm ghi đĩa quá nhiều
  key: "RQ_CACHE_V1", // version key để sau này dễ migration
});
