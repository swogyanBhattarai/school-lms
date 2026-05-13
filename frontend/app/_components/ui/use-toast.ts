type ToastOptions = {
  title: string;
  description?: string;
  variant?: "destructive";
};

export function useToast() {
  function toast(options: ToastOptions) {
    if (typeof window === "undefined") return;
    const message = options.description
      ? `${options.title}\n${options.description}`
      : options.title;
    if (options.variant === "destructive") {
      window.alert(message);
      return;
    }
    window.alert(message);
  }

  return { toast };
}
