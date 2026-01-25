import { useState, useEffect } from "react";

interface NetworkStatus {
  isSlowConnection: boolean;
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [status, setStatus] = useState<NetworkStatus>({
    isSlowConnection: false,
    effectiveType: "4g",
    downlink: 10,
    rtt: 50,
    saveData: false,
  });

  useEffect(() => {
    const connection = (navigator as any).connection || 
                       (navigator as any).mozConnection || 
                       (navigator as any).webkitConnection;

    const updateStatus = () => {
      if (connection) {
        const isSlowConnection = 
          connection.effectiveType === "2g" || 
          connection.effectiveType === "slow-2g" ||
          connection.saveData === true ||
          connection.downlink < 1 ||
          connection.rtt > 500;

        setStatus({
          isSlowConnection,
          effectiveType: connection.effectiveType || "unknown",
          downlink: connection.downlink || 10,
          rtt: connection.rtt || 50,
          saveData: connection.saveData || false,
        });
      }
    };

    updateStatus();

    if (connection) {
      connection.addEventListener("change", updateStatus);
      return () => connection.removeEventListener("change", updateStatus);
    }
  }, []);

  return status;
};

// Utility to check if connection is slow (can be used outside React)
export const isSlowNetwork = (): boolean => {
  const connection = (navigator as any).connection || 
                     (navigator as any).mozConnection || 
                     (navigator as any).webkitConnection;
  
  if (!connection) return false;
  
  return (
    connection.effectiveType === "2g" || 
    connection.effectiveType === "slow-2g" ||
    connection.saveData === true ||
    connection.downlink < 1 ||
    connection.rtt > 500
  );
};
