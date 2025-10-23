import * as SignalR from "@microsoft/signalr";

let connection: SignalR.HubConnection | null = null;
let isConnecting = false;

export const createSignalRConnection = async (token: string): Promise<SignalR.HubConnection> => {
  if (connection && connection.state === SignalR.HubConnectionState.Connected) {
    return connection;
  }

  // Prevent simultaneous connection attempts
  if (isConnecting) {
    console.log("⏳ Another connection attempt in progress, waiting...");
    let retries = 0;
    while (isConnecting && retries < 50) {
      await new Promise(resolve => setTimeout(resolve, 100));
      retries++;
    }
    // After waiting, check if connection was successfully established
    if (connection !== null && connection.state === SignalR.HubConnectionState.Connected) {
      console.log("✅ Using connection from previous attempt");
      return connection;
    }
    console.error("❌ Previous connection attempt failed or connection is null");
    throw new Error("Failed to establish SignalR connection - previous attempt failed");
  }

  isConnecting = true;
  console.log("🔄 Starting new SignalR connection attempt...");

  const apiUrl = import.meta.env.VITE_APP_ENV === 'production'
    ? import.meta.env.VITE_API_BASE_URL
    : "https://localhost:7000";

  const newConnection = new SignalR.HubConnectionBuilder()
    .withUrl(`${apiUrl}/hubs/booking`, {
      accessTokenFactory: () => token,
      skipNegotiation: true,
      transport: SignalR.HttpTransportType.WebSockets,
    })
    .withAutomaticReconnect()
    .configureLogging(SignalR.LogLevel.Information)
    .build();

  // Set up event handlers on the new connection
  newConnection.onreconnected(async () => {
    console.log("✅ SignalR reconnected to BookingHub");
  });

  newConnection.onreconnecting((error) => {
    console.warn("⚠️ SignalR reconnecting to BookingHub...", error);
  });

  newConnection.onclose((error) => {
    console.error("❌ SignalR connection to BookingHub closed", error);
    if (!isConnecting) {
      connection = null;
    }
  });

  // Handle server events
  newConnection.on("Connected", (connectionId: string) => {
    console.log("✅ Connected to BookingHub with ID:", connectionId);
  });

  newConnection.on("JoinedAdminGroup", (message: string) => {
    console.log("✅ Joined admin group:", message);
  });

  newConnection.on("LeftAdminGroup", (message: string) => {
    console.log("✅ Left admin group:", message);
  });

  newConnection.on("JoinedBookingRoom", (bookingId: number, message: string) => {
    console.log(`✅ Joined booking room ${bookingId}:`, message);
  });

  newConnection.on("LeftBookingRoom", (bookingId: number, message: string) => {
    console.log(`✅ Left booking room ${bookingId}:`, message);
  });

  try {
    await newConnection.start();
    console.log("✅ SignalR started, state:", newConnection.state);

    // Only assign to global connection after successful start
    connection = newConnection;

    // Wait a bit for state to fully update
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log("✅ SignalR connected to BookingHub, final state:", connection.state);
  } catch (error) {
    console.error("❌ Failed to connect SignalR to BookingHub", error);
    // Don't set connection to null, keep the old one if it exists
    throw error;
  } finally {
    isConnecting = false;
  }

  return connection;
};

const waitForConnection = async (maxRetries = 10, delayMs = 200): Promise<SignalR.HubConnection> => {
  let retries = 0;
  while (retries < maxRetries) {
    if (connection && connection.state === SignalR.HubConnectionState.Connected) {
      console.log("✅ Connection ready after", retries, "retries");
      return connection;
    }
    console.log(`⏳ Waiting for connection... attempt ${retries + 1}/${maxRetries}, state: ${connection?.state}`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
    retries++;
  }
  console.error("❌ Connection timeout after", maxRetries, "retries, final state:", connection?.state);
  throw new Error("SignalR connection timeout - connection not established");
};

export const joinAdminBookingGroup = async (): Promise<void> => {
  const conn = await waitForConnection();
  await conn.invoke("JoinAdminGroup");
  console.log("✅ Joined admin booking group");
};

export const leaveAdminBookingGroup = async (): Promise<void> => {
  if (!connection || connection.state !== SignalR.HubConnectionState.Connected) {
    console.warn("⚠️ Cannot leave admin group - connection not established");
    return;
  }
  try {
    await connection.invoke("LeaveAdminGroup");
    console.log("✅ Left admin booking group");
  } catch (error) {
    console.error("❌ Error leaving admin group:", error);
  }
};

export const joinBookingRoom = async (bookingId: string | number): Promise<void> => {
  const conn = await waitForConnection();
  await conn.invoke("JoinBookingRoom", bookingId);
  console.log(`✅ Joined booking room ${bookingId}`);
};

export const leaveBookingRoom = async (bookingId: string | number): Promise<void> => {
  if (!connection || connection.state !== SignalR.HubConnectionState.Connected) {
    console.warn("⚠️ Cannot leave booking room - connection not established");
    return;
  }
  try {
    await connection.invoke("LeaveBookingRoom", bookingId);
    console.log(`✅ Left booking room ${bookingId}`);
  } catch (error) {
    console.error("❌ Error leaving booking room:", error);
  }
};

export const onBookingStatusChanged = (
  callback: (data: { bookingId: string; statusId: number; statusName: string }) => void
): (() => void) | null => {
  if (!connection) {
    console.error("SignalR not connected");
    return null;
  }
  connection.on("BookingStatusChanged", callback);
  return () => connection?.off("BookingStatusChanged", callback);
};

export const onNewBookingCreated = (
  callback: (data: any) => void
): (() => void) | null => {
  if (!connection) {
    console.error("SignalR not connected");
    return null;
  }
  connection.on("NewBookingCreated", callback);
  return () => connection?.off("NewBookingCreated", callback);
};

export const onBookingUpdated = (
  callback: (data: any) => void
): (() => void) | null => {
  if (!connection) {
    console.error("SignalR not connected");
    return null;
  }
  connection.on("BookingUpdated", callback);
  return () => connection?.off("BookingUpdated", callback);
};

export const disconnectSignalR = async (): Promise<void> => {
  if (connection && connection.state === SignalR.HubConnectionState.Connected) {
    try {
      await connection.stop();
      console.log("✅ SignalR disconnected");
    } catch (error) {
      console.error("❌ Error disconnecting SignalR", error);
    }
  }
  connection = null;
};

export const getSignalRConnection = (): SignalR.HubConnection | null => connection;

export const isSignalRConnected = (): boolean => {
  return connection !== null && connection.state === SignalR.HubConnectionState.Connected;
};
