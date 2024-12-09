interface Window {
  ton?: {
    send: (method: string, params?: any[]) => Promise<any>;
    selectedAddress?: string;
  };
}