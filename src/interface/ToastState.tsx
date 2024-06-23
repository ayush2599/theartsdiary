export interface ToastState {
    show: boolean;
    message: string;
    type: "success" | "error";
  }

export interface CustomToastProps extends ToastState {
    onClose: () => void;
    delay?: number; // Making delay optional with a default value if not provided
}